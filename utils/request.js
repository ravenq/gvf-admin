import axios from 'axios'
import config from '@/config'
import { Message } from 'element-ui'
import _ from 'lodash'
import { getters } from '@/store'

const request = axios.create({
  baseURL: config.BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  if (getters.token) {
    config.headers['session'] = getters.token
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

request.interceptors.response.use(
  response => {
    if (_.isEqual(response.data.status, 0)) {
      return response.data
    } else {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(response.data)
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
