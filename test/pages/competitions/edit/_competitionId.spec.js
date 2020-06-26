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
      expect(wrapper.vm.displayCurrentRole({ organizer: true })).toStrictEqual([
        'Organisateurs'
      ])
      expect(
        wrapper.vm.displayCurrentRole({ juryPresident: true })
      ).toStrictEqual(['Président'])
      expect(wrapper.vm.displayCurrentRole({ judge: true })).toStrictEqual([
        'Juges'
      ])
      expect(
        wrapper.vm.displayCurrentRole({ chiefRouteSetter: true })
      ).toStrictEqual(['Chef routes setters'])
      expect(
        wrapper.vm.displayCurrentRole({ routeSetter: true })
      ).toStrictEqual(['Routes setters'])
      expect(
        wrapper.vm.displayCurrentRole({ technicalDelegate: true })
      ).toStrictEqual(['Délégués techniques'])

      expect(
        wrapper.vm.displayCurrentRole({
          technicalDelegate: true,
          routeSetter: true
        })
      ).toStrictEqual(['Délégués techniques', 'Routes setters'])

      expect(wrapper.vm.displayCurrentRole({ technicalDelegate: null })).toBe(
        null
      )
      expect(wrapper.vm.displayCurrentRole(null)).toBe(null)
      expect(wrapper.vm.displayCurrentRole(undefined)).toBe(null)
      expect(wrapper.vm.displayCurrentRole({})).toBe(null)
    })
  })
})
