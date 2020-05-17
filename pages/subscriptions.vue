<template>
  <div class="columns">
    <div class="column is-offset-4 is-4">
      <div id="login">
        <div class="card">
          <div class="card-header">
            <LogoComponent />
          </div>
          <div class="card-content">
            <b-notification
              :type="form.error ? 'is-danger' : 'is-success'"
              :closable="false"
              :active.sync="form.success || form.error"
            >
              {{ form.message }}
            </b-notification>
            <form @submit.prevent="subscribeUser(credentials)">
              <b-field required>
                <b-radio
                  v-model="credentials.sex"
                  name="name"
                  :native-value="Sex.Male"
                  class="b-radio-male"
                >
                  Homme
                </b-radio>
                <b-radio
                  v-model="credentials.sex"
                  name="name"
                  :native-value="Sex.Female"
                  class="b-radio-female"
                >
                  Femme
                </b-radio>
              </b-field>
              <b-field label="Email" required>
                <b-input v-model="credentials.email" class="email"></b-input>
              </b-field>
              <b-field grouped group-multiline>
                <b-field label="Prénom" required>
                  <b-input
                    v-model="credentials.firstName"
                    class="first-name"
                  ></b-input>
                </b-field>
                <b-field label="Nom" required>
                  <b-input
                    v-model="credentials.lastName"
                    class="last-name"
                  ></b-input>
                </b-field>
              </b-field>
              <b-field label="club">
                <b-input v-model="credentials.club" class="club"></b-input>
              </b-field>
              <b-field label="Date de naissance">
                <b-datepicker
                  v-model="credentials.birthDay"
                  placeholder="Cliquer pour selectionner"
                  icon="calendar-today"
                  trap-focus
                  :max-date="maxDate"
                  :min-date="minDate"
                  class="birth-date"
                >
                </b-datepicker>
              </b-field>
              <b-field label="Mot de passe">
                <b-input
                  v-model="credentials.password"
                  type="password"
                  password-reveal
                  required
                  class="password"
                >
                </b-input>
              </b-field>

              <b-field
                label="Confirmer le mot de passe"
                :message="form.passwordIsValid ? '' : form.message"
              >
                <b-input
                  v-model="credentials.passwordConfirmation"
                  type="password"
                  required
                  class="conf-password"
                >
                </b-input>
              </b-field>
              <nuxt-link to="/login">
                <span id="subscriptions" class="has-text-info form_link"
                  >J'ai déjà un compte</span
                >
              </nuxt-link>
              <div class="is-pulled-right">
                <b-button
                  tag="button"
                  native-type="submit"
                  type="is-primary"
                  :loading="form.isLoading"
                >
                  S'inscrire
                </b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { authUser } from '~/store'
import {
  DTOSubscriptionCredentials,
  FormSubscription,
  Sex,
  SubscriptionCredentials
} from '~/definitions'
import LogoComponent from '~/components/LogoComponent.vue'

@Component({
  layout: 'blank',
  components: { LogoComponent },
  middleware: 'isAuth',
  data() {
    return {
      Sex
    }
  }
})
export default class Subscriptions extends Vue {
  MAX_PASSWORD_LENGTH = 6
  form: FormSubscription = {
    error: false,
    success: false,
    isLoading: false,
    message: '',
    passwordIsValid: true
  }

  credentials: SubscriptionCredentials = {
    email: 'admin@test.com',
    firstName: 'Laurent',
    lastName: 'Gbagbo',
    sex: Sex.Male,
    club: 'FFME',
    birthDay: new Date(),
    dateBirth: 0,
    password: 'admin@test.com',
    passwordConfirmation: 'admin@test.com'
  }

  maxDate: Date = new Date()
  minDate: Date = new Date('1/1/1900')

  async subscribeUser(credentials: SubscriptionCredentials): Promise<void> {
    this.form.isLoading = true
    if (
      !this.checkPassword(
        credentials.password,
        credentials.passwordConfirmation
      )
    ) {
      this.form.passwordIsValid = false
      this.form.message = 'Les mots de passe doivent être similaires'
      this.form.isLoading = false
      return
    }

    if (!this.checkPasswordLength(credentials.password)) {
      this.form.passwordIsValid = false
      this.form.message = 'Le mot de passe doit contenir plus de 6 caractères'
      this.form.isLoading = false
      return
    }

    try {
      await authUser.subscribeUser(this.DtoSubscribeUser(credentials))
      this.form.isLoading = false
      this.$router.push('login?fromSubscription=true')
    } catch (err) {
      this.form.error = true
      this.form.isLoading = false
      this.form.message = "Une erreur s'est produite"
    }
  }

  checkPassword(password: string, passwordConfirmation: string): boolean {
    return password === passwordConfirmation
  }

  checkPasswordLength(password: string): boolean {
    return password.length > this.MAX_PASSWORD_LENGTH
  }

  DtoSubscribeUser(
    credentials: SubscriptionCredentials
  ): DTOSubscriptionCredentials {
    return {
      email: credentials.email,
      password: credentials.password,
      lastName: credentials.lastName,
      firstName: credentials.firstName,
      sex: credentials.sex,
      club: credentials.club,
      birthYear: new Date().getFullYear() - credentials.birthDay.getFullYear()
    }
  }
}
</script>

<style scoped>
img {
  margin: 20px;
}
.card-header {
  display: flex;
  justify-content: center;
}
#login {
  padding-top: 25%;
}
</style>
