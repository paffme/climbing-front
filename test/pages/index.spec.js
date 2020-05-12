import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy                                            from 'buefy'
import Competitions                           from '@/pages/index.vue'

let localVue
describe('Competitions', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Competitions, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
