const UsersSeed = require('./users_seed')
const axios = require('axios')

const url = 'https://paffme.hdaroit.fr/api/v1/users'

async function createUser(user) {
  return await axios.post(url, {
    email: user.email,
    password: user.password,
    lastName: user.lastName,
    firstName: user.firstName,
    sex: user.sex,
    club: user.club,
    birthYear: user.birthYear
  })
}

async function start() {
  const promises = []
  for (const user of UsersSeed) {
    promises.push(createUser(user))

  }

  return Promise.all(promises)
}

start()
  .then(response => console.log('response', response))
  .catch(err => console.log(err))
