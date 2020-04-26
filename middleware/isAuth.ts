import { Middleware } from '@nuxt/types'
import { $axios } from "~/utils/api";

const unauthorizedRoute = ['login', 'subscriptions']
const isAuth: Middleware = ({route, store, redirect}) => {
  if (!route.name) return

  const isUnauthorizedRouteWhenConnected = unauthorizedRoute.includes(route.name)

  if (!isUnauthorizedRouteWhenConnected && !store.getters['authUser/Authenticated']) {
    return redirect('/login')
  }

  const credential = store.getters['authUser/Token']
  if (credential && credential.token) $axios.setToken(credential.token, 'Bearer')
}

export default isAuth
