import { AxiosResponse } from 'axios'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { APICompetition, APIUser } from '~/definitions'
import { RolesAPI } from '~/utils/api_helper/RolesAPI/RolesAPI'

export class ChiefRouteSettersRole implements RolesAPI {
  add(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.AddChiefRouteSetters(competitionId, userId)
  }

  get(competitionId: number): Promise<AxiosResponse<APIUser[]>> {
    return ApiHelper.GetChiefRouteSetters(competitionId)
  }

  remove(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.RemoveChiefRouteSetters(competitionId, userId)
  }

  getCompetitionFromRole(
    userId: number
  ): Promise<AxiosResponse<APICompetition[]>> {
    return ApiHelper.GetChiefRouteSettings(userId)
  }
}
