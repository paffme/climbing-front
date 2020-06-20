import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import {
  APIUser,
  AuthCredentials,
  DTOSubscriptionCredentials,
  APIToken
} from '~/definitions'
import {
  createCookie,
  createCookieFromObject,
  getCookie,
  getCookieFromObject,
  removeCookie
} from '~/utils/cookieHelper'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosResponse } from '~/node_modules/axios'

@Module({
  name: 'authUser',
  stateFactory: true,
  namespaced: true
})
export default class AuthUser extends VuexModule {
  @Mutation
  addTokenToCookies(newTokenCredential: string, expiresIn: number) {
    createCookie('token', newTokenCredential, expiresIn)
  }

  @Mutation
  setUserCredentials(newUserCredential: APIUser) {
    createCookieFromObject('credentials', newUserCredential)
  }

  @Mutation
  disconnectUser(): void {
    removeCookie('token')
    removeCookie('credentials')
  }

  get Token() {
    return getCookie('token')
  }

  get Authenticated() {
    return !!getCookie('token')
  }

  get Credentials(): APIUser | undefined {
    const object = getCookieFromObject('credentials')
    console.log('credentials call', object)
    return object
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchToken(
    credentials: AuthCredentials
  ): Promise<AxiosResponse<APIToken>> {
    return ApiHelper.GetToken(credentials)
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchUser(userId: number): Promise<AxiosResponse<APIUser>> {
    return ApiHelper.GetUser(userId)
  }

  @Action({ rawError: true })
  async subscribeUser(
    credentials: DTOSubscriptionCredentials
  ): Promise<AxiosResponse<void>> {
    return ApiHelper.SubscribeUser(credentials)
  }
}
