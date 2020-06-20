import axios, { AxiosError } from 'axios'
import { Vue } from 'vue-property-decorator'

export const AxiosHelper = {
  SetHeaderAuthorizationToken: setHeaderAuthorizationToken,
  RemoveHeaderAuthorizationToken: removeHeaderAuthorizationToken,
  HandleAxiosError: handleAxiosError
}

function setHeaderAuthorizationToken(token: string): void {
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
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    if (!context || !context.$buefy) return
    context.$buefy.toast.open({
      type: 'is-danger',
      message: error.response.data.message || "Une erreur s'est produite",
      duration: 5000
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
