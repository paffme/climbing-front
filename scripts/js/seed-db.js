const UsersSeed = require('../../cypress/fixtures/users_seed')
const CompetitionSeed = require('../../cypress/fixtures/users_seed')
const axios = require('axios')


const BASE_URL = 'https://paffme.hdaroit.fr/api/v1'

class URL {
  static createUser = `${BASE_URL}/users`
  static logUser = `${BASE_URL}/users/token`
  static deleteUser = (id) => `${BASE_URL}/users/${id}`
  static createCompetition = `${BASE_URL}/competitions`
}

async function createUser(user) {
  return await axios.post(URL.createUser, {
    email: user.email,
    password: user.password,
    lastName: user.lastName,
    firstName: user.firstName,
    sex: user.sex,
    club: user.club,
    birthYear: user.birthYear
  })
}

async function logUser(user) {
  return await axios.post(URL.logUser, {
    email: user.email,
    password: user.password,
  })
}

async function rmUser(userId, token) {
  return axios.delete(URL.deleteUser(userId), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

async function createCompetition(competition) {
  return await axios.post(URL.createUser, {
    name: competition.name,
    type: competition.type,
    description: competition.description,
    agenda: competition.agenda,
    open: competition.open,
    welcomingDate: competition.welcomingDate,
    startDate: competition.startDate,
    endDate: competition.endDate,
    address: competition.address,
    city: competition.city,
    postalCode: competition.postalCode,
    categories: competition.categories,
  })
}

async function start_seed() {
  await createUser(UsersSeed[0])

  const user = await logUser(UsersSeed[0])
  console.log('request',
    user['config']['url'],
    user['config']['data'],
    user['status'])
  return rmUser(user.data.userId, user.data.token)
}

start_seed()
  .then(response => {
    console.log('request',
      response['config']['url'],
      response['config']['data'],
      response['status'])
  })
  .catch((err) => {
    console.error(err)
  })
