import _ from 'lodash'

const filters = [
  '/register',
  '/reset-password'
]

export default function ({ store, route, redirect }) {
  if (_.indexOf(filters, (route.fullPath)) < 0 && !store.getters.isAuthenticated) {
    return redirect('/')
  }
}
