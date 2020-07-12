import { RoleName } from '~/definitions'

const roleNameMapping: {
  [key in RoleName]: string
} = {
  [RoleName.ChefRouteSetter]: 'chef ouvreur',
  [RoleName.RouteSetter]: 'ouvreur',
  [RoleName.DelegueTechnique]: 'délégué technique',
  [RoleName.Juges]: 'juge',
  [RoleName.Organisateur]: 'organisateur',
  [RoleName.President]: 'président de jury'
}

const roleNamePluralMapping: {
  [key in RoleName]: string
} = {
  [RoleName.ChefRouteSetter]: 'chefs ouvreurs',
  [RoleName.RouteSetter]: 'ouvreurs',
  [RoleName.DelegueTechnique]: 'délégués technique',
  [RoleName.Juges]: 'juges',
  [RoleName.Organisateur]: 'organisateurs',
  [RoleName.President]: 'présidents de jury'
}

export function getRoleName(roleName: RoleName): string {
  return roleNameMapping[roleName]
}

export function getPluralRoleName(roleName: RoleName): string {
  return roleNamePluralMapping[roleName]
}
