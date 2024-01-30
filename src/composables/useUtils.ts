/**
 * Formats a number as a USD currency string.
 *
 * @param currency
 * @returns
 */

import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export const formattedCurrency = (currency: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(currency)
}

/**
 * Handles infinite scrolling functionality for a list of items.
 *
 * @param currentPage - The current page number.
 * @param limit - The number of items to load per page.
 * @param loadMoreCallBack - A callback function that loads more items.
 *                           It should return a Promise of LoadMoreDataResponse.
 * @param threshold - The scroll threshold (in pixels) to trigger loading more items.
 * @returns An object containing the updated page number and a flag indicating
 *          if more items are available to be loaded.
 *
 * @example
 * const { pageNumber, hasMore } = await handleInfiniteScroll(
 *   currentPage,
 *   limit,
 *   loadMoreCallBack,
 *   threshold
 * )
 */
import type { LoadMoreDataResponse } from '@/stores/product'
import type { Product } from '@/types/product'

export const handleInfiniteScroll = async (
  currentPage: number,
  limit: number,
  loadMoreCallBack: (currentPage: number, limit: number) => Promise<LoadMoreDataResponse>,
  threshold = 80
) => {
  const newItems: any = ref([])

  const handleScroll = async () => {
    const result = await loadMoreCallBack(currentPage, limit)

    if (result.items && result.items.length > 0) {
      newItems.value = result.items
    }

    return {
      pageNumber: result.currentPage,
      hasMore: result.hasMore
    }
  }
  const response = await handleScroll()
  return response
}
