import Vue from 'vue'
import Vuex from 'vuex'
import $http from './utils/tools/http'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      articles: []
    },
    mutations: {
      setArticles (state, data) {
        state.articles = data
      }
    },
    actions: {
      async getArticles ({ commit }, data) {
        let params = {
          tag: data.tag
        }
        let articles = await $http.get('/article', { params })
        commit('setArticles', articles)
      }
    }
  })
}
