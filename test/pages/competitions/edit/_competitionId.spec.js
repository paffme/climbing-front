import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import EditOneCompetition from '@/pages/competitions/edit/_competitionId.vue'

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

  describe('displayCurrentRole', () => {
    test('Should return roles', () => {
      const $route = { params: { competitionId: 1 } }
      const wrapper = shallowMount(EditOneCompetition, {
        localVue,
        mocks: {
          $route
        },
        stubs: {
          NuxtLink: RouterLinkStub
        }
      })
      expect(wrapper.vm.displayCurrentRole({ organizer: true })).toBe(
        'organizer'
      )
      expect(wrapper.vm.displayCurrentRole({ juryPresident: true })).toBe(
        'juryPresident'
      )
      expect(wrapper.vm.displayCurrentRole({ judge: true })).toBe('judge')
      expect(wrapper.vm.displayCurrentRole({ chiefRouteSetter: true })).toBe(
        'chiefRouteSetter'
      )
      expect(wrapper.vm.displayCurrentRole({ routeSetter: true })).toBe(
        'routeSetter'
      )
      expect(wrapper.vm.displayCurrentRole({ technicalDelegate: true })).toBe(
        'technicalDelegate'
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
