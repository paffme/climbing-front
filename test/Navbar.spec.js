import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import Navbar from '@/components/Navbar.vue'

let localVue
describe('Navbar', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        navbarItems: [{ linkTo: 'lol', icon: 'test' }]
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Should correctly fill all items ', () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        navbarItems: [
          { linkTo: 'lol', icon: 'test' },
          { linkTo: 'lol2', icon: 'test2' }
        ]
      }
    })
    expect(wrapper.vm.fillNavbarItems()).toEqual([
      { icon: 'test', linkTo: 'lol' },
      { linkTo: 'lol2', icon: 'test2' }
    ])
  })

  test('Should not correctly fill all items ', () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        navbarItems: [{ to: 'lol', i: 'test' }]
      }
    })

    expect(wrapper.vm.fillNavbarItems()).toEqual([])
  })
})
