import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import BtnCreateCompetition from '@/components/Button/BtnCreateCompetition.vue'

let localVue
describe('BtnCreateCompetition', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BtnCreateCompetition, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        isConnected: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Should retrieve a correct template if isConnected is false', () => {
    const wrapper = shallowMount(BtnCreateCompetition, {
      localVue,
      propsData: {
        isConnected: false
      }
    })
    expect(wrapper.find('b-tooltip-stub').exists()).toBe(true)
    expect(wrapper.find('b-tooltip-stub').html()).toBe(
      '' +
        '<b-tooltip-stub active="true" label="Vous devez être connecté" position="is-top" size="is-medium">\n' +
        '  <b-button-stub type="is-success" iconright="license" nativetype="button" tag="router-link" disabled="" to="/competitions/create">\n' +
        '    Créer une compétition\n' +
        '  </b-button-stub>\n' +
        '</b-tooltip-stub>'
    )
  })

  test('Should retrieve a correct template if isConnected is true', () => {
    const wrapper = shallowMount(BtnCreateCompetition, {
      localVue,
      propsData: {
        isConnected: true
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.find('b-tooltip-stub').exists()).toBe(false)
    expect(wrapper.get('b-button-stub').html().toString()).toBe(
      '<b-button-stub type="is-success" iconright="license" nativetype="button" tag="router-link" to="/competitions/create">\n' +
        '  Créer une compétition\n' +
        '</b-button-stub>'
    )
  })
})
