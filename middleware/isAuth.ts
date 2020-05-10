import { Middleware } from '@nuxt/types'
import { AxiosHelper } from "~/utils/axiosHelper";

const unauthorizedRoute = ['login', 'subscriptions']
const isAuth: Middleware = ({route, store, redirect}) => {
  if (!route.name) return

  const authorizedRouteWhenConnected = unauthorizedRoute.includes(route.name)

  if (!authorizedRouteWhenConnected && !store.getters['authUser/Authenticated']) {
    return redirect('/login')
  }
  const credential = store.getters['authUser/Token']
  if (credential?.token) AxiosHelper.SetHeaderAuthorizationToken(credential.token)
}

export default isAuth
