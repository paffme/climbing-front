import users_seed from './users_seed.json'
// import {Sex} from "~/definitions";
import {ApiHelper} from "~/utils/api_helper/apiHelper";
import { DTOSubscriptionCredentials, Sex } from "~/definitions/";

async function addUser(userCredentials: DTOSubscriptionCredentials) {
	return ApiHelper.SubscribeUser(userCredentials)
}

async function seedUsers() {
	console.log(['json', users_seed]);
	users_seed.forEach((user) => {
		try {
			/*await*/ addUser({
				'email': user.email,
				'password': user.password,
				'lastName': user.lastName,
				'firstName': user.firstName,
				'sex': (user.sex.match('male')) ? Sex.Male : Sex.Female,
				'club': user.club,
				'birthYear': user.birthYear
			})
		} catch (err) {
			console.log(err)
		}
	})
}
