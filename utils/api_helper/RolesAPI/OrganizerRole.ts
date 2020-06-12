import { AxiosResponse } from 'axios'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { APICompetition, APIUser } from '~/definitions'
import { RolesAPI } from '~/utils/api_helper/RolesAPI/RolesAPI'

export class OrganizerRole implements RolesAPI {
  add(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.AddOrganizers(competitionId, userId)
  }

  get(competitionId: number): Promise<AxiosResponse<APIUser[]>> {
    return ApiHelper.GetOrganizers(competitionId)
  }

  remove(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.RemoveOrganizers(competitionId, userId)
  }

  getCompetitionFromRole(
    userId: number
  ): Promise<AxiosResponse<APICompetition[]>> {
    return ApiHelper.GetOrganizations(userId)
  }
}
