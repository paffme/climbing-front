export type FormSubscription = { error: boolean, success: boolean, message: string, passwordIsValid?: boolean }
export type SubscriptionCredentials = {
  email: string,
  name: string,
  lastName: string,
  genre: string,
  password: string,
  passwordConfirmation: string
}

export type APIUserSubscription = {
  createdAt: string,
  updatedAt: string,
  id: number,
  email: string,
  firstName: string,
  lastName: string
}

export type TokenCredentials = {
  "token": string,
  "userId": number,
  "expiresIn": number,
  "createdAt": string
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
