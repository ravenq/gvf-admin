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
  getPostList(offset, limit=10) {
    return request({
      url: '/post?sortby=pubTime&order=desc&limit='+ limit +'&offset=' + offset,
      method: 'get'
    })
  },
  getPostCount() {
    return request({
      url: '/post/count',
      method: 'get'
    })
  },
  getPost(id) {
    return request({
      url: '/post/' + id,
      method: 'get'
    })
  },
  updatePost(data) {
    return request({
      url: '/post/' + data.id,
      method: 'put',
      data
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
