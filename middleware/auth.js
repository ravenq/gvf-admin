import indexOf from 'lodash.indexof'

const filters = ['/', '/register', '/reset-password']

export default function({ isServer, store, req, route, redirect }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) {
    return
  }
  if (indexOf(filters, route.fullPath) < 0 && !store.getters.isAuthenticated) {
    return redirect('/')
  }
}
