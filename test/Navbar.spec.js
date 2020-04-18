import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Navbar                                           from "@/components/Navbar.vue";
import Buefy                                            from "buefy";

let localVue
describe("Navbar", () => {
  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Buefy);
  })
  test("is a Vue instance", () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        navbarItems: [{linkTo: 'lol', icon: 'test'}]
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test("Should correctly fill all items ", () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        navbarItems: [{linkTo: 'lol', icon: 'test'}]
      }
    });
    expect(wrapper.vm.fillNavbarItems()).toEqual([{"icon": "test", "linkTo": "lol"}])
  })

  test("Should not correctly fill all items ", () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        navbarItems: [{to: 'lol', i: 'test'}]
      }
    });

    expect(wrapper.vm.fillNavbarItems()).toEqual([])
  })
});
