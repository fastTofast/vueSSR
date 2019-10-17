import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import http from './utils/tools/http'
Vue.config.productionTip = false
Vue.prototype.$http = http

// 导出创建实例的工厂函数
export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
