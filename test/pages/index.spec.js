import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import Dashboard from '@/pages/index.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'

let localVue
describe('Competitions', () => {
  const competitionMock = [
    {
      id: 4,
      name: 'Chalais Savoyard',
      categories: [
        {
          sex: 'female',
          name: 'benjamin'
        }
      ],
      startDate: '2020-04-25T14:50:54.000Z',
      endDate: '2020-04-25T14:50:54.000Z',
      city: 'Choisy',
      address: '19 Avenue Villejuif',
      postalCode: '94420',
      type: 'lead',
      createdAt: '2020-04-25T17:18:33.000Z',
      updatedAt: '2020-04-25T17:18:33.000Z'
    }
  ]
  let wrapper
  beforeAll(() => {
    wrapper = null
    localVue = createLocalVue()
    localVue.use(Buefy)
    wrapper = shallowMount(Dashboard, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  describe('fetchFutureCompetitions', () => {
    test('Should call GetCompetitions with right parameter', async () => {
      const spy = jest.spyOn(ApiHelper, 'GetCompetitions')
      spy.mockResolvedValue({ data: competitionMock })
      const futureCompetitions = await wrapper.vm.fetchFutureCompetitions()

      expect(futureCompetitions).toEqual(competitionMock)
    })
  })

  describe('fetchNbClimber', () => {
    test('Should call GetUserCount with right parameter', async () => {
      const spy = jest.spyOn(ApiHelper, 'GetUserCount')
      const count = 1992
      spy.mockResolvedValue({ data: { count } })
      const nbClimber = await wrapper.vm.fetchNbClimber()

      expect(nbClimber).toEqual(count)
    })
  })

  describe('fetchNbCompetitions', () => {
    test('Should call GetCompetitionsCount with right parameter', async () => {
      const spy = jest.spyOn(ApiHelper, 'GetCompetitionsCount')
      const count = 1992
      spy.mockResolvedValue({ data: { count } })
      const nbCompetitions = await wrapper.vm.fetchNbCompetitions()

      expect(nbCompetitions).toEqual(count)
    })
  })

  describe('countCompetitions', () => {
    test('Should call GetCompetitionsCount with right parameter', async () => {
      const competitions = [competitionMock, competitionMock]
      const nbCompetitions = await wrapper.vm.countCompetitions(competitions)

      expect(nbCompetitions).toEqual(competitions.length)
    })
  })
})
