import Vue from 'vue'
import Router from 'vue-router'
import Layer from './components/Layer.vue'
import Home from './views/Home.vue'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/chenxp',
        name: 'layer',
        component: Layer,
        children: [
          {
            path: 'home',
            name: 'home',
            component: Home
          },
          {
            path: 'article/:tag/:id',
            name: 'article',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "Article" */ './views/Article.vue')
          },
          {
            path: 'addArticle',
            name: 'addArticle',
            component: () => import(/* webpackChunkName: "addArticle" */ './views/AddArticle.vue')
          }
        ]
      }
    ]
  })
}
