import { AxiosResponse } from 'axios'
import { APICompetition, APIUser } from '~/definitions'

export interface RolesAPI {
  add(competitionId: number, userId: number): Promise<AxiosResponse<void>>
  remove(competitionId: number, userId: number): Promise<AxiosResponse<void>>
  get(competitionId: number): Promise<AxiosResponse<APIUser[]>>
  getCompetitionFromRole(
    userId: number
  ): Promise<AxiosResponse<APICompetition[]>>
}
