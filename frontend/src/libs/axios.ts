import AxiosInstance from 'axios'
import { getToken } from 'functions/token'

export const axios = AxiosInstance.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    const { error } = response.data
    if (error && error.includes('Invalid Token')) {
      localStorage.clear()
      return window.location.reload()
    }

    return response.data
  },
  function (error): Promise<string> {
    // Do something with response error
    return Promise.reject(
      error?.response?.data?.error ??
        error?.response?.statusText ??
        'Something went wrong'
    )
  }
)
