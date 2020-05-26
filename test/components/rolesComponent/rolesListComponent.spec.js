import {
  shallowMount,
  createLocalVue,
  RouterLinkStub,
  mount
} from '@vue/test-utils'
import Buefy from 'buefy'
import RolesListComponent from '@/components/RolesComponent/RolesListComponent.vue'

let localVue
describe('RolesListComponent', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(RolesListComponent, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Should emit event on click', () => {
    const wrapper = mount(RolesListComponent, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        users: [
          {
            id: 1,
            firstName: 'Laurent',
            lastName: 'Gbagbo',
            createdAt: '2020-05-13T15:07:32.000Z',
            updatedAt: '2020-05-13T15:07:32.000Z'
          }
        ]
      }
    })

    wrapper.get('.removeButton').trigger('click')

    expect(wrapper.emitted().remove).toBeTruthy()
  })
})
