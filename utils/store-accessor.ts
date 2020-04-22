import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthUser from '~/store/authUser'

let authUser: AuthUser

function initialiseStores(store: Store<any>): void {
  authUser = getModule(AuthUser, store)
}

export { initialiseStores, authUser }
