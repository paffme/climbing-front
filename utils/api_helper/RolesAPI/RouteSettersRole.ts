import { AxiosResponse } from 'axios'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { APICompetition, APIUser } from '~/definitions'
import { RolesAPI } from '~/utils/api_helper/RolesAPI/RolesAPI'

export class RouteSettersRole implements RolesAPI {
  add(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.AddRouteSetters(competitionId, userId)
  }

  get(competitionId: number): Promise<AxiosResponse<APIUser[]>> {
    return ApiHelper.GetRouteSetters(competitionId)
  }

  remove(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.RemoveRouteSetters(competitionId, userId)
  }

  getCompetitionFromRole(
    userId: number
  ): Promise<AxiosResponse<APICompetition[]>> {
    return ApiHelper.GetRouteSettings(userId)
  }
}
