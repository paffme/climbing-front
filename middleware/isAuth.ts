import { Middleware } from '@nuxt/types'
import { AxiosHelper } from '~/utils/axiosHelper'
import AuthUser from '~/store/authUser'

const unauthorizedRoute = ['login', 'subscriptions']
const isAuth: Middleware = ({ route, redirect }) => {
  if (!route.name) return

  const authorizedRouteWhenConnected = unauthorizedRoute.includes(route.name)

  // @ts-ignore
  const authenticated = AuthUser.getters?.['Authenticated']()
  if (!authorizedRouteWhenConnected && !authenticated) {
    return redirect('/login')
  }
  // @ts-ignore
  const credential = AuthUser.getters?.['Token']()
  if (credential?.token)
    AxiosHelper.SetHeaderAuthorizationToken(credential.token)
}

export default isAuth
