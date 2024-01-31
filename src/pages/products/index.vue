<script setup lang="ts">
import ProductLayout from '@/components/templates/product/ProductLayout.vue'
import ProductList from '@/components/organisms/product/ProductList.vue'
import SearchBar from '@/components/molecules/common/SearchBar.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import _ from 'lodash'

import { useProductStore, type PaginationDetails } from '@/stores/product'
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { handleInfiniteScroll } from '@/composables/useUtils'
import type { Product } from '@/types/product'
import { useRoute, useRouter } from 'vue-router'

const productStore = useProductStore()
const products = ref<Product[]>([])

const limit = 20 // 20 products per page
const currentPage = ref(1)
const skip = 0
const totalProduct = ref(0)
const isLoading = ref(false)
const productContainer = ref<HTMLElement | null>(null)
const threshold = 80

const router = useRouter()
const route = useRoute()
const searchValue = ref((route.query.search as string) || '')
const isDataFetched = ref(false)

const attachScrollListener = () => {
  window.addEventListener('scroll', handleScroll)
}

const updateQueryParams = (queryValue: string) => {
  const query = queryValue ? { search: queryValue } : {}
  router.push({ name: 'productPage', query })
}

const fetchProducts = async (keyword: string) => {
  const queryParams: PaginationDetails = { limit, skip, search: keyword }
  const apiConfig = productStore.buildProductAPIConfig(keyword)
  return productStore.fetchPaginatedProducts(apiConfig, queryParams)
}

const updateProducts = async (keyword: string) => {
  showLoading(true)
  currentPage.value = 1
  const productList = await fetchProducts(keyword)
  isDataFetched.value = true
  if (productList) {
    products.value = productList.products
    totalProduct.value = productList.total
  }
  showLoading(false)
  attachScrollListener()
}

const showLoading = (toggle: boolean) => (isLoading.value = toggle)

const debouncedUpdateProducts = _.debounce(updateProducts, 500)

watch(searchValue, (newVal: string) => {
  isDataFetched.value = false
  updateQueryParams(newVal)
  debouncedUpdateProducts(newVal)
})

const loadMore = async () => {
  const response = await productStore.loadMoreProducts(currentPage.value, limit, searchValue.value)
  if (response.items && response.items.length > 0) {
    products.value = [...products.value, ...response.items]
  }
  return response
}

const handleScroll = async () => {
  if (isLoading.value) return

  const scrollY = window.scrollY
  if (productContainer.value) {
    const productContainerHeight = productContainer.value.clientHeight
    const windowHeight = window.innerHeight

    if (scrollY + windowHeight - productContainerHeight >= threshold) {
      showLoading(true)

      const { pageNumber, hasMore } = await handleInfiniteScroll(
        currentPage.value,
        limit,
        loadMore,
        threshold
      )
      if (!hasMore) {
        window.removeEventListener('scroll', handleScroll)
      } else {
        currentPage.value = pageNumber
      }

      showLoading(false)
    }
  }
}

onBeforeMount(() => attachScrollListener())
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

onMounted(() => {
  updateQueryParams(searchValue.value)
  updateProducts(searchValue.value)
})
</script>

<template>
  <ProductLayout>
    <template #title>
      {{ searchValue ? 'Search results' : 'Product List' }}
    </template>
    <template #search>
      <search-bar
        v-model="searchValue"
        placeholder="Search for the product you want ..."
      ></search-bar>
      <span class="text-2xl font-thin" v-if="!isLoading && isDataFetched">
        {{
          searchValue
            ? `${totalProduct} results found for "${searchValue}"`
            : `Total: ${totalProduct} products`
        }}
      </span>
    </template>
    <template #product-list>
      <div ref="productContainer">
        <product-list :products="products" />
        <spinner v-if="isLoading" />
      </div>
    </template>
  </ProductLayout>
</template>
