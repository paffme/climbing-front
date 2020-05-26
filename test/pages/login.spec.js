import {
  shallowMount,
  mount,
  createLocalVue,
  RouterLinkStub
} from '@vue/test-utils'
import Buefy from 'buefy'
import Login from '@/pages/login.vue'
import Message from '~/definitions/fr'

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

  describe('Display a specific message if user come from a subscribe page', () => {
    let myWrapper
    beforeAll(() => {
      const $route = { query: { fromSubscription: true } }
      myWrapper = mount(Login, {
        localVue,
        mocks: { $route },
        stubs: { NuxtLink: RouterLinkStub }
      })
    })
    test('Should retrieve the query from queryParams', () => {
      expect(myWrapper.vm.fromSubscription).toEqual(true)
      expect(myWrapper.vm.form.message).toEqual(Message.LoginIncitation)
    })
    test('Should be false if the query is not present', () => {
      const $route = { query: null }
      const wrapper = mount(Login, {
        localVue,
        mocks: {
          $route
        },
        stubs: {
          NuxtLink: RouterLinkStub
        }
      })

      expect(wrapper.vm.fromSubscription).toEqual(false)
      expect(wrapper.vm.form.message).toEqual('')
    })
  })
})
