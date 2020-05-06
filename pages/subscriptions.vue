<template>
  <div class="columns">
    <div class="column is-offset-4 is-4">
      <div id="login">
        <div class="card">
          <div class="card-header">
            <img src="../assets/ffme_logo.png" alt="" width="140">
          </div>
          <div class="card-content">
            <b-notification :type="form.error ? 'is-danger' : 'is-success'" :closable=false :active.sync="form.success || form.error">
              {{ form.message }}
            </b-notification>
            <form v-on:submit.prevent="subscribeUser(credentials)">

              <b-field required>
                <b-radio v-model="credentials.sex"
                         name="name"
                         :native-value="Sex.Male">
                  Homme
                </b-radio>
                <b-radio v-model="credentials.sex"
                         name="name"
                         :native-value="Sex.Female">
                  Femme
                </b-radio>
              </b-field>
              <b-field label="Email" required>
                <b-input v-model="credentials.email"></b-input>
              </b-field>
              <b-field grouped group-multiline>
                <b-field label="Prénom" required>
                  <b-input v-model="credentials.firstName"></b-input>
                </b-field>
                <b-field label="Nom" required>
                  <b-input v-model="credentials.lastName"></b-input>
                </b-field>
              </b-field>
              <b-field label="club">
                <b-input v-model="credentials.club"></b-input>
              </b-field>
              <b-field label="Date de naissance">
                <b-datepicker
                  v-model="credentials.birthDay"
                  placeholder="Cliquer pour selectionner"
                  icon="calendar-today"
                  trap-focus>
                </b-datepicker>
              </b-field>
              <b-field label="Mot de passe">
                <b-input v-model="credentials.password" type="password" password-reveal required></b-input>
              </b-field>

              <b-field
                label="Confirmer le mot de passe"
                :message="form.passwordIsValid ? '' : form.message">
                <b-input v-model="credentials.passwordConfirmation" type="password" required></b-input>
              </b-field>
              <nuxt-link to='/login'>
                <span id="subscriptions" class="has-text-info form_link">J'ai déjà un compte</span>
              </nuxt-link>
              <div class="is-pulled-right">
                <b-button tag="button" native-type="submit" type="is-primary" :loading="form.isLoading">S'inscrire</b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { authUser } from '~/store'
  import { FormSubscription, Sex, SubscriptionCredentials } from "~/definitions";

  @Component({
    layout: 'blank',
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
    credentials = {
      email: 'admin@test.com',
      firstName: 'Laurent',
      lastName: 'Gbagbo',
      sex: Sex.Male,
      club: 'FFME',
      birthDay: new Date('01/29/1992'),
      dateBirth: 0,
      password: 'admin@test.com',
      passwordConfirmation: 'admin@test.com'
    }

    async subscribeUser(credentials: SubscriptionCredentials): Promise<void> {
      this.form.isLoading = true;
      if (!this.checkPassword(credentials.password, credentials.passwordConfirmation)) {
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

      credentials.birthYear = new Date().getFullYear() - credentials.birthDay.getFullYear()

      try {
        await authUser.subscribeUser(credentials)
        this.form.isLoading = false
        this.$router.push('login?fromSubscription=true')
      } catch(err) {
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
  }
</script>

<style scoped>
  img {
    margin: 20px
  }
  .card-header {
    display: flex;
    justify-content: center;
  }
#login {
  padding-top: 25%;
}
</style>
