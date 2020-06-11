import axios from 'axios'
import {
  APIUser,
  BoulderingResult,
  BoulderingRounds,
  CompetitionsRegistrations,
  Competition,
  APICompetition,
  AuthCredentials,
  APIToken,
  APIRankingResponse,
  BoulderingRoundInput,
  APIUserCompetitionRoles,
  DTOSubscriptionCredentials,
  APIBoulderingRounds,
  CompetitionEdit,
  APIBoulderingGroups
} from '~/definitions'
import { AxiosResponse } from '~/node_modules/axios'
import API_URL from '~/utils/api_helper/apiUrl'

axios.defaults.baseURL = 'https://paffme.hdaroit.fr/api/v1'

export const ApiHelper = {
  AddUserInCompetition: addUserInCompetition,
  RemoveUserFromCompetition: removeUserFromCompetition,
  GetRegistrationsForACompetition: getRegistrations,
  GetJuryPresidents: getJuryPresidents,
  AddJuryPresident: addJuryPresident,
  RemoveJuryPresident: removeJuryPresident,
  GetJudges: getJudges,
  AddJudge: addJudge,
  RemoveJudge: removeJudge,
  GetChiefRouteSetters: getChiefRouteSetters,
  AddChiefRouteSetters: addChiefRouteSetters,
  RemoveChiefRouteSetters: removeChiefRouteSetters,
  GetRouteSetters: getRouteSetters,
  AddRouteSetters: addRouteSetters,
  RemoveRouteSetters: removeRouteSetters,
  GetTechnicalDelegates: getTechnicalDelegates,
  AddTechnicalDelegates: addTechnicalDelegates,
  RemoveTechnicalDelegates: removeTechnicalDelegates,
  GetOrganizers: getOrganizers,
  AddOrganizers: addOrganizers,
  RemoveOrganizers: removeOrganizers,
  AddRound: addRound,
  AddBoulderingResult: addBoulderingResult,
  CreateCompetition: createCompetition,
  GetCompetitions: getCompetitions,
  GetCompetition: getCompetition,
  UpdateCompetition: updateCompetition,
  AddCompetitor: addCompetitor,
  SubscribeUser: subscribeUser,
  GetUser: getUser,
  GetUsers: getUsers,
  GetToken: getToken,
  GetRolesForCompetition: getUserCompetitionRoles,
  GetUserCount: getUserCount,
  GetCompetitionsCount: getCompetitionsCount,
  GetCompetitionRankings: getCompetitionRankings,
  GetCompetitionsPagination: getCompetitionsPagination,
  GetRound: getRound,
  DeleteRound: deleteRound,
  EditRound: editRound,
  GetBoulderingGroups: getBoulderingGroups,
  DeleteBoulderingGroups: deleteBoulderingGroups,
  CreateBoulderingGroup: createBoulderingGroup,
  AddBoulder: addBoulder,
  AssignJudgeToBoulder: assignJudgeToBoulder,
  DeleteJudgeToBoulder: deleteJudgeToBoulder,
  UpdateUser: updateUser,
  DeleteUser: deleteUser,
  GetRegistrationsByUser: getRegistrationsByUser,
  GetOrganizations: getOrganizations,
  GetChiefRouteSettings: getChiefRouteSettings,
  GetRouteSettings: getRouteSettings,
  GetJuryPresidencies: getJuryPresidencies,
  GetTechnicalDelegations: getTechnicalDelegations,
  GetJudgementsAssignments: getJudgementsAssignments,
  GetJudgementsAssignmentsByCompetition: getJudgementsAssignmentsByCompetition,
  GetUserCompetitionsRoles: getUserCompetitionsRoles
}

async function addUserInCompetition(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.get(
    API_URL.registerOrRemoveUserInCompetition(competitionId, userId)
  )
}

async function removeUserFromCompetition(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(
    API_URL.registerOrRemoveUserInCompetition(competitionId, userId)
  )
}

async function getRegistrations(
  competitionId: number
): Promise<AxiosResponse<CompetitionsRegistrations[]>> {
  return axios.get(API_URL.getRegistrations(competitionId))
}

