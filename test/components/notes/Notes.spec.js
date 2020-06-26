import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import NotesCompetition from '@/pages/competitions/edit/_competitionId/index.vue'

let localVue
describe('NotesCompetitions', () => {
  let wrapper
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
    wrapper = shallowMount(NotesCompetition, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
