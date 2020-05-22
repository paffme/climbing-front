const UsersSeed = require('../../cypress/fixtures/users_seed')
const CompetitionSeed = require('../../cypress/fixtures/users_seed')
const axios = require('axios')


const BASE_URL = 'https://paffme.hdaroit.fr/api/v1'

class URL {
  static createUser = `${BASE_URL}/users`
  static logUser = `${BASE_URL}/users/token`
  static deleteUser = (id) => `${BASE_URL}/users/token${id}`
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

async function rmUser(userId) {
  return axios.delete(URL.deleteUser(userId));
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
  const promises = []
  // for (const user of UsersSeed) {
  //   promises.push(createUser(user))
  // }
  //
  // await Promise.all(promises)
  
  // for (const user of UsersSeed) {
    promises.push(logUser(UsersSeed[0]).then((response) => {
      console.log('request',
        response['config']['url'],
        response['config']['data'],
        response['status'])
      
      rmUser(response['data']['userId']).then((response) => {
        console.log('request', response)
      })
    }))
  // }
  //
  // Promise.all(promises).then(response => {
  //   promises.push(rmUser(response['id']))
  // })
  //
  return Promise.all(promises)
}

start_seed()
  .then(response => {
    response.forEach((request) => {
      // console.log('request',
      //   request['config']['url'],
      //   request['config']['data'],
      //   request['status'])
    })
  })
  // .catch((err) => {
  //   console.error(err)
  // })
