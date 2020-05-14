import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Buefy                                            from 'buefy'
import EditOneCompetition                           from '@/pages/competitions/edit/_competitionId.vue'

let localVue
describe('EditOneCompetition', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const $route = { params: {} }
    const wrapper = shallowMount(EditOneCompetition, {
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
