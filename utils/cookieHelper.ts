import moment from 'moment'

export function getCookies(): Array<Object> {
  const cookies = document.cookie.split(';')
  const allCookies: Array<any> = []
  cookies.forEach((cookie) => {
    const splitted = cookie.split('=')
    if (!splitted[0] || !splitted[1]) {
      return
    }
    allCookies.push({ [splitted[0]]: splitted[1] })
  })
  return allCookies
}

export function getCookie(name: string): null | {} {
  const cookies = document.cookie.replace('; ', ';').split(';')
  let finalCookie = null
  cookies.forEach((cookie) => {
    const splitted = cookie.split('=')

    if (splitted[0] === name) {
      finalCookie = {
        [splitted[0]]: splitted[1]
      }
    }
  })
  return finalCookie
}

export function getCookieFromObject(name: string): any | null {
  let finalResult = null
  // On supprime les espaces vides pour bien checker la clé de l'objet
  const cookies = document.cookie.replace('; ', ';').split(';')
  cookies.forEach((cookie) => {
    const splitted = cookie.split('=')
    if (splitted[0] === name) {
      finalResult = JSON.parse(splitted[1])
    }
  })
  return finalResult
}

export function removeCookies(): void {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}

export function removeCookie(cookieName: string): void {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export function createCookie(
  key: string,
  value: string,
  expires = 3600,
  path = '/'
): void {
  document.cookie = `${key}=${value}; path=${path}; expires=${formatExpire(
    expires
  )}`
}

export function formatExpire(expire: number) {
  return moment().add(expire, 's').toDate().toString()
}

export function createCookieFromObject(
  key: string,
  value: object,
  expires = 3600,
  path = '/'
): void {
  document.cookie = `${key}=${JSON.stringify(
    value
  )}; path=${path}; expires=${formatExpire(expires)}`
}
