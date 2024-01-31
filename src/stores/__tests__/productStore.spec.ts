import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProductStore } from '@/stores/product'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/composables/useFetch', () => ({
  useFetch: vi.fn()
}))

import { useFetch } from '@/composables/useFetch'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

// Unit test for buildProductAPIConfig function
describe('buildProductAPIConfig', () => {
  it(`the API config returns '/product/search' URI if a search value is provided.`, () => {
    const searchValue = 'iphone'
    const productStore = useProductStore()
    const config = productStore.buildProductAPIConfig(searchValue)
    expect(config.url).toContain('/product/search')
    expect(config.pick).toBe('title,price,images')
  })

  it(`the API config returns '/product' URI if a search value is not provided.`, () => {
    const searchValue = ''
    const productStore = useProductStore()
    const config = productStore.buildProductAPIConfig(searchValue)
    expect(config.url).toContain('/product')
    expect(config.pick).toBe('title,price,images')
  })
})

// Unit test for fetchPaginatedProducts function
const mockAPIResponse = {
  total: 2,
  skip: 0,
  limit: 20,
  products: [
    {
      id: 1,
      title: 'iPhone 9',
      price: 549,
      images: [
        'https://cdn.dummyjson.com/product-images/1/1.jpg',
        'https://cdn.dummyjson.com/product-images/1/2.jpg',
        'https://cdn.dummyjson.com/product-images/1/3.jpg',
        'https://cdn.dummyjson.com/product-images/1/4.jpg',
        'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
      ]
    },
    {
      id: 2,
      title: 'iPhone X',
      price: 899,
      images: [
        'https://cdn.dummyjson.com/product-images/2/1.jpg',
        'https://cdn.dummyjson.com/product-images/2/2.jpg',
        'https://cdn.dummyjson.com/product-images/2/3.jpg',
        'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg'
      ]
    }
  ]
}

const paginationDetail = {
  limit: 20,
  skip: 0,
  search: ''
}

describe('fetchPaginatedProducts', () => {
  it('successfully retrieve the products without search value.', async () => {
    vi.mocked(useFetch).mockResolvedValue({
      data: { value: mockAPIResponse },
      error: { value: null }
    })

    const searchValue = ''
    const productStore = useProductStore()
    const apiConfig = productStore.buildProductAPIConfig(searchValue)
    paginationDetail.search = searchValue

    const result = await productStore.fetchPaginatedProducts(apiConfig, paginationDetail)

    expect(result).toEqual(mockAPIResponse)
    expect(useFetch).toHaveBeenCalledWith(apiConfig.url, {
      params: {
        limit: paginationDetail.limit,
        skip: paginationDetail.skip,
        select: apiConfig.pick
      }
    })
  })

  it('successfully retrieve the products with a search value.', async () => {
    vi.mocked(useFetch).mockResolvedValue({
      data: { value: mockAPIResponse },
      error: { value: null }
    })

    const searchValue = 'iphone'
    paginationDetail.search = searchValue

    const productStore = useProductStore()
    const apiConfig = productStore.buildProductAPIConfig(searchValue)
    const result = await productStore.fetchPaginatedProducts(apiConfig, paginationDetail)

    expect(result).toEqual(mockAPIResponse)
    expect(useFetch).toHaveBeenCalledWith(apiConfig.url, {
      params: {
        limit: paginationDetail.limit,
        skip: paginationDetail.skip,
        select: apiConfig.pick,
        q: searchValue
      }
    })
  })

  it('handles error correctly and show toast', async () => {
    const mockError = { message: 'fetch failed' }
    vi.mocked(useFetch).mockResolvedValue({ data: { value: null }, error: { value: mockError } })

    const productStore = useProductStore()
    const apiConfig = productStore.buildProductAPIConfig('')

    const toastSpy = vi.spyOn(productStore, 'showErrToast')
    const result = await productStore.fetchPaginatedProducts(apiConfig, paginationDetail)

    expect(result).toBeNull()
    // spy on showErrToast
    expect(toastSpy).toHaveBeenCalled()
  })
})
