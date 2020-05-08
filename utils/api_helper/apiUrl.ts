const ROUTE_NAME = 'competitions'
enum RouteName {
  competitions = 'competitions',
  users = 'users'
}
export default {
  registerOrRemoveUserInCompetition: (competitionId: number, userId: number): string => `/${ROUTE_NAME}/${competitionId}/registrations/${userId}`,
  getRegistrations: (competitionId: number): string => `/${ROUTE_NAME}/${competitionId}/registrations`,
  addCompetitor: (competitionId: number, userId: number): string => `/${ROUTE_NAME}/${competitionId}/registrations/${userId}`,
  getUserCompetitionRoles: (competitionId: number, userId: number): string => `/${RouteName.users}/${userId}/competitions-roles/${competitionId}`,
  getJuryPresidents: (competitionId: number): string => `/${ROUTE_NAME}/${competitionId}/jury-presidents`,
  addOrRemoveJuryPresident: (competitionId: number, userId: number): string => `/${ROUTE_NAME}/${competitionId}/jury-presidents/${userId}`,
  getJudges: (competitionId: number): string => `/${ROUTE_NAME}/${competitionId}/judges`,
  addOrRemoveJudge: (competitionId: number, userId: number): string => `/${ROUTE_NAME}/${competitionId}/judges/${userId}`,
  getChiefRouteSetters: (competitionId: number): string => `/${ROUTE_NAME}/${competitionId}/chief-route-setters`,
  addOrRemoveChiefRouteSetters: (competitionId: number, userId: number): string => `​/${ROUTE_NAME}​/${competitionId}​/chief-route-setters​/${userId}`,
  getRouteSetters: (competitionId: number): string => `/${ROUTE_NAME}/${competitionId}/route-setters`,
  addOrRemoveRouteSetters: (competitionId: number, userId: number): string => `​/${ROUTE_NAME}​/${competitionId}​/route-setters​/${userId}`,
  getTechnicalDelegates: (competitionId: number): string => `/${ROUTE_NAME}/${competitionId}/technical-delegates`,
  addOrRemoveTechnicalDelegates: (competitionId: number, userId: number): string => `​/${ROUTE_NAME}​/${competitionId}​/technical-delegates/${userId}`,
  getOrganizers: (competitionId: number): string => `/${ROUTE_NAME}/${competitionId}/organizers`,
  addOrRemoveOrganizers: (competitionId: number, userId: number): string => `​/${ROUTE_NAME}​/${competitionId}​/organizers/${userId}`,
  addRound: (competitionId: number) => `/${ROUTE_NAME}/${competitionId}/bouldering-rounds`,
  addBoulderingResult: (competitionId: number, roundId: number, boulderId: number) => `/${ROUTE_NAME}/${competitionId}/bouldering-rounds/${roundId}/boulders/${boulderId}/results`,
  createOrGetCompetitions: (query?: string) => `/${ROUTE_NAME}${query ? '?q=' + query : ''}`,
  updateOrGetCompetition: (competitionId: number) => `/${ROUTE_NAME}/${competitionId}`,
  getCompetitionRankings: (competitionId: number) => `/${ROUTE_NAME}/${competitionId}/rankings`,
  getUserCount: () => `/users/count`
}
