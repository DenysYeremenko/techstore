import { axiosInstance } from '@/assets/axios'
import { useToast } from 'vue-toastification'
import Cookies from 'js-cookie'

const toast = useToast()
const user = Cookies.get('user')
const parsedUser = user ? JSON.parse(user) : null

export const cartModule = {
  state: () => ({
    orders: [],
    addedProducts: [],
    addedProductsData: [],
    isCartUpdated: false,
    isLoading: false,
  }),

  getters: {
    isAddedToCart: state => productId => {
      return state.addedProducts.find(product => product.id === productId)
    },
    getProductQuantity: state => productId => {
      const product = state.addedProducts.find(p => p.id === productId)
      return product ? product.quantity : 1
    },
    getProductPrice: state => productId => {
      const product = state.addedProducts.find(p => p.id === productId)
      return product ? product.price : 0
    },
    getTotalPrice: state => {
      return state.addedProducts
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2)
    },
    getAddedProductsCount: state => {
      return state.addedProducts.length
    },
  },

  mutations: {
    addProduct(state, product) {
      const existingProduct = state.addedProducts.find(p => p.id === product.id)
      if (!existingProduct) {
        state.addedProducts.push({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
          name: product.name,
          imgURL: product.imgURL,
        })
        state.isCartUpdated = true
      }
    },

    removeProduct(state, productId) {
      state.addedProducts = state.addedProducts.filter(
        product => product.id !== productId,
      )
      // state.addedProductsData = state.addedProductsData.filter(
      //   product => product.id !== productId,
      // )
      state.isCartUpdated = true
    },

    increaseProductQuantity(state, productId) {
      const product = state.addedProducts.find(p => p.id === productId)
      if (product) {
        product.quantity++
        state.isCartUpdated = true
      }
    },

    decreaseProductQuantity(state, productId) {
      const product = state.addedProducts.find(p => p.id === productId)
      if (product) {
        product.quantity--
        if (product.quantity <= 0) {
          state.addedProducts = state.addedProducts.filter(
            product => product.id !== productId,
          )
          state.addedProductsData = state.addedProductsData.filter(
            product => product.id !== productId,
          )
        }
        state.isCartUpdated = true
      }
    },

    setAddedProducts(state, cart) {
      state.addedProducts = cart
      state.isCartUpdated = false
    },

    setOrders(state, orders) {
      state.orders = orders
    },

    // setOrdersProductsData(state, products) {
    //   state.ordersProductsData = products
    // },

    clearAddedProducts(state) {
      state.addedProducts = []
      state.addedProductsData = []
      state.isCartUpdated = true
    },

    setAddedProductsData(state, products) {
      state.addedProductsData = products
    },

    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchCart({ commit }) {
      commit('setIsLoading', true)
      try {
        const response = await axiosInstance.get(`/users/${parsedUser.id}`, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        })
        commit('setAddedProducts', response.data.cart)
        return response.data.cart
      } catch (error) {
        console.error('Error fetching cart:', error)
        toast.error('Error fetching cart')
      } finally {
        commit('setIsLoading', false)
      }
    },

    async fetchOrders({ commit }) {
      commit('setIsLoading', true)
      try {
        const response = await axiosInstance.get(`/users/${parsedUser.id}`, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        })
        commit('setOrders', response.data.orders)
        // commit('setOrdersProducts', response.data.orders)
        // return response.data.orders
      } catch (error) {
        console.error('Error fetching cart:', error)
        toast.error('Error fetching cart')
      } finally {
        commit('setIsLoading', false)
      }
    },

    async updateCart({ commit, state }) {
      if (!state.isCartUpdated) return
      try {
        const response = await axiosInstance.patch(
          `/users/${parsedUser.id}`,
          {
            cart: state.addedProducts,
          },
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          },
        )
        commit('setAddedProducts', response.data.cart)
      } catch (error) {
        console.error('Error updating cart:', error)
        toast.error('Error updating cart')
      } finally {
        commit('setIsLoading', false)
      }
    },

    async addProductToCart({ commit, dispatch }, product) {
      try {
        commit('addProduct', product)
        await dispatch('updateCart')
      } catch (error) {
        console.error('Error adding product to cart:', error)
        toast.error('Error adding product to cart')
      }
    },

    async removeProductFromCart({ commit, dispatch }, product) {
      try {
        commit('removeProduct', product)
        await dispatch('updateCart')
      } catch (error) {
        console.error('Error removing product from cart:', error)
        toast.error('Error removing product from cart')
      }
    },

    async clearCart({ commit, dispatch }) {
      try {
        commit('clearAddedProducts')
        await dispatch('updateCart')
      } catch (error) {
        console.error('Error clearing cart:', error)
        toast.error('Error clearing cart')
      }
    },

    async confirmOrder({ commit, state, getters, dispatch }) {
      try {
        const products = state.addedProducts.map(product => {
          return {
            id: product.id,
            quantity: getters.getProductQuantity(product.id),
            price: getters.getProductPrice(product.id),
            name: product.name,
            imgURL: product.imgURL,
          }
        })

        const response = await axiosInstance.patch(
          `/users/${parsedUser.id}`,
          {
            orders: [
              ...state.orders,
              {
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                number: Math.floor(Math.random() * 1000),
                totalPrice: getters.getTotalPrice,
                products: products,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          },
        )

        commit('clearAddedProducts')
        await dispatch('updateCart')
        toast.success('Order confirmed')
      } catch (error) {
        console.error('Error confirming order:', error)
        toast.error('Error confirming order')
      }
    },
  },
  namespaced: true,
}
