import axios, { AxiosInstance } from 'axios'

import * as dotenv from 'dotenv'

dotenv.config()

const instance: AxiosInstance = axios.create({baseURL: "https://www.givxl33t.site/api"})

instance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    config.headers.common.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default instance
