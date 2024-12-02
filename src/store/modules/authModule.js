import { axiosInstance } from '@/assets/axios'
import { useToast } from 'vue-toastification'
import router from '@/router'
import Cookies from 'js-cookie'

const toast = useToast()

export const authModule = {
  state: () => ({
    userName: null,
    userId: null,
    token: null,
    isLogged: false,
    cart: [],
    favourites: [],
    orders: [],
    isLoading: false,
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.user
    },
  },
  mutations: {
    setUserData(state, { name, id, token, cart, favourites, orders }) {
      state.userName = name
      state.userId = id
      state.token = token
      state.cart = cart
      state.favourites = favourites
      state.orders = orders
    },
    setIsLogged(state, isLogged) {
      state.isLogged = isLogged
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      commit('setIsLoading', true)
      try {
        const response = await axiosInstance.post('/auth', {
          email,
          password,
        })
        const data = response.data
        commit('setUserData', {
          name: data.data.name,
          id: data.data.id,
          token: data.token,
          cart: data.data.cart,
          favourites: data.data.favourites,
          orders: data.data.orders,
        })

        commit('favourites/setFavourites', data.data.favourites, { root: true })
        commit('cart/setAddedProducts', data.data.cart, { root: true })
        commit('cart/setOrders', data.data.orders, { root: true })

        commit('setIsLogged', true)
        Cookies.set(
          'user',
          JSON.stringify({ token: data.token, id: data.data.id }),
          {
            expires: 7,
            path: '/',
            sameSite: 'None',
            secure: true,
          },
        )
        toast.success('Login successful!')
        router.push('/')
      } catch (error) {
        console.error('Login failed:', error)
        toast.error('Login failed')
        throw error
      } finally {
        commit('setIsLoading', false)
      }
    },

    async register(
      { commit },
      { name, email, password, cart, favourites, orders },
    ) {
      commit('setIsLoading', true)
      try {
        const response = await axiosInstance.post('/register', {
          name,
          email,
          password,
          cart,
          favourites,
          orders,
        })
        const data = response.data
        commit('setUserData', {
          name: data.name,
          id: data.id,
          token: data.token,
          cart: data.cart,
          favourites: data.favourites,
          orders: data.orders,
        })
        Cookies.set(
          'user',
          JSON.stringify({ token: data.token, id: data.id }),
          {
            expires: 7,
            path: '/',
            sameSite: 'None',
            secure: true,
          },
        )
        toast.success('Registration successful!')
        router.push('/')
      } catch (error) {
        console.error('Registration failed:', error)
        toast.error('Registration failed')
        throw error
      } finally {
        commit('setIsLoading', false)
      }
    },
    async autoLogin({ commit }) {
      const user = Cookies.get('user')
      if (!user) {
        return
      }
      const parsedUser = JSON.parse(user)
      commit('setIsLoading', true)

      try {
        const response = await axiosInstance.get('/auth_me', {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        })
        const data = response.data

        commit('favourites/setFavourites', data.favourites, {
          root: true,
        })
        commit('cart/setAddedProducts', data.cart, { root: true })
        commit('cart/setOrders', data.orders, { root: true })

        commit('setUserData', {
          name: data.name,
          id: data.id,
          token: parsedUser.token,
          cart: data.cart,
          favourites: data.favourites,
          orders: data.orders,
        })
        commit('setIsLogged', true)
      } catch (error) {
        console.error('Auto login failed:', error)
        commit('setUser', null)
        commit('setToken', null)
        Cookies.remove('token')
      } finally {
        commit('setIsLoading', false)
      }
    },
    logout({ commit }) {
      commit('setUserData', {
        name: null,
        id: null,
        token: null,
        cart: [],
        favourites: [],
        orders: [],
      })
      commit('favourites/setFavourites', [], {
        root: true,
      })
      commit('cart/setAddedProducts', [], { root: true })
      commit('cart/setOrders', [], { root: true })
      commit('setIsLogged', false)
      Cookies.remove('user')
      toast.info('Logged out')
      router.push('/login')
    },
  },
  namespaced: true,
}
