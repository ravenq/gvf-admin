import cookies from 'js-cookie'

const CookiesKey = 'Admin-Cookies'

export const state = () => ({
  isCollapseSidebar: false,
  user: {
    name: 'unlogin',
    token: null
  },
})

export const mutations = {
  toggleSidebar (state) {
    state.isCollapseSidebar = !state.isCollapseSidebar
  },
  setUser(state, data) {
    state.user = data
    cookies.set(CookiesKey, data)
  }
}