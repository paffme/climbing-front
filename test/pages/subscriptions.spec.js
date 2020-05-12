import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import Subscriptions                           from '@/pages/subscriptions.vue'

let localVue
describe('Subscriptions', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const $route = { query: {} }
    const wrapper = shallowMount(Subscriptions, {
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
