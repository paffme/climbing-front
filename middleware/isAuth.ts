import { Middleware } from '@nuxt/types'

const isAuth: Middleware = ({store, redirect}) => {
  if (!store.getters['authUser/Authenticated']) {
    return redirect('/login')
  }
}

export default isAuth
