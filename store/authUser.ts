import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "~/utils/api";
import { APIUserSubscription, AuthCredentials, SubscriptionCredentials, TokenCredentials, UserCredentials } from "~/definitions";


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
    this.tokenCredentials = newTokenCredential;
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
    return !!this.userCredentials
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
  async subscribeUser(credentials: SubscriptionCredentials): Promise<APIUserSubscription | any> {
    return await $axios.$post(`/users`, credentials)
  }
}
