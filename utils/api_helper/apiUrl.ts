import { SlugRoleName } from '~/definitions'

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
  getOraddRound: (competitionId: number) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds`,
  updateOrRemoveRound: (competitionId: number, roundId: number) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}`,
  addBoulderingResult: (
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number
  ) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/groups/${groupId}/boulders/${boulderId}/results`,
  createOrGetCompetitions: (query?: string) =>
    `/${RouteName.competitions}${query ? '?q=' + query : ''}`,
  getCompetitionsPagination: (page: number, perPage: number, query?: string) =>
    `/${RouteName.competitions}?page=${page}&perPage=${perPage}${
      query ? '&q=' + query : ''
    }`,
  updateOrGetCompetition: (competitionId: number) =>
    `/${RouteName.competitions}/${competitionId}`,
  getCompetitionRankings: (competitionId: number) =>
    `/${RouteName.competitions}/${competitionId}/rankings`,
  getBoulderRankings: (competitionId: number, roundId: number) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/rankings`,
  getUserCount: () => '/users/count',
  getCompetitionsCount: (query?: string) =>
    `/${RouteName.competitions}/count${query ? '?q=' + query : ''}`,
  getBoulderingGroups: (competitionId: number, roundId: number) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/groups`,
  deleteBoulderingGroups: (
    competitionId: number,
    roundId: number,
    groupId: number
  ) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/groups/${groupId}`,
  createBoulderingGroup: (competitionId: number, roundId: number) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/groups`,
  createOrGetBoulder: (
    competitionId: number,
    roundId: number,
    groupId: number
  ) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/groups/${groupId}/boulders`,
  judgeToBoulder: (
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number,
    userId: number
  ) =>
    `/${RouteName.competitions}/${competitionId}/bouldering-rounds/${roundId}/groups/${groupId}/boulders/${boulderId}/judges/${userId}`,
  userByUserId: (userId: number) => `/${RouteName.users}/${userId}`,
  getTechnicalDelegations: (userId: number) =>
    `/${RouteName.users}/${userId}/${SlugRoleName.DelegueTechnique}`,
  getJuryPresidencies: (userId: number) =>
    `/${RouteName.users}/${userId}/${SlugRoleName.President}`,
  getJudgements: (userId: number) =>
    `/${RouteName.users}/${userId}/${SlugRoleName.Juges}`,
  getChiefRouteSettings: (userId: number) =>
    `/${RouteName.users}/${userId}/${SlugRoleName.ChefRouteSetter}`,
  getRouteSettings: (userId: number) =>
    `/${RouteName.users}/${userId}/${SlugRoleName.RouteSetter}`,
  getOrganizations: (userId: number) =>
    `/${RouteName.users}/${userId}/${SlugRoleName.Organisateur}`,
  getUserCompetitionsRoles: (userId: number) =>
    `/${RouteName.users}/${userId}/competitions-roles`,
  getUserCompetitionsRolesByCompetition: (
    userId: number,
    competitionId: number
  ) => `/${RouteName.users}/${userId}/competitions-roles/${competitionId}`,
  getJudgementsAssignments: (userId: number) =>
    `/${RouteName.users}/${userId}/judgements/assignments`,
  getJudgementsAssignmentsByCompetition: (
    userId: number,
    competitionId: number
  ) => `/${RouteName.users}/${userId}/judgements/assignments/${competitionId}`,
  getRegistrationsByUser: (userId: number): string =>
    `/${RouteName.users}/${userId}/registrations`,
  startQualifier: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/start-qualifiers`,
  startSemiFinal: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/start-semi-finals`,
  startFinal: (competitionId: number): string =>
    `/${RouteName.competitions}/${competitionId}/start-finals`,
  getResultClimber: (
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number,
    climberId: number
  ): string =>
    `/competitions/${competitionId}/bouldering-rounds/${roundId}/groups/${groupId}/boulders/${boulderId}/results/${climberId}`
}
