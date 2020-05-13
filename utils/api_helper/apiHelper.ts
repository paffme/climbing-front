import axios from 'axios'
import {
  APIUser,
  BoulderingResult,
  BoulderingRounds,
  CompetitionsRegistrations,
  Competition,
  ApiCompetition,
  UserCredentials,
  AuthCredentials,
  TokenCredentials,
  APIRankingResponse,
  BoulderingRoundInput,
  APIUserCompetitionRoles,
  DTOSubscriptionCredentials
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
  GetToken: getToken,
  GetUserCompetitionRoles: getUserCompetitionRoles,
  GetUserCount: getUserCount,
  GetCompetitionsCount: getCompetitionsCount,
  GetCompetitionRankings: getCompetitionRankings,
  GetCompetitionsPagination: getCompetitionsPagination
}

async function addUserInCompetition(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.get(
    API_URL.registerOrRemoveUserInCompetition(competitionId, userId)
  )
}

async function removeUserFromCompetition(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.delete(
    API_URL.registerOrRemoveUserInCompetition(competitionId, userId)
  )
}

async function getRegistrations(
  competitionId: number
): Promise<AxiosResponse<CompetitionsRegistrations[]>> {
  return axios.get(API_URL.getRegistrations(competitionId))
}

async function getJuryPresidents(competitionId: number): Promise<APIUser> {
  return axios.get(API_URL.getJuryPresidents(competitionId))
}
async function addJuryPresident(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.put(API_URL.addOrRemoveJuryPresident(competitionId, userId))
}
async function removeJuryPresident(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.delete(API_URL.addOrRemoveJuryPresident(competitionId, userId))
}

async function getJudges(competitionId: number): Promise<APIUser> {
  return axios.get(API_URL.getJudges(competitionId))
}

async function addJudge(competitionId: number, userId: number): Promise<void> {
  return axios.put(API_URL.addOrRemoveJudge(competitionId, userId))
}

async function removeJudge(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.delete(API_URL.addOrRemoveJudge(competitionId, userId))
}

async function getChiefRouteSetters(competitionId: number): Promise<APIUser> {
  return axios.get(API_URL.getChiefRouteSetters(competitionId))
}

async function addChiefRouteSetters(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.put(API_URL.addOrRemoveChiefRouteSetters(competitionId, userId))
}

async function removeChiefRouteSetters(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.delete(
    API_URL.addOrRemoveChiefRouteSetters(competitionId, userId)
  )
}

async function getRouteSetters(competitionId: number): Promise<APIUser> {
  return axios.get(API_URL.getRouteSetters(competitionId))
}

async function addRouteSetters(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.put(API_URL.addOrRemoveRouteSetters(competitionId, userId))
}

async function removeRouteSetters(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.delete(API_URL.addOrRemoveRouteSetters(competitionId, userId))
}

async function getTechnicalDelegates(competitionId: number): Promise<APIUser> {
  return axios.get(API_URL.getTechnicalDelegates(competitionId))
}

async function addTechnicalDelegates(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.put(API_URL.addOrRemoveTechnicalDelegates(competitionId, userId))
}

async function removeTechnicalDelegates(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.delete(
    API_URL.addOrRemoveTechnicalDelegates(competitionId, userId)
  )
}

async function getOrganizers(competitionId: number): Promise<APIUser> {
  return axios.get(API_URL.getOrganizers(competitionId))
}

async function addOrganizers(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.put(API_URL.addOrRemoveOrganizers(competitionId, userId))
}

async function removeOrganizers(
  competitionId: number,
  userId: number
): Promise<void> {
  return axios.delete(API_URL.addOrRemoveOrganizers(competitionId, userId))
}

async function addRound(
  competitionId: number,
  body: BoulderingRoundInput
): Promise<BoulderingRounds> {
  return axios.post(API_URL.addRound(competitionId), body)
}

async function addBoulderingResult(
  body: BoulderingResult,
  competitionId: number,
  roundId: number,
  boulderId: number
): Promise<void> {
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
): Promise<AxiosResponse<ApiCompetition>> {
  return axios.get(API_URL.updateOrGetCompetition(idCompetition))
}

async function updateCompetition(body: Competition): Promise<void> {
  if (!body.id) {
    return Promise.reject(new Error('ID not defined'))
  }
  return axios.patch(API_URL.updateOrGetCompetition(body.id), body)
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

async function getUser(
  userId: number
): Promise<AxiosResponse<UserCredentials>> {
  return axios.get(`/users/${userId}`)
}

async function getToken(
  credentials: AuthCredentials
): Promise<AxiosResponse<TokenCredentials>> {
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
