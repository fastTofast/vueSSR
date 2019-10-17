// import router from '../router'
// import { Loading, Message, MessageBox } from 'element-ui'
// import { getCookie } from './index'
const axios = require('axios')
// axios.defaults.headers.post['Content-Type'] = 'application/json'
const ops = {
  withCredentials: true,
  baseURL: process.env.NODE_ENV === 'production' ? 'https://wwww.nodetop.top/chenxp' : 'http://127.0.0.1:7001'
}
const instance = axios.create(ops)
let loadingInstance
instance.interceptors.request.use(
  config => {
    const newConfig = Object.assign(config, instance.prototype.cusConfig)
    // newConfig.headers['x-csrf-token'] = getCookie('csrf')
    instance.prototype.cusConfig = {}
    if (!newConfig.hideLoading) {
      // loadingInstance = Loading.service()
    }
    return newConfig
  },
  err => {
    console.log(err)
    instance.prototype.cusConfig = {}
    // Message.error(err.message)
  }
)

instance.interceptors.response.use(
  res => {
    loadingInstance && loadingInstance.close()
    if (res.data.code === 0 || res.status === 200) {
      if (res.config.returnAll) {
        return Promise.resolve(res.data)
      }
      return Promise.resolve(res.data.data)
    }
    switch (res.data.code) {
      case -100:
        // Message.error(res.data.msg)
        // router.replace({
        //   path: '/login',
        //   query: {}
        // })
        return Promise.reject(res.data.msg)
      default:
        if (res.config.returnAll) {
          return Promise.resolve(res.data)
        }
    }
    // Message.error(res.data.msg || res.data)
    return Promise.reject(res.data.msg || res.data)
  },
  err => {
    loadingInstance && loadingInstance.close()
    // Message.error(err.message)
    return Promise.reject(err)
  }
)
export default instance
