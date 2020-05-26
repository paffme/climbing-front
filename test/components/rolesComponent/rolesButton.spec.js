import {
  shallowMount,
  createLocalVue,
  RouterLinkStub,
  mount
} from '@vue/test-utils'
import Buefy from 'buefy'
import RolesButton from '@/components/RolesComponent/RolesButton.vue'

let localVue
describe('RolesButton', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(RolesButton, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Should emit event on click', () => {
    const wrapper = mount(RolesButton, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })

    wrapper.find('button.button').trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })
})
