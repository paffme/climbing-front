import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy                                            from 'buefy'
import BtnRegisterCompetition                           from '@/components/Button/BtnRegisterCompetition.vue'

let localVue
describe('BtnRegisterCompetition', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BtnRegisterCompetition, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        competitionId: 1,
        isConnected: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Should retrieve a correct template if isConnected is false', () => {
    const wrapper = shallowMount(BtnRegisterCompetition, {
      localVue,
      propsData: {
        competitionId: 1,
        isConnected: false
      }
    })
    expect(wrapper.find('b-tooltip-stub').exists()).toBe(true)
    expect(wrapper.find('b-tooltip-stub').html()).toBe(
      '' +
        '<b-tooltip-stub active="true" label="Vous devez être connecté" position="is-top" size="is-medium">\n' +
        '  <b-button-stub type="is-primary" nativetype="button" tag="button" disabled="">\n' +
        '    Je souhaite participer !\n' +
        '  </b-button-stub>\n' +
        '</b-tooltip-stub>'
    )
  })

  test('Should retrieve a correct template if isConnected is true', () => {
    const wrapper = shallowMount(BtnRegisterCompetition, {
      localVue,
      propsData: {
        competitionId: 1,
        isConnected: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.find('b-tooltip-stub').exists()).toBe(false)
    expect(wrapper.get('b-button-stub').html()).toBe(
      '' +
        '<b-button-stub type="is-primary" nativetype="button" tag="button">\n' +
        '  Je souhaite participer !\n' +
        '</b-button-stub>'
    )
  })
})
