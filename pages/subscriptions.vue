<template>
  <div class="columns">
    <div class="column is-offset-4 is-4">
      <div id="login">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              Inscriptions
            </p>
          </div>
          <div class="card-content">
            <b-notification :type="form.error ? 'is-danger' : 'is-success'" :closable=false :active.sync="form.success || form.error">
              {{ form.message }}
            </b-notification>
            <form v-on:submit.prevent="subscribeUser(credentials)">

              <b-field required>
                <b-radio v-model="credentials.genre"
                         name="name"
                         native-value="Homme">
                  Homme
                </b-radio>
                <b-radio v-model="credentials.genre"
                         name="name"
                         native-value="Femme">
                  Femme
                </b-radio>
              </b-field>
              <b-field label="Email" required>
                <b-input v-model="credentials.email" type="text"></b-input>
              </b-field>
              <b-field grouped group-multiline>
                <b-field label="Prénom" required>
                  <b-input v-model="credentials.name" type="text"></b-input>
                </b-field>
                <b-field label="Nom" required>
                  <b-input v-model="credentials.lastName" type="text"></b-input>
                </b-field>
              </b-field>
              <b-field label="Date de naissance">
                <b-datepicker
                  v-model="credentials.dateBirth"
                  placeholder="Cliquer pour selectionner"
                  icon="calendar-today"
                  trap-focus>
                </b-datepicker>
              </b-field>
              <b-field label="Mot de passe">
                <b-input v-model="credentials.password" type="password" required></b-input>
              </b-field>
              <b-field
                label="Confirmer le mot de passe"
                :message="form.passwordIsValid ? '' : 'Les mots de passe doivent être identitiques' ">
                <b-input v-model="credentials.passwordConfirmation" password-reveal type="password" required></b-input>
              </b-field>
              <nuxt-link to='/login'>
                <span id="subscriptions" class="has-text-info form_link">J'ai déjà un compte</span>
              </nuxt-link>
              <div class="is-pulled-right">
                <button class="button is-primary">S'inscrire</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { authUser } from '~/store'
  import { FormSubscription, SubscriptionCredentials } from "~/definitions";

  @Component({
    layout: 'blank'
  })
  export default class Subscriptions extends Vue {
    form: FormSubscription = {
      error: false,
      success: false,
      message: '',
      passwordIsValid: true
    }
    credentials = {
      email: 'email@email.com',
      name: 'Laurent',
      lastName: 'Gbagbo',
      genre: 'Homme',
      dateBirth: new Date(),
      password: 'test',
      passwordConfirmation: 'test'
    }

    async subscribeUser(credentials: SubscriptionCredentials): Promise<void> {
      if (!this.checkPassword(credentials.password, credentials.passwordConfirmation)) {
        this.form.passwordIsValid = false
        return
      }

      try {
        await authUser.subscribeUser(credentials)
        this.$router.push('login?fromSubscription=true')
      } catch(err) {
        this.form.error = true
        this.form.message = "Une erreur s'est produite"
      }
    }

    checkPassword(password: string, passwordConfirmation: string): boolean {
      return password === passwordConfirmation
    }
  }
</script>

<style scoped>
#login {
  padding-top: 25%;
}
</style>
