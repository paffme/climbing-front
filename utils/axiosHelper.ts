import axios from "axios";

export const AxiosHelper = {
  SetHeaderAuthorizationToken: setHeaderAuthorizationToken,
  RemoveHeaderAuthorizationToken: removeHeaderAuthorizationToken,
}
function setHeaderAuthorizationToken(token: string): void {
  console.log('setHeaderAuthorizationToken', token)
  axios.defaults.headers = {
    'Authorization': `Bearer ${token}`
  }
}

function removeHeaderAuthorizationToken(): void {
  console.log('removeHeaderAuthorizationToken')
  delete axios.defaults.headers['Authorization']
  delete axios.defaults.headers['authorization']
}
