import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://4e07e4ca76e1f533.mokky.dev',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  fetchProducts(params) {
    return apiClient.get('/products', { params })
  },
}