async function getJuryPresidents(
  competitionId: number
): Promise<AxiosResponse<APIUser[]>> {
  return axios.get(API_URL.getJuryPresidents(competitionId))
}
async function addJuryPresident(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(API_URL.addOrRemoveJuryPresident(competitionId, userId))
}
async function removeJuryPresident(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(API_URL.addOrRemoveJuryPresident(competitionId, userId))
}

async function getJudges(
  competitionId: number
): Promise<AxiosResponse<APIUser[]>> {
  return axios.get(API_URL.getJudges(competitionId))
}

async function addJudge(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(API_URL.addOrRemoveJudge(competitionId, userId))
}

async function removeJudge(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(API_URL.addOrRemoveJudge(competitionId, userId))
}

async function getChiefRouteSetters(
  competitionId: number
): Promise<AxiosResponse<APIUser[]>> {
  return axios.get(API_URL.getChiefRouteSetters(competitionId))
}

async function addChiefRouteSetters(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(API_URL.addOrRemoveChiefRouteSetters(competitionId, userId))
}

async function removeChiefRouteSetters(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(
    API_URL.addOrRemoveChiefRouteSetters(competitionId, userId)
  )
}

async function getRouteSetters(
  competitionId: number
): Promise<AxiosResponse<APIUser[]>> {
  return axios.get(API_URL.getRouteSetters(competitionId))
}

async function addRouteSetters(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(API_URL.addOrRemoveRouteSetters(competitionId, userId))
}

async function removeRouteSetters(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(API_URL.addOrRemoveRouteSetters(competitionId, userId))
}

async function getTechnicalDelegates(
  competitionId: number
): Promise<AxiosResponse<APIUser[]>> {
  return axios.get(API_URL.getTechnicalDelegates(competitionId))
}

async function addTechnicalDelegates(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(API_URL.addOrRemoveTechnicalDelegates(competitionId, userId))
}

async function removeTechnicalDelegates(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(
    API_URL.addOrRemoveTechnicalDelegates(competitionId, userId)
  )
}

async function getOrganizers(
  competitionId: number
): Promise<AxiosResponse<APIUser[]>> {
  return axios.get(API_URL.getOrganizers(competitionId))
}

async function addOrganizers(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(API_URL.addOrRemoveOrganizers(competitionId, userId))
}

async function removeOrganizers(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(API_URL.addOrRemoveOrganizers(competitionId, userId))
}

async function addRound(
  competitionId: number,
  body: BoulderingRoundInput
): Promise<BoulderingRounds> {
  return axios.post(API_URL.getOraddRound(competitionId), body)
}

async function getRound(
  roundId: number
): Promise<AxiosResponse<APIBoulderingRounds>> {
  return axios.get(API_URL.getOraddRound(roundId))
}

async function deleteRound(
  competitionId: number,
  roundId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(API_URL.updateOrRemoveRound(competitionId, roundId))
}
async function editRound(
  competitionId: number,
  roundId: number,
  body: BoulderingRoundInput
): Promise<AxiosResponse<void>> {
  return axios.patch(API_URL.updateOrRemoveRound(competitionId, roundId), body)
}

async function addBoulderingResult(
  body: BoulderingResult,
  competitionId: number,
  roundId: number,
  boulderId: number
): Promise<AxiosResponse<void>> {
  return axios.post(
    API_URL.addBoulderingResult(competitionId, roundId, boulderId),
    body
  )
}

async function createCompetition(
  body: Competition
): Promise<AxiosResponse<Competition>> {
  return axios.post(API_URL.createOrGetCompetitions(), body)
}

async function getCompetitions(
  query?: string
): Promise<AxiosResponse<Competition[]>> {
  return axios.get(API_URL.createOrGetCompetitions(query))
}

async function getCompetition(
  idCompetition: number
): Promise<AxiosResponse<APICompetition>> {
  return axios.get(API_URL.updateOrGetCompetition(idCompetition))
}

async function updateCompetition(
  id: number,
  body: CompetitionEdit
): Promise<AxiosResponse<APICompetition>> {
  return axios.patch(API_URL.updateOrGetCompetition(id), body)
}

async function addCompetitor(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(API_URL.addCompetitor(competitionId, userId))
}

