import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import RolesModalComponent from '@/components/RolesComponent/RolesModalComponent.vue'

let localVue
describe('RolesModalComponent', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(RolesModalComponent, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
