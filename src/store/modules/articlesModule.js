import { axiosInstance } from '@/assets/axios'

export const articlesModule = {
  state: () => ({
    articles: [],
    isLoading: false,
    selectedArticleId: null,
  }),
  getters: {},
  mutations: {
    setArticles(state, articles) {
      state.articles = articles
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchArticles({ state, commit }) {
      try {
        commit('setIsLoading', true)
        const response = await axiosInstance.get('/articles')

        commit('setArticles', response.data)
      } catch (e) {
        alert(e)
      } finally {
        commit('setIsLoading', false)
      }
    },
  },
  namespaced: true,
}
