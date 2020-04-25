import { Middleware } from '@nuxt/types'
import { $axios } from "~/utils/api";

const unauthorizedRoute = ['login', 'subscriptions']
const isAuth: Middleware = ({route, store, redirect}) => {
  if (!route.name) return

  const isUnauthorizedRouteWhenConnected = unauthorizedRoute.includes(route.name)

  if (!isUnauthorizedRouteWhenConnected && !store.getters['authUser/Authenticated']) {
    return redirect('/login')
  }
  console.log('store.getters[\'authUser/Authenticated\']', store.getters['authUser/Credentials'])
  const credential = store.getters['authUser/Credentials']
  if (credential && credential.token) $axios.setToken(credential.token, 'Bearer')
}

export default isAuth
