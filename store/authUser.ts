import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "~/utils/api";
import { APIUserSubscription, AuthCredentials, SubscriptionCredentials, TokenCredentials, UserCredentials } from "~/definitions";
import { createCookie, getCookie } from "~/utils/cookieHelper";


@Module({
  name: "authUser",
  stateFactory: true,
  namespaced: true
})
export default class AuthUser extends VuexModule {
  tokenCredentials?: TokenCredentials;
  userCredentials?: UserCredentials;

  @Mutation
  setTokenCredentials(newTokenCredential: TokenCredentials) {
    $axios.setToken(newTokenCredential.token, 'Bearer')
    createCookie('token', newTokenCredential.token)
  }

  @Mutation
  setUserCredentials(newUserCredential: UserCredentials) {
    this.userCredentials = newUserCredential;
  }

  @Mutation
  disconnectUser(): void {
    this.tokenCredentials = undefined
    this.userCredentials = undefined
  }

  get Credentials() {
    return this.tokenCredentials;
  }
  get Authenticated() {
    return !!getCookie('token')
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchToken(credentials: AuthCredentials): Promise<TokenCredentials> {
    return {
      token: "fakeToken",
      userId: 1,
      expiresIn: 0,
      createdAt: "2020-04-13T13:50:49.295Z"
    };
    return await $axios.$post('/users/token', credentials)
  }

  @Action({ rawError: true }) // Use to get a detailled errors
  async fetchUser(userId: number): Promise<UserCredentials> {
    return {
      email: 'fake@email.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: "2020-04-13T13:50:49.295Z",
      updatedAt: "2020-04-13T13:50:49.295Z"
    }
    return await $axios.$get(`/users/${userId}`)
  }

  @Action({rawError: true})
  async subscribeUser(credentials: SubscriptionCredentials): Promise<APIUserSubscription | any> {
    return await $axios.$post(`/users`, credentials)
  }
}
