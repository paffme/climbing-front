import API_URL from '~/utils/api_helper/apiUrl'

describe('ApiUrl Helper', () => {
  describe('API_URL', () => {
    test('Should return a correct URL - registerOrRemoveUserInCompetition', () => {
      expect(API_URL.registerOrRemoveUserInCompetition(1, 2)).toEqual(
        '/competitions/1/registrations/2'
      )
    })
    test('getRegistrations - Should return a correct URL', () => {
      expect(API_URL.getRegistrations(1, 2)).toEqual(
        '/competitions/1/registrations'
      )
    })
    test('getJuryPresidents - Should return a correct URL', () => {
      expect(API_URL.getJuryPresidents(1, 2)).toEqual(
        '/competitions/1/jury-presidents'
      )
    })
    test('addOrRemoveJuryPresident - Should return a correct URL', () => {
      expect(API_URL.addOrRemoveJuryPresident(1, 2)).toEqual(
        '/competitions/1/jury-presidents/2'
      )
    })
    test('getJudges - Should return a correct URL', () => {
      expect(API_URL.getJudges(1)).toEqual('/competitions/1/judges')
    })
    test('addOrRemoveJudge - Should return a correct URL', () => {
      expect(API_URL.addOrRemoveJudge(1, 2)).toEqual('/competitions/1/judges/2')
    })
    test('getChiefRouteSetters - Should return a correct URL', () => {
      expect(API_URL.getChiefRouteSetters(1)).toEqual(
        '/competitions/1/chief-route-setters'
      )
    })
    test('addOrRemoveChiefRouteSetters - Should return a correct URL', () => {
      expect(API_URL.addOrRemoveChiefRouteSetters(1, 2)).toEqual(
        '/competitions/1/chief-route-setters/2'
      )
    })
    test('getRouteSetters - Should return a correct URL', () => {
      expect(API_URL.getRouteSetters(1)).toEqual(
        '/competitions/1/route-setters'
      )
    })
    test('addOrRemoveRouteSetters - Should return a correct URL', () => {
      expect(API_URL.addOrRemoveRouteSetters(2, 1)).toEqual(
        '/competitions/2/route-setters/1'
      )
    })
    test('getTechnicalDelegates - Should return a correct URL', () => {
      expect(API_URL.getTechnicalDelegates(1)).toEqual(
        '/competitions/1/technical-delegates'
      )
    })
    test('addOrRemoveTechnicalDelegates - Should return a correct URL', () => {
      expect(API_URL.addOrRemoveTechnicalDelegates(2, 1)).toEqual(
        '/competitions/2/technical-delegates/1'
      )
    })
    test('getOrganizers - Should return a correct URL', () => {
      expect(API_URL.getOrganizers(1)).toEqual('/competitions/1/organizers')
    })
    test('addOrRemoveOrganizers - Should return a correct URL', () => {
      expect(API_URL.addOrRemoveOrganizers(2, 1)).toEqual(
        '/competitions/2/organizers/1'
      )
    })
    test('addRound - Should return a correct URL', () => {
      expect(API_URL.getOraddRound(2)).toEqual(
        '/competitions/2/bouldering-rounds'
      )
    })
    test('addBoulderingResult - Should return a correct URL', () => {
      expect(API_URL.addBoulderingResult(1, 2, 3, 4)).toEqual(
        '/competitions/1/bouldering-rounds/2/groups/3/boulders/4/results'
      )
    })
    test('addBulkResult - Should return a correct URL', () => {
      expect(API_URL.addBulkResult(1, 2, 3)).toEqual(
        '/competitions/1/bouldering-rounds/2/groups/3/bulk-results'
      )
    })
    test('createOrGetCompetitions - Should return a correct URL', () => {
      expect(API_URL.createOrGetCompetitions()).toEqual('/competitions')
    })

    test('createOrGetCompetitions - Should return a correct URL With Query', () => {
      expect(
        API_URL.createOrGetCompetitions(
          '{"startDate":{"$gte":"2020-05-07T22:00:00.000Z"}}'
        )
      ).toEqual(
        '/competitions?q={"startDate":{"$gte":"2020-05-07T22:00:00.000Z"}}'
      )
    })

    test('GetCompetitionRankings - Should return a correct URL', () => {
      expect(API_URL.getCompetitionRankings(2)).toEqual(
        '/competitions/2/rankings'
      )
    })

    test('GetBoulderRankings - Should return a correct URL', () => {
      expect(API_URL.getBoulderRankings(2, 12)).toEqual(
        '/competitions/2/bouldering-rounds/12/rankings'
      )
    })

    test('GetGroupRankings - Should return a correct URL', () => {
      expect(API_URL.getGroupRankings(2, 12, 99)).toEqual(
        '/competitions/2/bouldering-rounds/12/groups/99/rankings'
      )
    })

    test('AddCompetitor - Should return a correct URL', () => {
      expect(API_URL.addCompetitor(2, 1)).toEqual(
        '/competitions/2/registrations/1'
      )
    })

    test('GetUserCompetitionRoles - Should return a correct URL', () => {
      expect(API_URL.getUserCompetitionRoles(23, 2)).toEqual(
        '/users/2/competitions-roles/23'
      )
    })

    test('GetUserCount - Should return a correct URL', () => {
      expect(API_URL.getUserCount()).toEqual('/users/count')
    })

    describe('GetCompetitionsCount', () => {
      test('GetCompetitionsCount - Should return a correct URL', () => {
        expect(API_URL.getCompetitionsCount()).toEqual('/competitions/count')
      })

      test('GetCompetitionsCount - Should return a correct URL with query', () => {
        expect(
          API_URL.getCompetitionsCount(
            'startDate":{"$gte":"2020-05-07T22:00:00.000Z"}'
          )
        ).toEqual(
          '/competitions/count?q=startDate":{"$gte":"2020-05-07T22:00:00.000Z"}'
        )
      })
    })

    describe('getCompetitionsPagination', () => {
      test('Should return a correct URL', () =>
        expect(API_URL.getCompetitionsPagination(1, 3)).toEqual(
          '/competitions?page=1&perPage=3'
        ))

      test('Should return a correct URL with pagination', () =>
        expect(
          API_URL.getCompetitionsPagination(
            1,
            3,
            '{"startDate":{"$gte":"2020-05-07T22:00:00.000Z"}}'
          )
        ).toEqual(
          '/competitions?page=1&perPage=3&q={"startDate":{"$gte":"2020-05-07T22:00:00.000Z"}}'
        ))
    })

    test('getUsers - Should return a correct URL', () => {
      expect(API_URL.getUsers()).toEqual('/users')
    })

    test('getUsers - Should return a correct URL With Query', () => {
      expect(API_URL.getUsers('{"lastName":{"$re":"Rubz"}}')).toEqual(
        '/users?q={"lastName":{"$re":"Rubz"}}'
      )
    })

    test('getRegistrationsByUser - Should return a correct URL', () => {
      expect(API_URL.getRegistrationsByUser(1)).toEqual(
        '/users/1/registrations'
      )
    })

    test('getJuryPresidencies - Should return a correct URL', () => {
      expect(API_URL.getJuryPresidencies(1)).toEqual(
        '/users/1/jury-presidencies'
      )
    })

    test('getChiefRouteSettings - Should return a correct URL', () => {
      expect(API_URL.getChiefRouteSettings(1)).toEqual(
        '/users/1/chief-route-settings'
      )
    })

    test('getRouteSettings - Should return a correct URL', () => {
      expect(API_URL.getRouteSettings(1)).toEqual('/users/1/route-settings')
    })

    test('getJudgements - Should return a correct URL', () => {
      expect(API_URL.getJudgements(1)).toEqual('/users/1/judgements')
    })

    test('getTechnicalDelegations - Should return a correct URL', () => {
      expect(API_URL.getTechnicalDelegations(1)).toEqual(
        '/users/1/technical-delegations'
      )
    })

    test('getOrganizations - Should return a correct URL', () => {
      expect(API_URL.getOrganizations(1)).toEqual('/users/1/organizations')
    })

    test('getUserCompetitionsRoles - Should return a correct URL', () => {
      expect(API_URL.getUserCompetitionsRoles(1)).toEqual(
        '/users/1/competitions-roles'
      )
    })

    test('getUserCompetitionsRolesByCompetition - Should return a correct URL', () => {
      expect(API_URL.getUserCompetitionsRolesByCompetition(1, 2)).toEqual(
        '/users/1/competitions-roles/2'
      )
    })

    test('getJudgementsAssignments - Should return a correct URL', () => {
      expect(API_URL.getJudgementsAssignments(2)).toEqual(
        '/users/2/judgements/assignments'
      )
    })

    test('getJudgementsAssignmentsByCompetition - Should return a correct URL', () => {
      expect(API_URL.getJudgementsAssignmentsByCompetition(2, 1)).toEqual(
        '/users/2/judgements/assignments/1'
      )
    })

    test('Start Competition', () => {
      expect(API_URL.startFinal(2)).toEqual('/competitions/2/start-finals')
      expect(API_URL.startQualifier(2)).toEqual(
        '/competitions/2/start-qualifiers'
      )
      expect(API_URL.startSemiFinal(2)).toEqual(
        '/competitions/2/start-semi-finals'
      )
    })

    test('getResultClimber - Should return a correct URL', () => {
      expect(API_URL.getResultClimber(1, 2, 3, 4, 5)).toEqual(
        '/competitions/1/bouldering-rounds/2/groups/3/boulders/4/results/5'
      )
    })

    test('boulderPhoto - Should return a correct URL', () => {
      expect(API_URL.boulderPhoto(1, 2, 3, 4, 5)).toEqual(
        '/competitions/1/bouldering-rounds/2/groups/3/boulders/4/photo'
      )
    })

    test('getHolds - Should return a correct URL', () => {
      expect(API_URL.getHolds(1, 2, 3, 4, 5)).toEqual(
        '/competitions/1/bouldering-rounds/2/groups/3/boulders/4/holds'
      )
    })
    test('getGeneralRankingPdf- Should return a correct URL', () => {
      expect(API_URL.getGeneralRankingPdf(1)).toEqual(
        '/competitions/1/rankings/pdf'
      )
    })

    test('getRoundRankingPdf - Should return a correct URL', () => {
      expect(API_URL.getRoundRankingPdf(1, 2, 3)).toEqual(
        '/competitions/1/bouldering-rounds/2/rankings/pdf'
      )
    })

    test('getGroupRankingPdf - Should return a correct URL', () => {
      expect(API_URL.getGroupRankingPdf(1, 2, 3)).toEqual(
        '/competitions/1/bouldering-rounds/2/groups/3/rankings/pdf'
      )
    })
  })
})
