import { axiosInstance } from '@/assets/axios'
import { useToast } from 'vue-toastification'
import Cookies from 'js-cookie'

const toast = useToast()
const user = Cookies.get('user')
const parsedUser = user ? JSON.parse(user) : null

export const favouritesModule = {
  state: () => ({
    favourites: [],
    isLoading: false,
    isFavouritesUpdated: false,
  }),

  getters: {
    isAddedToFavourites: state => productId => {
      return state.favourites.find(product => product.id === productId)
    },
  },

  mutations: {
    addFavouriteProduct(state, product) {
      const existingProduct = state.favourites.find(p => p.id === product.id)
      if (!existingProduct) {
        state.favourites.push({
          id: product.id,
          name: product.name,
          imgURL: product.imgURL,
          price: product.price,
        })
        state.isFavouritesUpdated = true
      }
    },
    removeProduct(state, productId) {
      state.favourites = state.favourites.filter(
        product => product.id !== productId,
      )
      state.isFavouritesUpdated = true
    },
    setFavourites(state, favourites) {
      state.favourites = favourites
      state.isFavouritesUpdated = false
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchFavourites({ commit }) {
      commit('setIsLoading', true)
      try {
        const response = await axiosInstance.get(`/users/${parsedUser.id}`, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        })
        commit('setFavourites', response.data.favourites)
        return response.data.favourites
      } catch (error) {
        console.error('Error fetching favourites:', error)
        toast.error('Error fetching favourites')
      } finally {
        commit('setIsLoading', false)
      }
    },

    async updateFavourites({ commit, state }) {
      if (!state.isFavouritesUpdated) return
      try {
        const response = await axiosInstance.patch(
          `/users/${parsedUser.id}`,
          {
            favourites: state.favourites,
          },
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          },
        )
        commit('setFavourites', response.data.favourites)
      } catch (error) {
        console.error('Error updating favourites:', error)
        toast.error('Error updating favourites')
      } finally {
        commit('setIsLoading', false)
      }
    },
    async addProductToFavourites({ commit, dispatch }, product) {
      try {
        commit('addFavouriteProduct', product)
        await dispatch('updateFavourites')
      } catch (error) {
        console.error('Error adding product to favourites:', error)
        toast.error('Error adding product to favourites')
      }
    },
    async removeProductFromFavourites({ commit, dispatch }, product) {
      try {
        commit('removeProduct', product)
        await dispatch('updateFavourites')
      } catch (error) {
        console.error('Error removing product from favourites:', error)
        toast.error('Error removing product from favourites')
      }
    },
  },
  namespaced: true,
}
