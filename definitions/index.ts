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
  Difficulte = 'Difficulté',
  Block = 'Block',
  Vitesse = 'Vitesse'
}

export type CompetitionCategories = {
  sex?: Sex
  name?: CategoryName
}
export type Competition = {
  name: string | null,
  type: string | null,
  startDate: string | null,
  endDate: string | null,
  address: string | null,
  city: string | null,
  postalCode: number | null,
  categories: CompetitionCategories[]
}

export type FormSubscription = { error: boolean, success: boolean, message: string, passwordIsValid?: boolean }
export type SubscriptionCredentials = {
  email: string,
  name: string,
  lastName: string,
  genre: string,
  password: string,
  passwordConfirmation: string
}

export type APIUser = {
  createdAt: string,
  updatedAt: string,
  id: number,
  email: string,
  firstName: string,
  lastName: string
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
