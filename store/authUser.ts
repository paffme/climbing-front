import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "~/utils/api";
import { APIUser, AuthCredentials, SubscriptionCredentials, TokenCredentials, UserCredentials } from "~/definitions";
import {
  createCookie,
  createCookieFromObject,
  getCookie,
  getCookieFromObject,
  removeCookie
} from "~/utils/cookieHelper";

@Module({
  name: "authUser",
  stateFactory: true,
  namespaced: true
})
export default class AuthUser extends VuexModule {
  @Mutation
  setTokenCredentials(newTokenCredential: TokenCredentials) {
    $axios.setToken(newTokenCredential.token, 'Bearer')
    createCookie('token', newTokenCredential.token)
  }

  @Mutation
  setUserCredentials(newUserCredential: UserCredentials) {
    createCookieFromObject('credentials', newUserCredential)
  }

  @Mutation
  disconnectUser(): void {
    removeCookie('token')
    removeCookie('credentials')
  }

  get Token() {
    return getCookie('token');
  }
  get Authenticated() {
    return !!getCookie('token')
  }
  get Credentials(): APIUser | undefined {
    return getCookieFromObject('credentials');
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchToken(credentials: AuthCredentials): Promise<TokenCredentials> {
    return await $axios.$post('/users/token', credentials)
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchUser(userId: number): Promise<UserCredentials> {
    return await $axios.$get(`/users/${userId}`)
  }

  @Action({rawError: true})
  async subscribeUser(credentials: SubscriptionCredentials): Promise<APIUser | any> {
    return await $axios.$post(`/users`, credentials)
  }
}
