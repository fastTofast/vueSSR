import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'

Vue.config.productionTip = false

//导出创建实例的工厂函数
export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return { app, router, store }
}
