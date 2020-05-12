import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import IndexCompetitions                           from '@/pages/competitions/index.vue'

let localVue
describe('IndexCompetitions', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(IndexCompetitions, {
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
