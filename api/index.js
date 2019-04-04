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
    return this.axios.get('/post/count')
  }
  getPost(id) {
    return this.axios.get(`/post/${id}`)
  }
  updatePost(data) {
    return this.axios.put(`/post/${data.id}`, data)
  }
  addPost(data) {
    return this.axios.post('/post/', data)
  }
  getMyloveList() {
    return this.axios.get('/mylove')
  }
  getMylove(id) {
    return this.axios.get(`/mylove/${id}`)
  }
  addMylove(data) {
    return this.axios.post('/mylove', data)
  }
  updateMylove(data) {
    return this.axios.post(`/mylove/${data.id}`, data)
  }
  getUploadToken() {
    return this.axios.get('/upload')
  }
  login(data) {
    return this.axios.post('/user/login', data)
  }
  register(data) {
    return this.axios.post('/user', data)
  }
}
