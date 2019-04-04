export default class {
  constructor(axios) {
    this.axios = axios
  }
  getCategoryList() {
    return this.axios.get('/category')
  }
  addCategory(data) {
    return this.axios.post('/category', data)
  }
  getPostList(offset, limit = 10) {
    return this.axios.get(
      `/post?sortby=pubTime&order=desc&limit=${limit}&offset=${offset}`
    )
  }
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
