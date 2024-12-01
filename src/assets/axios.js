import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://4e07e4ca76e1f533.mokky.dev',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})
