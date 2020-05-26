import { AuthCredentials } from '~/definitions/index'

export type FormEvent = {
  error: boolean
  success: boolean
  message: string | null
}

export type LoginEvent = FormEvent & {
  data: AuthCredentials
}
