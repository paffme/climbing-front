import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import OneCompetition from '@/pages/competitions/_id.vue'

let localVue
describe('OneCompetition', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const $route = { params: {} }
    const wrapper = shallowMount(OneCompetition, {
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
