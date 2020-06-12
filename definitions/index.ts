export enum CategoryName {
  Microbe = 'microbe',
  Poussin = 'poussin',
  Benjamin = 'benjamin',
  Minime = 'minime',
  Cadet = 'cadet',
  Junior = 'junior',
  Senior = 'senior',
  Veteran = 'veteran'
}

export enum RoleNameQueryParams {
  pdj = 'pdj',
  organisateur = 'organisateur',
  juge = 'juge'
}
export enum RoleName {
  Juges = 'Juges',
  President = 'Président',
  ChefRouteSetter = 'Chef routes setters',
  RouteSetter = 'Routes setters',
  DelegueTechnique = 'Délégués techniques',
  Organisateur = 'Organisateurs'
}

export enum SlugRoleName {
  President = 'jury-presidencies',
  Juges = 'judgements',
  ChefRouteSetter = 'chief-route-settings',
  RouteSetter = 'route-settings',
  DelegueTechnique = 'technical-delegations',
  Organisateur = 'organizations'
}

export enum RankingType {
  CIRCUIT = 'Circuit',
  UNLIMITED_CONTEST = 'Illimité',
  LIMITED_CONTEST = 'Limité'
}

export enum TypeBouldering {
  QUALIFIER = 'Qualification',
  SEMI_FINAL = 'Demi-final',
  FINAL = 'Final'
}

export enum TypeBoulderingRound {
  QUALIFIER = 'QUALIFIER',
  SEMI_FINAL = 'SEMI_FINAL',
  FINAL = 'FINAL'
}

export enum Sex {
  Male = 'male',
  Female = 'female'
}

export enum TypeCompetition {
  Bouldering = 'bouldering',
  Lead = 'lead',
  Speed = 'speed'
}

export type CompetitionCategories = {
  sex: Sex
  name: CategoryName
}

export type Competition = {
  id?: number
  cancelled?: boolean | null
  name: string | null
  description: string | null
  open: boolean | null
  agenda: string | null
  welcomingDate: Date | null
  type: TypeCompetition | null
  startDate: Date | null
  endDate: Date | null
  address: string | null
  city: string | null
  postalCode: string | null
  categories: CompetitionCategories[] | null
}

export type CompetitionEdit = {
  name?: string
  type?: TypeCompetition
  startDate?: Date
  endDate?: Date
  address?: string
  city?: string
  postalCode?: string
  categories?: CompetitionCategories[]
}

export type APICompetition = Competition & {
  createdAt: Date
  updatedAt: Date
}

export type Form = {
  error: boolean
  success: boolean
  isLoading: boolean
  isEdition: boolean
}

export type FormCreateCompetition = Form & {
  competition: Competition
}
export type FormSubscription = Form & {
  message: string
  passwordIsValid?: boolean
}
export type FormBoulderingRound = Form & {
  input: BoulderingRoundInput | BoulderingRoundInputEdit
}
export type BoulderingRoundInput = {
  category?: CategoryName
  sex?: Sex
  index?: number
  name?: string
  quota?: number
  boulders?: number
  rankingType?: RankingType
  type?: TypeBouldering
  groups?: number
  maxTries?: number
}

export type BoulderingRoundInputEdit = BoulderingRoundInput & {
  id: number
}
export enum StateRound {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED'
}
export type BoulderingLimitedRounds = {
  id: number
  competitionId: number
  name: number
  quota: number
  type: string
  sex: Sex
  category: CategoryName
  state: StateRound
  maxTries: number
}

export type CategoryDisplay = {
  qualification: null | BoulderingLimitedRounds
  semi: null | BoulderingLimitedRounds
  final: null | BoulderingLimitedRounds
}
export type SubscriptionCredentials = {
  email: string
  firstName: string
  lastName: string
  sex: Sex
  club: string
  dateBirth: number
  password: string
  passwordConfirmation: string
  birthDay: Date
  birthYear?: number
}

export type DTOSubscriptionCredentials = {
  email: string
  password: string
  lastName: string
  firstName: string
  sex: Sex
  club: string
  birthYear: number
}

export type APIUser = {
  createdAt: string
  updatedAt: string
  id: number
  email: string
  firstName: string
  lastName: string
  birthYear: number
  club?: string | null
}

export type User = {
  id: number
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export type APIToken = {
  token: string
  userId: number
  expiresIn: number
  createdAt: string
}

export type AuthCredentials = {
  email: string
  password: string
}

export type APIUserCredentials = {
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export type CompetitionsRegistrations = {
  createdAt: string
  updatedAt: string
  userId: number
  competitionId: number
}

export type BoulderingRounds = {
  index: number
  name: string
  quota: number
  boulders: number
  rankingType: 'CIRCUIT'
  type: TypeBoulderingRound.QUALIFIER
}

export type BoulderingResult = {
  climberId: number
  top: boolean
  zone: boolean
  try: boolean
}

export type APIRankingResponse = {
  [key: string]: {
    [key: string]: Array<Ranking>
  }
}

export type APIBoulderingRounds = {
  [key: string]: {
    [key: string]: {
      [key: string]: BoulderingLimitedRounds
    }
  }
}

export type APIBoulderingGroups = {
  id: number
  name: string
  climbers: number[]
  boulders: APIBoulders[]
  roundId: number
  state: StateRound
}

export type APIBoulders = {
  id: number
  judges: User[]
}
export type APIUserCompetitionRoles = {
  organizer: boolean
  juryPresident: boolean
  judge: boolean
  chiefRouteSetter: boolean
  routeSetter: boolean
  technicalDelegate: boolean
}

export enum Roles {
  organizer = 'organizer',
  juryPresident = 'juryPresident',
  judge = 'judge',
  chiefRouteSetter = 'chiefRouteSetter',
  routeSetter = 'routeSetter',
  technicalDelegate = 'technicalDelegate'
}

export type Ranking = {
  ranking: 0
  climber: {
    id: 0
    firstName: string
    lastName: string
    club: string
  }
}

export type CategoriesSelect = {
  genre: Array<Sex>
  category: CategoryName
}

export type CurrentCategory = {
  genre: Sex
  category: CategoryName
}

export type TempCategoriesSelect = {
  genre: Array<Sex>
  category?: CategoryName
}
