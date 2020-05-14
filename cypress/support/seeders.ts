import {DTOSubscriptionCredentials, Sex} from "../../definitions";

import users_seed from './../fixtures/users_seed.json'

function addUser(userCredentials: DTOSubscriptionCredentials) {
    try {
        cy.server()
        cy.route('POST', 'https://paffme.hdaroit.fr/api/v1/users', userCredentials).as('postUser');
        cy.wait('@postUser')
        cy.get('#users-results').should('have.length', 0)
    } catch (err) {
        cy.log("Something happen when subscribe user: " + String(userCredentials))
    }
}

function addUsers(usersCredentials: Array<DTOSubscriptionCredentials>) {

   usersCredentials.forEach((userCredentials) => {
       addUser(userCredentials)
   })
}

export function seedUsers() {
    users_seed.forEach((user) => {
        addUser({
            'email': user.email,
            'password': user.password,
            'lastName': user.lastName,
            'firstName': user.firstName,
            'sex': (user.sex.match('male')) ? Sex.Male : Sex.Female,
            'club': user.club,
            'birthYear': user.birthYear
        })
    })
}
