import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import NotesCompetition from '@/pages/competitions/edit/_competitionId/notes.vue'

let localVue
describe('NotesCompetitions', () => {
  let wrapper
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
    wrapper = shallowMount(NotesCompetition, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  // TODO: WIP
  /*test('getCurrentRoundConfiguration', () => {
    const bouldering = {
      cadet: {
        male: {
          SEMI_FINAL: {
            id: 22,
            name: 'Test2',
            quota: 0,
            type: 'SEMI_FINAL',
            competitionId: 2,
            category: 'cadet',
            sex: 'male',
            maxTries: null,
            state: 'PENDING'
          }
        }
      },
      junior: {
        male: {
          QUALIFIER: {
            id: 21,
            name: 'Group1',
            quota: 0,
            type: 'QUALIFIER',
            competitionId: 2,
            category: 'junior',
            sex: 'male',
            maxTries: null,
            state: 'ONGOING'
          }
        }
      },
      senior: {
        male: {
          QUALIFIER: {
            id: 16,
            name: 'Test 3',
            quota: 3,
            type: 'QUALIFIER',
            competitionId: 2,
            category: 'senior',
            sex: 'male',
            maxTries: 2,
            state: 'ONGOING'
          },
          SEMI_FINAL: {
            id: 17,
            name: 'Test 2',
            quota: 0,
            type: 'SEMI_FINAL',
            competitionId: 2,
            category: 'senior',
            sex: 'male',
            maxTries: 2,
            state: 'PENDING'
          },
          FINAL: {
            id: 18,
            name: 'Test 3',
            quota: 0,
            type: 'FINAL',
            competitionId: 2,
            category: 'senior',
            sex: 'male',
            maxTries: null,
            state: 'PENDING'
          }
        }
      },
      veteran: {
        male: {
          QUALIFIER: {
            id: 19,
            name: 'Test',
            quota: 3,
            type: 'QUALIFIER',
            competitionId: 2,
            category: 'veteran',
            sex: 'male',
            maxTries: null,
            state: 'ONGOING'
          }
        }
      }
    }

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm.getCurrentRoundConfiguration()).toBe(false)
    expect(wrapper.vm.getCurrentRoundConfiguration(bouldering)).toBe(false)
  })*/
})