async function subscribeUser(
  credentials: DTOSubscriptionCredentials
): Promise<AxiosResponse<void>> {
  return axios.post('/users', credentials)
}

async function getUser(userId: number): Promise<AxiosResponse<APIUser>> {
  return axios.get(`/users/${userId}`)
}

async function getUsers(query?: string): Promise<AxiosResponse<APIUser[]>> {
  return axios.get(API_URL.getUsers(query))
}

async function getToken(
  credentials: AuthCredentials
): Promise<AxiosResponse<APIToken>> {
  return axios.post('/users/token', credentials)
}

async function getCompetitionRankings(
  competitionId: number
): Promise<AxiosResponse<APIRankingResponse>> {
  return axios.get(API_URL.getCompetitionRankings(competitionId))
}

async function getUserCount(): Promise<AxiosResponse<{ count: number }>> {
  return axios.get(API_URL.getUserCount())
}

async function getCompetitionsCount(): Promise<
  AxiosResponse<{ count: number }>
> {
  return axios.get(API_URL.getCompetitionsCount())
}

async function getUserCompetitionRoles(
  competitionId: number,
  userId: number
): Promise<AxiosResponse<APIUserCompetitionRoles>> {
  return axios.get(API_URL.getUserCompetitionRoles(competitionId, userId))
}

async function getCompetitionsPagination(
  page: number,
  perPage: number
): Promise<AxiosResponse<Competition[]>> {
  return axios.get(API_URL.getCompetitionsPagination(page, perPage))
}

async function getBoulderingGroups(
  competitionId: number,
  roundId: number
): Promise<AxiosResponse<APIBoulderingGroups[]>> {
  return axios.get(API_URL.getBoulderingGroups(competitionId, roundId))
}

async function deleteBoulderingGroups(
  competitionId: number,
  roundId: number,
  groupId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(
    API_URL.deleteBoulderingGroups(competitionId, roundId, groupId)
  )
}

async function createBoulderingGroup(
  competitionId: number,
  roundId: number,
  body: { name: string }
): Promise<AxiosResponse<void>> {
  return axios.post(API_URL.createBoulderingGroup(competitionId, roundId), body)
}

// TODO : Faire les tests U
async function addBoulder(
  competitionId: number,
  roundId: number,
  groupId: number
): Promise<AxiosResponse<void>> {
  return axios.post(API_URL.createBoulder(competitionId, roundId, groupId))
}

async function assignJudgeToBoulder(
  competitionId: number,
  roundId: number,
  groupId: number,
  boulderId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.put(
    API_URL.judgeToBoulder(competitionId, roundId, groupId, boulderId, userId)
  )
}

async function deleteJudgeToBoulder(
  competitionId: number,
  roundId: number,
  groupId: number,
  boulderId: number,
  userId: number
): Promise<AxiosResponse<void>> {
  return axios.delete(
    API_URL.judgeToBoulder(competitionId, roundId, groupId, boulderId, userId)
  )
}

async function deleteUser(userId: number): Promise<AxiosResponse<void>> {
  return axios.delete(API_URL.userByUserId(userId))
}

async function updateUser(
  userId: number,
  body: {
    email?: string
    firstName?: string
    lastName?: string
    birthYear?: number
    password?: string
    club?: string
  }
): Promise<AxiosResponse<APIUser>> {
  return axios.patch(API_URL.userByUserId(userId), body)
}

async function getRegistrationsByUser(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getRegistrationsByUser(userId))
}

async function getOrganizations(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getOrganizations(userId))
}

async function getChiefRouteSettings(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getChiefRouteSettings(userId))
}

async function getRouteSettings(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getRouteSettings(userId))
}

async function getJuryPresidencies(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getJuryPresidencies(userId))
}

async function getTechnicalDelegations(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getTechnicalDelegations(userId))
}

async function getJudgementsAssignments(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getJudgementsAssignments(userId))
}

async function getJudgementsAssignmentsByCompetition(
  userId: number,
  competitionId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(
    API_URL.getJudgementsAssignmentsByCompetition(userId, competitionId)
  )
}

async function getUserCompetitionsRoles(
  userId: number
): Promise<AxiosResponse<APICompetition[]>> {
  return axios.get(API_URL.getUserCompetitionsRoles(userId))
}
