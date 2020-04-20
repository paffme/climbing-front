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
