import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Vuex from 'vuex'

import {
  APIUser,
  AuthCredentials,
  DTOSubscriptionCredentials,
  APIToken,
  APIUserCredentials
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


interface StoreType {
  mm: AuthUser
}
// Declare empty store first
const store = new Vuex.Store<StoreType>({})

@Module({
  name: 'authUser',
  store: store,
  dynamic: true
})
export default class AuthUser extends VuexModule {
  public myToken = getCookie('token')
  @Mutation
  addTokenToCookies(newTokenCredential: string, expireIn: number) {
    createCookie('token', newTokenCredential, expireIn)
    this.myToken = newTokenCredential
  }

  @Mutation
  setUserCredentials(newUserCredential: APIUserCredentials) {
    createCookieFromObject('credentials', newUserCredential)
  }

  @Mutation
  disconnectUser(): void {
    removeCookie('token')
    removeCookie('credentials')
  }

  get Token() {
    return this.myToken
    // return getCookie('token')
  }

  get Authenticated() {
    return !!getCookie('token')
  }

  get Credentials(): APIUser | undefined {
    return getCookieFromObject('credentials')
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchToken(
    credentials: AuthCredentials
  ): Promise<AxiosResponse<APIToken>> {
    return ApiHelper.GetToken(credentials)
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchUser(userId: number): Promise<AxiosResponse<APIUserCredentials>> {
    return ApiHelper.GetUser(userId)
  }

  @Action({ rawError: true })
  async subscribeUser(
    credentials: DTOSubscriptionCredentials
  ): Promise<AxiosResponse<void>> {
    return ApiHelper.SubscribeUser(credentials)
  }
}
