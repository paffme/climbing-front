import { Middleware } from '@nuxt/types'

const unauthorizedRoute = ['login', 'subscriptions']
const isAuth: Middleware = ({route, store, redirect}) => {
  if (!route.name) return

  const isUnauthorizedRouteWhenConnected = unauthorizedRoute.includes(route.name)

  if (!isUnauthorizedRouteWhenConnected && !store.getters['authUser/Authenticated']) {
    return redirect('/login')
  }
}

export default isAuth
