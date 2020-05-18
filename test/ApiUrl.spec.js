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
      expect(API_URL.addBoulderingResult(2, 2, 3)).toEqual(
        '/competitions/2/bouldering-rounds/2/boulders/3/results'
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

    test('GetCompetitionsCount - Should return a correct URL', () => {
      expect(API_URL.getCompetitionsCount()).toEqual('/competitions/count')
    })

    test('getCompetitionsPagination - Should return a correct URL', () =>
      expect(API_URL.getCompetitionsPagination(1, 3)).toEqual(
        '/competitions?page=1&perPage=3'
      ))

    test('getUsers - Should return a correct URL', () => {
      expect(API_URL.getUsers()).toEqual('/users')
    })

    test('getUsers - Should return a correct URL With Query', () => {
      expect(API_URL.getUsers('{"lastName":{"$re":"Rubz"}}')).toEqual(
        '/users?q={"lastName":{"$re":"Rubz"}}'
      )
    })
  })
})
