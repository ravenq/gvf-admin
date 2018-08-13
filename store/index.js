export const state = () => ({
  isCollapseSidebar: false,
  user: {
    name: 'unlogin',
    token: null
  }
})

export const mutations = {
  toggleSidebar (state) {
    state.isCollapseSidebar = !state.isCollapseSidebar
  },
  setUser (state, data) {
    state.user = data
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user.token
  },
  token () {
    return state.user.token
  }
}
