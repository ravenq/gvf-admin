import request from '@/utils/request'

export default {
  getCategoryList() {
    return request({
      url: '/category',
      method: 'get'
    })
  },
  addCategory(data) {
    return request({
      url: '/category',
      method: 'post',
      data
    })
  },
  getPostList() {
    return request({
      url: '/post',
      method: 'get'
    })
  },
  addPost(data) {
    return request({
      url: '/post',
      method: 'post',
      data
    })
  },
  getMyloveList() {
    return request({
      url: '/mylove',
      method: 'get'
    })
  },
  addMylove(data) {
    return request({
      url: '/mylove',
      method: 'post',
      data
    })
  },
  getUploadToken() {
    return request({
      url: '/upload',
      method: 'get'
    })
  },
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  register(data) {
    return request({
      url: '/user',
      method: 'post',
      data
    })
  }
}
