import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy                                            from 'buefy'
import Login                           from '@/pages/login.vue'

let localVue
describe('Login', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const $route = { query: {} }
    const wrapper = shallowMount(Login, {
      localVue,
      mocks: {
        $route
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
