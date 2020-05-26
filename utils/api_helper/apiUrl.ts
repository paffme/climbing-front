enum RouteName {
  competitions = 'competitions',
  users = 'users'
}
export default {
  registerOrRemoveUserInCompetition: (
    competitionId: number,
    userId: number
  ): string =>
    `/${RouteName.competitions}/${competitionId}/registrations/${userId}`,
  getRegistrations: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/registrations`,
  addCompetitor: (competitionId: number, userId: number): string =>
    `/${RouteName.competitions}/${competitionId}/registrations/${userId}`,
  getUserCompetitionRoles: (competitionId: number, userId: number): string =>
    `/${RouteName.users}/${userId}/competitions-roles/${competitionId}`,
  getUsers: (query?: string): string =>
    `/${RouteName.users}${query ? '?q=' + query : ''}`,
  getJuryPresidents: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/jury-presidents`,
  addOrRemoveJuryPresident: (competitionId: number, userId: number): string =>
    `/${RouteName.competitions}/${competitionId}/jury-presidents/${userId}`,
  getJudges: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/judges`,
  addOrRemoveJudge: (competitionId: number, userId: number): string =>
    `/${RouteName.competitions}/${competitionId}/judges/${userId}`,
  getChiefRouteSetters: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/chief-route-setters`,
  addOrRemoveChiefRouteSetters: (
    competitionId: number,
    userId: number
  ): string =>
    `/${RouteName.competitions}/${competitionId}/chief-route-setters/${userId}`,
  getRouteSetters: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/route-setters`,
  addOrRemoveRouteSetters: (competitionId: number, userId: number): string =>
    `/${RouteName.competitions}/${competitionId}/route-setters/${userId}`,
  getTechnicalDelegates: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/technical-delegates`,
  addOrRemoveTechnicalDelegates: (
    competitionId: number,
    userId: number
  ): string =>
    `/${RouteName.competitions}/${competitionId}/technical-delegates/${userId}`,
  getOrganizers: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/organizers`,
  addOrRemoveOrganizers: (competitionId: number, userId: number): string =>
    `/${RouteName.competitions}/${competitionId}/organizers/${userId}`,
  addRound: (competitionId: number) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds`,
  addBoulderingResult: (
    competitionId: number,
    roundId: number,
    boulderId: number
  ) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/boulders/${boulderId}/results`,
  createOrGetCompetitions: (query?: string) =>
    `/${RouteName.competitions}${query ? '?q=' + query : ''}`,
  getCompetitionsPagination: (page: number, perPage: number) =>
    `/${RouteName.competitions}?page=${page}&perPage=${perPage}`,
  updateOrGetCompetition: (competitionId: number) =>
    `/${RouteName.competitions}/${competitionId}`,
  getCompetitionRankings: (competitionId: number) =>
    `/${RouteName.competitions}/${competitionId}/rankings`,
  getUserCount: () => '/users/count',
  getCompetitionsCount: () => `/${RouteName.competitions}/count`
}
