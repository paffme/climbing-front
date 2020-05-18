import { RoleName } from '~/definitions'
import { RolesAPI } from '~/utils/api_helper/RolesAPI/RolesAPI'
import { JudgeRole } from '~/utils/api_helper/RolesAPI/JudgeRole'
import { OrganizerRole } from '~/utils/api_helper/RolesAPI/OrganizerRole'
import { ChiefRouteSettersRole } from '~/utils/api_helper/RolesAPI/ChiefRouteSettersRole'
import { RouteSettersRole } from '~/utils/api_helper/RolesAPI/RouteSettersRole'
import { TechnicalDelegateRole } from '~/utils/api_helper/RolesAPI/TechnicalDelegateRole'
import { JuryPresidentRole } from '~/utils/api_helper/RolesAPI/JuryPresidentRole'

export class RolesBuilder {
  static getRoles(roleName: RoleName): RolesAPI | null {
    if (roleName === RoleName.Juges) return new JudgeRole()
    if (roleName === RoleName.Organisateur) return new OrganizerRole()
    if (roleName === RoleName.ChefRouteSetter)
      return new ChiefRouteSettersRole()
    if (roleName === RoleName.RouteSetter) return new RouteSettersRole()
    if (roleName === RoleName.DelegueTechnique)
      return new TechnicalDelegateRole()
    if (roleName === RoleName.President) return new JuryPresidentRole()
    return null
  }
}
