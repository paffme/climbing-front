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

export enum RoleName {
  Juges = 'Juges',
  President = 'Président',
  ChefRouteSetter = 'Chef routes setters',
  RouteSetter = 'Routes setters',
  DelegueTechnique = 'Délégués techniques',
  Organisateur = 'Organisateur'
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
  name: string
  type: TypeCompetition
  startDate: Date
  endDate: Date | string
  address: string
  city: string
  postalCode: string
  categories: CompetitionCategories[]
}

export type ApiCompetition = Competition & {
  createdAt: Date,
  updatedAt: Date,
}

export type FormSubscription = { error: boolean, success: boolean, message: string, passwordIsValid?: boolean, isLoading: boolean }
export type SubscriptionCredentials = {
  email: string,
  name: string,
  lastName: string,
  sex: string,
  password: string,
  passwordConfirmation: string
  birthDay: Date
  birthYear?: number
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

export type Ranking = {
  ranking: 0,
  climber: {
    id: 0,
    firstName: string,
    lastName: string,
    club: string
  }
}
