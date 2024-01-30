<script setup lang="ts">
import ProductLayout from '@/components/templates/product/ProductLayout.vue'
import ProductList from '@/components/organisms/product/product-list/ProductList.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'

import { useProductStore } from '@/stores/product'
import { nextTick, computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { handleInfiniteScroll } from '@/composables/useUtils'
import type { Product } from '@/types/product'
const productStore = useProductStore()
const products = ref<Product[]>([])

const apiConfig = productStore.buildProductAPIConfig()
const limit = 20 // 20 products per page
const currentPage = ref(1)
const skip = 0
const totalProduct = ref(0)
const isLoading = ref(false)
const productContainer = ref<HTMLElement | null>(null)

const threshold = 80

const loadMore = async () => {
  const response = await productStore.loadMoreProducts(currentPage.value, limit)
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
      isLoading.value = true

      const { pageNumber, hasMore } = await handleInfiniteScroll(currentPage.value, limit, loadMore, threshold)
      if (!hasMore) {
        window.removeEventListener('scroll', handleScroll)
      } else {
        currentPage.value = pageNumber
      }

      isLoading.value = false
    }

  }
}

onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
})

onMounted(async () => {
  const productList = await productStore.fetchPaginatedProducts(apiConfig, { limit, skip })
  if (productList) {
    products.value = productList.products
    totalProduct.value = productList.total
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <ProductLayout>
    <template #title>Product List - {{ totalProduct  }}</template>
    <template #product-list>
      <div ref="productContainer">
        <product-list :products="products" />
        <spinner v-if="isLoading"/>
      </div>
    </template>

  </ProductLayout>
</template>
