import { Middleware } from '@nuxt/types'
import { AxiosHelper } from '~/utils/axiosHelper'
import AuthUser from '~/store/authUser'

const setHeader: Middleware = () => {
  // @ts-ignore
  const credential = AuthUser.getters?.['Token']()
  if (credential?.token)
    AxiosHelper.SetHeaderAuthorizationToken(credential.token)
}

export default setHeader
