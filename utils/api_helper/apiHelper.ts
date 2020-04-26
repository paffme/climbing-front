import {
  APIUser,
  BoulderingResult,
  BoulderingRounds,
  CompetitionsRegistrations,
  Competition,
  ApiCompetition
} from "~/definitions";
import { $axios } from '../api'
import { AxiosResponse } from "~/node_modules/axios";

export const ApiHelper = {
  RegisterUserInCompetition: registerUserInCompetition,
  RemoveUserFromCompetition: removeUserFromCompetition,
  GetRegistrations : getRegistrations,
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
  AddCompetitor: addCompetitor
}

export const API_URL = {
  registerOrRemoveUserInCompetition: (competitionId: number, userId: number): string => `/competitions/${competitionId}/registrations/${userId}`,
  getRegistrations: (competitionId: number): string => `/competitions/${competitionId}/registrations`,
  addCompetitor: (competitionId: number, userId: number): string => `/competitions/${competitionId}/registrations/${userId}`,
  getJuryPresidents: (competitionId: number): string => `/competitions/${competitionId}/jury-presidents`,
  addOrRemoveJuryPresident: (competitionId: number, userId: number): string => `/competitions/${competitionId}/jury-presidents/${userId}`,
  getJudges: (competitionId: number): string => `/competitions/${competitionId}/judges`,
  addOrRemoveJudge: (competitionId: number, userId: number): string => `/competitions/${competitionId}/judges/${userId}`,
  getChiefRouteSetters: (competitionId: number): string => `/competitions/${competitionId}/chief-route-setters`,
  addOrRemoveChiefRouteSetters: (competitionId: number, userId: number): string => `​/competitions​/${competitionId}​/chief-route-setters​/${userId}`,
  getRouteSetters: (competitionId: number): string => `/competitions/${competitionId}/route-setters`,
  addOrRemoveRouteSetters: (competitionId: number, userId: number): string => `​/competitions​/${competitionId}​/route-setters​/${userId}`,
  getTechnicalDelegates: (competitionId: number): string => `/competitions/${competitionId}/technical-delegates`,
  addOrRemoveTechnicalDelegates: (competitionId: number, userId: number): string => `​/competitions​/${competitionId}​/technical-delegates/${userId}`,
  getOrganizers: (competitionId: number): string => `/competitions/${competitionId}/organizers`,
  addOrRemoveOrganizers: (competitionId: number, userId: number): string => `​/competitions​/${competitionId}​/organizers/${userId}`,
  addRound: (competitionId: number) => `/competitions/${competitionId}/bouldering-rounds`,
  addBoulderingResult: (competitionId: number, roundId: number, boulderId: number) => `/competitions/${competitionId}/bouldering-rounds/${roundId}/boulders/${boulderId}/results`,
  createOrGetCompetitions: () => '/competitions',
  updateOrGetCompetition: (competitionId: number) => `/competitions/${competitionId}`
}

async function registerUserInCompetition(competitionId: number, userId: number): Promise<void> {
  return await $axios.get(API_URL.registerOrRemoveUserInCompetition(competitionId, userId))
}

async function removeUserFromCompetition(competitionId: number, userId: number): Promise<void> {
  return $axios.delete(API_URL.registerOrRemoveUserInCompetition(competitionId, userId))
}

async function getRegistrations(competitionId: number): Promise<AxiosResponse<CompetitionsRegistrations[]>> {
  return $axios.get(API_URL.getRegistrations(competitionId))
}

async function getJuryPresidents(competitionId: number): Promise<APIUser> {
  return $axios.get(API_URL.getJuryPresidents(competitionId))
}
async function addJuryPresident(competitionId: number, userId: number): Promise<void> {
  return $axios.put(API_URL.addOrRemoveJuryPresident(competitionId, userId))
}
async function removeJuryPresident(competitionId: number, userId: number): Promise<void> {
  return $axios.delete(API_URL.addOrRemoveJuryPresident(competitionId, userId))
}

async function getJudges(competitionId: number): Promise<APIUser> {
  return $axios.get(API_URL.getJudges(competitionId))
}

async function addJudge(competitionId: number, userId: number): Promise<void> {
  return $axios.put(API_URL.addOrRemoveJudge(competitionId, userId))
}

async function removeJudge(competitionId: number, userId: number): Promise<void> {
  return $axios.delete(API_URL.addOrRemoveJudge(competitionId, userId))
}

async function getChiefRouteSetters(competitionId: number): Promise<APIUser> {
  return $axios.get(API_URL.getChiefRouteSetters(competitionId))
}

async function addChiefRouteSetters(competitionId: number, userId: number): Promise<void> {
  return $axios.put(API_URL.addOrRemoveChiefRouteSetters(competitionId, userId))
}

async function removeChiefRouteSetters(competitionId: number, userId: number): Promise<void> {
  return $axios.delete(API_URL.addOrRemoveChiefRouteSetters(competitionId, userId))
}

async function getRouteSetters(competitionId: number): Promise<APIUser> {
  return $axios.get(API_URL.getRouteSetters(competitionId))
}

async function addRouteSetters(competitionId: number, userId: number): Promise<void> {
  return $axios.put(API_URL.addOrRemoveRouteSetters(competitionId, userId))
}

async function removeRouteSetters(competitionId: number, userId: number): Promise<void> {
  return $axios.delete(API_URL.addOrRemoveRouteSetters(competitionId, userId))
}

async function getTechnicalDelegates(competitionId: number): Promise<APIUser> {
  return $axios.get(API_URL.getTechnicalDelegates(competitionId))
}

async function addTechnicalDelegates(competitionId: number, userId: number): Promise<void> {
  return $axios.put(API_URL.addOrRemoveTechnicalDelegates(competitionId, userId))
}

async function removeTechnicalDelegates(competitionId: number, userId: number): Promise<void> {
  return $axios.delete(API_URL.addOrRemoveTechnicalDelegates(competitionId, userId))
}

async function getOrganizers(competitionId: number): Promise<APIUser> {
  return $axios.get(API_URL.getOrganizers(competitionId))
}

async function addOrganizers(competitionId: number, userId: number): Promise<void> {
  return $axios.put(API_URL.addOrRemoveOrganizers(competitionId, userId))
}

async function removeOrganizers(competitionId: number, userId: number): Promise<void> {
  return $axios.delete(API_URL.addOrRemoveOrganizers(competitionId, userId))
}

async function addRound(competitionId: number): Promise<BoulderingRounds> {
  return $axios.post(API_URL.addRound(competitionId))
}

async function addBoulderingResult(body: BoulderingResult,competitionId: number, roundId: number, boulderId: number): Promise<void> {
  return $axios.post(API_URL.addBoulderingResult(competitionId, roundId, boulderId), body)
}

async function createCompetition(body: Competition): Promise<void> {
  return $axios.post(API_URL.createOrGetCompetitions(), body)
}

async function getCompetitions(): Promise<AxiosResponse<Competition[]>> {
  return $axios.get(API_URL.createOrGetCompetitions())
}

async function getCompetition(idCompetiton: number): Promise<AxiosResponse<ApiCompetition>> {
  return $axios.get(API_URL.updateOrGetCompetition(idCompetiton))
}

async function updateCompetition(body: Competition): Promise<void> {
  if (!body.id) return Promise.reject('ID not defined')
  return $axios.patch(API_URL.updateOrGetCompetition(body.id), body)
}

async function addCompetitor(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
  return $axios.put(API_URL.addCompetitor(competitionId, userId))
}
