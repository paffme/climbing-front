import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Buefy                                            from 'buefy'
import CompetitionCreate                           from '@/pages/competitions/create.vue'

let localVue
describe('CompetitionCreate', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(CompetitionCreate, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
