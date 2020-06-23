import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import EditOneCompetition from '~/pages/competitions/edit/_competitionId.vue'

let localVue
describe('EditOneCompetition', () => {
  let router
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
    localVue.use(VueRouter)
    router = new VueRouter()
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(EditOneCompetition, {
      localVue,
      router,
      stubs: ['nuxt-link', 'nuxt-child']
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  describe('displayCurrentRole', () => {
    test('Should return roles', () => {
      const wrapper = shallowMount(EditOneCompetition, {
        localVue,
        router,
        stubs: ['nuxt-link', 'nuxt-child']
      })
      expect(wrapper.vm.displayCurrentRole({ organizer: true })).toBe(
        'Organisateurs'
      )
      expect(wrapper.vm.displayCurrentRole({ juryPresident: true })).toBe(
        'Président'
      )
      expect(wrapper.vm.displayCurrentRole({ judge: true })).toBe('Juges')
      expect(wrapper.vm.displayCurrentRole({ chiefRouteSetter: true })).toBe(
        'Chef routes setters'
      )
      expect(wrapper.vm.displayCurrentRole({ routeSetter: true })).toBe(
        'Routes setters'
      )
      expect(wrapper.vm.displayCurrentRole({ technicalDelegate: true })).toBe(
        'Délégués techniques'
      )
      expect(wrapper.vm.displayCurrentRole({ technicalDelegate: null })).toBe(
        null
      )
      expect(wrapper.vm.displayCurrentRole(null)).toBe(null)
      expect(wrapper.vm.displayCurrentRole(undefined)).toBe(null)
      expect(wrapper.vm.displayCurrentRole({})).toBe(null)
    })
  })
})
