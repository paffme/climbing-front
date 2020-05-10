import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
  APIUser,
  AuthCredentials,
  DTOSubscriptionCredentials,
  SubscriptionCredentials,
  TokenCredentials,
  UserCredentials
} from "~/definitions";
import {
  createCookie,
  createCookieFromObject,
  getCookie,
  getCookieFromObject,
  removeCookie
} from "~/utils/cookieHelper";
import { ApiHelper } from "~/utils/api_helper/apiHelper";
import { AxiosResponse } from "~/node_modules/axios";
import axios from "axios";

@Module({
  name: "authUser",
  stateFactory: true,
  namespaced: true
})
export default class AuthUser extends VuexModule {
  @Mutation
  setTokenCredentials(newTokenCredential: TokenCredentials) {
    ApiHelper.SetToken(newTokenCredential.token)
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
  async fetchToken(credentials: AuthCredentials): Promise<AxiosResponse<TokenCredentials>> {
    return ApiHelper.GetToken(credentials)
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchUser(userId: number): Promise<AxiosResponse<UserCredentials>> {
    return await ApiHelper.GetUser(userId)
  }

  @Action({rawError: true})
  async subscribeUser(credentials: DTOSubscriptionCredentials): Promise<AxiosResponse<void>> {
    return await ApiHelper.SubscribeUser(credentials)
  }
}
