export enum CategoryName {
  Microbe = 'microbe',
  Poussin = 'poussin',
  Benjamin = 'benjamin',
  Minime = 'minime',
  Cadet = 'cadet',
  Junior = 'junior',
  Senior = 'senior',
  Veteran = 'veteran',
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
  Organisateur = 'Organisateur'
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

export enum Sex {
  Male = 'male',
  Female = 'female',
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
  id?: number | null
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

export type ApiCompetition = Competition & {
  createdAt: Date,
  updatedAt: Date,
}

export type Form = {
  error: boolean,
  success: boolean,
  isLoading: boolean
}

export type FormCreateCompetition = Form & {
  competition: Competition
}
export type FormSubscription = Form & { message: string, passwordIsValid?: boolean }
export type FormBoulderingRound = Form & { input: BoulderingRoundInput}
export type BoulderingRoundInput = {
  category?: CategoryName,
  sex?: Sex,
  index?: number,
  name?: string,
  quota?: number,
  boulders?: number,
  rankingType?: RankingType,
  type?: TypeBouldering,
  groups?: number
}
export type SubscriptionCredentials = {
  email: string,
  firstName: string,
  lastName: string,
  sex: Sex,
  club: string,
  dateBirth: number,
  password: string,
  passwordConfirmation: string
  birthDay: Date
  birthYear?: number
}

export type DTOSubscriptionCredentials = {
  email: string,
  password: string,
  lastName: string,
  firstName: string,
  sex: Sex,
  club: string
  birthYear: number
}

export type APIUser = {
  createdAt: string,
  updatedAt: string,
  id: number,
  email: string,
  firstName: string,
  lastName: string
  birthYear: number
  club: string | null
}

export type TokenCredentials = {
  token: string,
  userId: number,
  expiresIn: number,
  createdAt: string
}

export type AuthCredentials = {
  email: string,
  password: string
}

export type UserCredentials = {
  email: string,
  firstName: string,
  lastName: string,
  createdAt: string,
  updatedAt: string
}

export type CompetitionsRegistrations = {
  createdAt: string,
  updatedAt: string,
  userId: number,
  competitionId: number
}

export type BoulderingRounds = {
  index: number,
  name: string,
  quota: number,
  boulders: number,
  rankingType: 'CIRCUIT',
  type: 'QUALIFIER'
}

export type BoulderingResult = {
  climberId: number,
  top: boolean,
  zone: boolean,
  try: boolean
}

export type APIRankingResponse = {
  [key: string]: {
    [key: string]: Array<Ranking>,
  }
}

export type APIUserCompetitionRoles = {
  organizer: boolean,
  juryPresident: boolean,
  judge: boolean,
  chiefRouteSetter: boolean,
  routeSetter: boolean,
  technicalDelegate: boolean
}

export type Ranking = {
  ranking: 0,
  climber: {
    id: 0,
    firstName: string,
    lastName: string,
    club: string
  }
}
