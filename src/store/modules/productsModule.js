import { axiosInstance } from '@/assets/axios'
import router from '@/router'

export const productsModule = {
  state: () => ({
    products: [],
    selectedProductId: null,
    searchQuery: '',
    selectedCategory: 'all',
    selectedSort: 'name',
    pageLimit: 0,
    currentPage: 1,
    itemsPerPage: 9,
    itemsLimit: 9,
    totalItems: 0,
    isLoading: false,
  }),
  getters: {},
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setSelectedProductId(state, selectedProductId) {
      state.selectedProductId = selectedProductId
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
    setSelectedCategory(state, selectedCategory) {
      state.selectedCategory = selectedCategory
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setPageLimit(state, pageLimit) {
      state.pageLimit = pageLimit
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setItemsPerPage(state, itemsPerPage) {
      state.itemsPerPage = itemsPerPage
    },
    setItemsLimit(state, itemsLimit) {
      state.itemsLimit = itemsLimit
    },
    setTotalItems(state, totalItems) {
      state.totalItems = totalItems
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchProducts({ state, commit }) {
      const productId = Number(router.currentRoute.value.params.id)
      try {
        const params = {
          sortBy: state.selectedSort,
          page: state.currentPage,
          limit: state.itemsPerPage,
        }
        if (productId) {
          params.id = productId
        } else {
          delete params.id
        }
        if (state.selectedCategory !== 'all') {
          params.category = state.selectedCategory
        } else {
          delete params.category
        }
        if (state.searchQuery) {
          params.name = `*${state.searchQuery}*`
        } else {
          delete params.name
        }
        commit('setIsLoading', true)
        const response = await axiosInstance.get('/products', {
          params,
        })

        commit('setPageLimit', response.data.meta.total_pages)
        commit('setProducts', response.data.items)
      } catch (e) {
        alert(e)
      } finally {
        commit('setIsLoading', false)
      }
    },
  },
  namespaced: true,
}
