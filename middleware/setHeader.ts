import { Middleware } from '@nuxt/types'
import { AxiosHelper } from '~/utils/axiosHelper'
import { authUser } from "~/utils/store-accessor"

const setHeader: Middleware = ({ store }) => {
  const credential = store.getters['authUser/Token']
  console.log('setHeader - credential', credential)
  console.log('document.cookie', document.cookie)
  console.log('AUTHUSER', authUser.Token)
  if (credential?.token)
    AxiosHelper.SetHeaderAuthorizationToken(credential.token)
}

export default setHeader
