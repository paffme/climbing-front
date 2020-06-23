import axios, { AxiosError } from 'axios'
import { Vue } from 'vue-property-decorator'
import _ from 'lodash'

export const AxiosHelper = {
  SetHeaderAuthorizationToken: setHeaderAuthorizationToken,
  RemoveHeaderAuthorizationToken: removeHeaderAuthorizationToken,
  HandleAxiosError: handleAxiosError
}

function setHeaderAuthorizationToken(token?: string): void {
  if (!token) {
    axios.defaults.headers.Authorization = null
    return
  }
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`
  }
}

function removeHeaderAuthorizationToken(): void {
  console.log('removeHeaderAuthorizationToken')
  delete axios.defaults.headers.Authorization
  delete axios.defaults.headers.authorization
}

function handleAxiosError(context: Vue, error: AxiosError): void {
  if (error.response) {
    const message = buildMessage(error.response.data)
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    if (!context || !context.$buefy) return
    context.$buefy.snackbar.open({
      type: 'is-danger',
      position: 'is-top',
      message: message || "Une erreur s'est produite",
      duration: 5000,
      indefinite: true
    })
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log(error.request)
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log('Error', error.message)
  }
  console.log(error)
}

function buildMessage(data: any) {
  if (!data) return
  console.log('AxiosError', data)
  if (data.statusCode === 500) {
    return (
      '<h1 class="subtitle has-text-white">Erreur</h1>' +
      "<ul><li>Une erreur s'est produite</li></ul>"
    )
  }
  if (Array.isArray(data) && data.length < 1) {
    return (
      '' +
      '<h1 class="subtitle has-text-white">Erreur de validation</h1>' +
      '<ul>' +
      data +
      ' </ul>'
    )
  }
  if (data.error && !data.errors) {
    return (
      '<h1 class="subtitle has-text-white">' +
      data.error +
      '</h1>' +
      '<span>' +
      data.message +
      ' </span>'
    )
  }
  const li = data.errors.map((error: any) => {
    return (
      '<li> - ' +
      Object.keys(error.constraints)[0] +
      ' : ' +
      _.values(error.constraints)[0] +
      '</li>'
    )
  })
  return (
    '<h1 class="subtitle has-text-white">Erreur de validation</h1>' +
    '<ul>' +
    li +
    '</ul>'
  )
}
