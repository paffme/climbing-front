import { AxiosResponse } from 'axios'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { APIUser } from '~/definitions'
import { RolesAPI } from '~/utils/api_helper/RolesAPI/RolesAPI'

export class JuryPresidentRole implements RolesAPI {
  add(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.AddJuryPresident(competitionId, userId)
  }

  get(competitionId: number): Promise<AxiosResponse<APIUser[]>> {
    return ApiHelper.GetJuryPresidents(competitionId)
  }

  remove(competitionId: number, userId: number): Promise<AxiosResponse<void>> {
    return ApiHelper.RemoveJuryPresident(competitionId, userId)
  }
}
