import { defineStore } from 'pinia'
import type { Product } from '@/types/product'
import { useFetch } from '@/composables/useFetch'
import { calculateSkip } from '@/composables/usePagination'
import { useToast } from '@/components/ui/toast/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { h } from 'vue'

interface State {
  productList: Product[]
  currentPage: number
  pageSize: number
  total: number
  skip: number
}

interface ProductDataResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

interface APIConfig {
  url: string
  pick: string
}

export interface PaginationDetails {
  search?: string
  limit: number
  skip: number
}

export interface LoadMoreDataResponse {
  currentPage: number
  items: Product[] | null
  hasMore: boolean
}

export const useProductStore = defineStore('product-store', {
  state: (): State => {
    return {
      productList: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      skip: 0
    }
  },
  actions: {
    buildProductAPIConfig(searchValue: string): APIConfig {
      const baseURI = import.meta.env.VITE_BASE_URI
      const url = searchValue ? baseURI + '/product/search' : baseURI + '/product'
      const pick = 'title,price,images'

      return { url, pick }
    },
    async fetchPaginatedProducts(
      apiConfig: APIConfig,
      paginationDetail: PaginationDetails
    ): Promise<ProductDataResponse | null> {
      const queryParams: Record<string, any> = {
        limit: paginationDetail.limit,
        skip: paginationDetail.skip,
        select: apiConfig.pick
      }

      if ('search' in paginationDetail && paginationDetail.search !== '') {
        queryParams.q = paginationDetail.search
      }

      const { data, error } = await useFetch(apiConfig.url, {
        params: queryParams
      })

      if (error.value) {
        this.showErrToast()
        console.error(error.value)
        return null
      }

      return data.value ? data.value : null
    },
    showErrToast() {
      const { toast } = useToast()
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        variant: 'destructive',
        action: h(
          ToastAction,
          {
            altText: 'Try again'
          },
          {
            default: () => 'Try again'
          }
        )
      })
    },
    async loadMoreProducts(
      currentPage: number,
      limit: number,
      searchValue = ''
    ): Promise<LoadMoreDataResponse> {
      const newPage = currentPage + 1
      const skip = calculateSkip(newPage, limit)
      const { url, pick } = this.buildProductAPIConfig(searchValue)
      const queryParams: Record<string, any> = {
        limit,
        skip,
        select: pick
      }

      if (searchValue !== '') {
        queryParams.q = searchValue
      }

      const { data, error } = await useFetch(url, {
        params: queryParams
      })

      if (error.value) {
        this.showErrToast()
        console.error(error.value)
      }

      return {
        currentPage: newPage,
        hasMore: data.value.total > skip,
        items: data.value.products ? data.value.products : null
      }
    }
  }
})
