import { Middleware } from '@nuxt/types'
import { AxiosHelper } from '~/utils/axiosHelper'

const setHeader: Middleware = ({ store }) => {
  const credential = store.getters['authUser/Token']
  console.log('setHeader - credential', credential)
  if (credential?.token)
    AxiosHelper.SetHeaderAuthorizationToken(credential.token)
}

export default setHeader
