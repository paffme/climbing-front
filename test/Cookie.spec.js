import {
  getCookies,
  createCookie,
  getCookie,
  removeCookie,
  removeCookies
} from '~/utils/cookieHelper.ts'
import {
  createCookieFromObject,
  getCookieFromObject
} from '~/utils/cookieHelper'

describe('Cookie', () => {
  afterEach(() => {
    removeCookies()
  })

  test('Should return an empty cookie', () => {
    expect(getCookies()).toEqual([])
  })

  test('Should create a new cookie with correct value', () => {
    createCookie('username', 'test', 3600)
    expect(getCookie('username')).toEqual({ username: 'test' })
  })

  test('Should create a new cookie from an object', () => {
    createCookieFromObject('credentials', { name: 'Bob', id: 2 })

    const finalResult = getCookieFromObject('credentials')

    expect(finalResult).toEqual({ name: 'Bob', id: 2 })
  })

  test('Should remove on cookie create', () => {
    createCookie('username2', 'test')
    expect(getCookies()).toEqual([{ username2: 'test' }])
    removeCookie('username2')
    expect(getCookies()).toEqual([])
  })
})
