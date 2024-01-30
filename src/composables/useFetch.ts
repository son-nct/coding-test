import { ref, type Ref } from 'vue'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Custom hook for making HTTP requests using Axios.
 *
 * @param url - The URL to which the request is sent.
 * @param config - The Axios request configuration options.
 * @returns An object containing:
 * - `data`: A ref object holding the response data.
 * - `response`: A ref object holding the full Axios response.
 * - `error`: A ref object holding any error that occurred during the request.
 * - `loading`: A ref object indicating the loading state of the request.
 * - `fetch`: The function to call to initiate the request.
 */

export const useFetch = async (url: string, config: AxiosRequestConfig = {}) => {
  const data: Ref<any> = ref(null)
  const response: Ref<AxiosResponse | null> = ref(null)
  const error: Ref<any> = ref(null)
  const loading: Ref<boolean> = ref(false)

  const fetch = async () => {
    loading.value = true
    try {
      const result = await axios.request({
        url,
        ...config
      })
      response.value = result
      data.value = result.data
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        error.value = ex
      }
    } finally {
      loading.value = false
    }
  }

  await fetch()

  return { data, response, error, loading, fetch }
}
