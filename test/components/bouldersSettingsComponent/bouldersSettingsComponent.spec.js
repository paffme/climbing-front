import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import BouldersSettingsComponent from '@/components/BouldersSettingsComponent/BouldersSettingsComponent'

let localVue
describe('BouldersSettingsComponent', () => {
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Buefy)
  })
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BouldersSettingsComponent, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  describe('Extract', () => {
    const limitedData = {
      minime: {
        female: {
          QUALIFIER: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          },
          SEMI_FINAL: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          },
          FINAL: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          }
        },
        male: {
          QUALIFIER: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          },
          SEMI_FINAL: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          },
          FINAL: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          }
        }
      },
      poussin: {
        female: {
          QUALIFIER: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          },
          SEMI_FINAL: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          },
          FINAL: {
            id: 0,
            competitionId: 0,
            name: 0,
            quota: 0,
            type: 'CIRCUIT',
            sex: 'male',
            category: 'microbe',
            state: 'PENDING',
            maxTries: 0
          }
        }
      },
      senior: {},
      cadet: {
        female: {}
      }
    }
    let wrapper
    beforeAll(() => {
      wrapper = shallowMount(BouldersSettingsComponent, {
        localVue,
        stubs: {
          NuxtLink: RouterLinkStub
        }
      })
    })
    test('Should extract all Categories and Genre', () => {
      const result = [
        { genre: ['femme', 'homme'], category: 'minime' },
        { genre: ['femme'], category: 'poussin' }
      ]
      expect(wrapper.vm.extractCategoryGenre(limitedData)).toEqual(result)
    })

    test('Should return an empty array if no catgory is set', () => {
      expect(wrapper.vm.extractCategoryGenre(undefined)).toEqual([])
      expect(wrapper.vm.extractCategoryGenre({})).toEqual([])
    })
  })
})
