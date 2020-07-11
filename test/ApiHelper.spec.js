import axios from 'axios'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import API_URL from '~/utils/api_helper/apiUrl'
import { TypeBoulderingRound } from '~/definitions'

jest.mock('axios')

describe('ApiHelper', () => {
  describe('ApiHelper Function', () => {
    describe('registerUserInCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'registerOrRemoveUserInCompetition')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.AddUserInCompetition(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('RemoveUserFromCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'registerOrRemoveUserInCompetition')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.RemoveUserFromCompetition(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('GetRegistrations', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getRegistrations')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetRegistrationsForACompetition(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('GetJuryPresidents', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getJuryPresidents')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetJuryPresidents(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('AddJuryPresident', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJuryPresident')
        axios.put.mockResolvedValue('success')

        const result = await ApiHelper.AddJuryPresident(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('removeJuryPresident', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJuryPresident')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.RemoveJuryPresident(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('GetJudges', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getJudges')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetJudges(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('AddJudge', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJudge')
        axios.put.mockResolvedValue('success')

        const result = await ApiHelper.AddJudge(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('RemoveJudge', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJudge')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.RemoveJudge(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('GetChiefRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getChiefRouteSetters')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetChiefRouteSetters(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('AddChiefRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveChiefRouteSetters')
        axios.put.mockResolvedValue('success')

        const result = await ApiHelper.AddChiefRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('RemoveChiefRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveChiefRouteSetters')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.RemoveChiefRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('GetRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getRouteSetters')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetRouteSetters(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('AddRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveRouteSetters')
        axios.put.mockResolvedValue('success')

        const result = await ApiHelper.AddRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('RemoveRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveRouteSetters')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.RemoveRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('GetTechnicalDelegates', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getTechnicalDelegates')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetTechnicalDelegates(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('AddTechnicalDelegates', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveTechnicalDelegates')
        axios.put.mockResolvedValue('success')

        const result = await ApiHelper.AddTechnicalDelegates(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('RemoveTechnicalDelegates', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveTechnicalDelegates')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.RemoveTechnicalDelegates(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('GetOrganizers', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getOrganizers')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetOrganizers(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('AddOrganizers', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveOrganizers')
        axios.put.mockResolvedValue('success')

        const result = await ApiHelper.AddOrganizers(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('RemoveOrganizers', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveOrganizers')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.RemoveOrganizers(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2)
        expect(result).toEqual('success')
      })
    })

    describe('AddRound', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getOraddRound')
        axios.post.mockResolvedValue('success')

        const result = await ApiHelper.AddRound(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('AddBoulderingResult', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addBoulderingResult')
        axios.post.mockResolvedValue('success')

        const result = await ApiHelper.AddBoulderingResult({}, 1, 4, 2, 3)
        expect(spy).toHaveBeenCalledWith(1, 4, 2, 3)
        expect(result).toEqual('success')
      })
    })

    describe('AddBulkResult', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addBulkResult')
        axios.post.mockResolvedValue('success')

        const result = await ApiHelper.AddBulkResult({}, 1, 4, 2)
        expect(spy).toHaveBeenCalledWith(1, 4, 2)
        expect(result).toEqual('success')
      })
    })

    describe('CreateCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'createOrGetCompetitions')
        axios.post.mockResolvedValue('success')
        const bodyExample = {
          name: 'Chalais Savoyard',
          type: 'Speed',
          startDate: new Date(),
          endDate: new Date(),
          address: '19 Avenue Villejuif',
          city: 'Choisy',
          postalCode: '944320',
          categories: [{ sex: 'female', name: 'minime' }]
        }

        const result = await ApiHelper.CreateCompetition(bodyExample)
        expect(spy).toHaveBeenCalled()
        expect(result).toEqual('success')
      })
    })

    describe('GetCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'updateOrGetCompetition')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetCompetition(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('GetCompetitionRankings', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getCompetitionRankings')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetCompetitionRankings(1)
        expect(spy).toHaveBeenCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    describe('getCompetitions', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'createOrGetCompetitions')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetCompetitions()
        expect(spy).toHaveBeenCalled()
        expect(result).toEqual('success')
      })

      test('Should call with query args', async () => {
        const spy = jest.spyOn(API_URL, 'createOrGetCompetitions')
        axios.get.mockResolvedValue('success')
        const fakeQuery = '{"startDate":{"$gte":"2020-05-07T22:00:00.000Z"}}'

        const result = await ApiHelper.GetCompetitions(fakeQuery)
        expect(spy).toHaveBeenCalledWith(fakeQuery)
        expect(result).toEqual('success')
      })
    })

    describe('GetUserCount', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getUserCount')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetUserCount()
        expect(spy).toHaveBeenCalled()
        expect(result).toEqual('success')
      })
    })

    describe('GetCompetitionsCount', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getCompetitionsCount')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetCompetitionsCount()
        expect(spy).toHaveBeenCalled()
        expect(result).toEqual('success')
      })

      test('Should call with query', async () => {
        const spy = jest.spyOn(API_URL, 'getCompetitionsCount')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetCompetitionsCount(
          'startDate":{"$gte":"2020-05-07T22:00:00.000Z"}'
        )
        expect(spy).toHaveBeenCalledWith(
          'startDate":{"$gte":"2020-05-07T22:00:00.000Z"}'
        )
        expect(result).toEqual('success')
      })
    })

    describe('getUserCompetitionRoles', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getUserCompetitionRoles')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetRolesForCompetition(3, 4)
        expect(spy).toBeCalledWith(3, 4)
        expect(result).toEqual('success')
      })
    })

    describe('getUserCompetitionRoles', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getCompetitionsPagination')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetCompetitionsPagination(3, 4)
        expect(spy).toBeCalledWith(3, 4, undefined)
        expect(result).toEqual('success')
      })

      test('Should call with query args', async () => {
        const spy = jest.spyOn(API_URL, 'getCompetitionsPagination')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetCompetitionsPagination(
          3,
          4,
          'query:{}'
        )
        expect(spy).toBeCalledWith(3, 4, 'query:{}')
        expect(result).toEqual('success')
      })
    })

    describe('Groups', () => {
      describe('Get', () => {
        test('Should call with rights args', async () => {
          const spy = jest.spyOn(API_URL, 'getBoulderingGroups')
          axios.get.mockResolvedValue('success')

          const result = await ApiHelper.GetBoulderingGroups(1, 2)
          expect(spy).toBeCalledWith(1, 2)
          expect(result).toEqual('success')
        })
      })

      describe('Delete', () => {
        test('Should call with rights args', async () => {
          const spy = jest.spyOn(API_URL, 'deleteBoulderingGroups')
          axios.delete.mockResolvedValue('success')

          const result = await ApiHelper.DeleteBoulderingGroups(1, 2, 3)
          expect(spy).toBeCalledWith(1, 2, 3)
          expect(result).toEqual('success')
        })
      })

      describe('Post', () => {
        test('Should call with rights args', async () => {
          const spy = jest.spyOn(API_URL, 'createBoulderingGroup')
          axios.post.mockResolvedValue('success')

          const result = await ApiHelper.CreateBoulderingGroup(1, 2, {
            name: 'test'
          })
          expect(spy).toBeCalledWith(1, 2)
          expect(result).toEqual('success')
        })
      })
    })

    describe('getRegistrationsByUser', () => {
      test('Should call with rights args', async () => {
        const spy = jest.spyOn(API_URL, 'getRegistrationsByUser')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetRegistrationsByUser(1)
        expect(spy).toBeCalledWith(1)
        expect(result).toEqual('success')
      })
    })

    test('getOrganizations - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getOrganizations')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetOrganizations(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    test('GetChiefRouteSettings - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getChiefRouteSettings')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetChiefRouteSettings(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    test('getRouteSettings - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getRouteSettings')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetRouteSettings(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    test('getJuryPresidencies - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getJuryPresidencies')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetJuryPresidencies(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    test('getTechnicalDelegations - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getTechnicalDelegations')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetTechnicalDelegations(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    test('getJudgementsAssignments - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getJudgementsAssignments')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetJudgementsAssignments(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    test('getJudgements - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getJudgements')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetJudgements(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    test('getJudgementsAssignmentsByCompetition - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getJudgementsAssignmentsByCompetition')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetJudgementsAssignmentsByCompetition(1, 2)
      expect(spy).toBeCalledWith(1, 2)
      expect(result).toEqual('success')
    })

    test('getUserCompetitionsRoles - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getUserCompetitionsRoles')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetUserCompetitionsRoles(1)
      expect(spy).toBeCalledWith(1)
      expect(result).toEqual('success')
    })

    describe('Start Competition', () => {
      test('start qualifier - Should call with rights args', async () => {
        const spy = jest.spyOn(API_URL, 'startQualifier')
        axios.patch.mockResolvedValue('success')

        const result = await ApiHelper.StartCompetition(
          TypeBoulderingRound.QUALIFIER,
          2
        )
        expect(spy).toHaveBeenCalledWith(2)
        expect(result).toEqual('success')
      })
      test('start semi final - Should call with rights args', async () => {
        const spy = jest.spyOn(API_URL, 'startSemiFinal')
        axios.patch.mockResolvedValue('success')

        const result = await ApiHelper.StartCompetition(
          TypeBoulderingRound.SEMI_FINAL,
          2
        )
        expect(spy).toHaveBeenCalledWith(2)
        expect(result).toEqual('success')
      })
      test('start final - Should call with rights args', async () => {
        const spy = jest.spyOn(API_URL, 'startFinal')
        axios.patch.mockResolvedValue('success')

        const result = await ApiHelper.StartCompetition(
          TypeBoulderingRound.FINAL,
          2
        )
        expect(spy).toHaveBeenCalledWith(2)
        expect(result).toEqual('success')
      })
    })

    test('GetBoulderRankings - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getBoulderRankings')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetBoulderRoundRankings(1, 19)
      expect(spy).toHaveBeenCalledWith(1, 19)
      expect(result).toEqual('success')
    })

    test('GetGroupRankings - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getGroupRankings')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetGroupRankings(1, 19, 22)
      expect(spy).toHaveBeenCalledWith(1, 19, 22)
      expect(result).toEqual('success')
    })

    test('GetResultClimber - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getResultClimber')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetResultClimber(1, 2, 3, 4, 5)
      expect(spy).toHaveBeenCalledWith(1, 2, 3, 4, 5)
      expect(result).toEqual('success')
    })

    describe('BoulderPhoto', () => {
      test('getBoulderPhoto - Should call with rights args', async () => {
        const spy = jest.spyOn(API_URL, 'boulderPhoto')
        axios.get.mockResolvedValue('success')

        const result = await ApiHelper.GetBoulderPhoto(1, 2, 3, 4)
        expect(spy).toHaveBeenCalledWith(1, 2, 3, 4)
        expect(result).toEqual('success')
      })

      test('deleteBoulderPhoto - Should call with rights args', async () => {
        const spy = jest.spyOn(API_URL, 'boulderPhoto')
        axios.delete.mockResolvedValue('success')

        const result = await ApiHelper.GetBoulderPhoto(1, 2, 3, 4)
        expect(spy).toHaveBeenCalledWith(1, 2, 3, 4)
        expect(result).toEqual('success')
      })
    })
  })
  test('getHolds - Should call with rights args', async () => {
    const spy = jest.spyOn(API_URL, 'getHolds')
    axios.get.mockResolvedValue('success')

    const result = await ApiHelper.GetHolds(1, 2, 3, 4)
    expect(spy).toHaveBeenCalledWith(1, 2, 3, 4)
    expect(result).toEqual('success')
  })

  /* describe('RankingPdf', () => {
    test('getGeneralRankingPdf - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getGeneralRankingPdf')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetGeneralRankingPdf(1)
      expect(spy).toHaveBeenCalledWith(1)
      expect(result).toEqual('success')
    })

    test('getRoundRankingPdf - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getRoundRankingPdf')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetRoundRankingPdf(1, 2)
      expect(spy).toHaveBeenCalledWith(1, 2)
      expect(result).toEqual('success')
    })

    test('getGroupRankingPdf - Should call with rights args', async () => {
      const spy = jest.spyOn(API_URL, 'getGroupRankingPdf')
      axios.get.mockResolvedValue('success')

      const result = await ApiHelper.GetGroupRankingPdf(1, 2, 3)
      expect(spy).toHaveBeenCalledWith(1, 2, 3)
      expect(result).toEqual('success')
    })
  }) */
})
