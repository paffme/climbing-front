<template>
  <div class="columns">
    <div class="column is-offset-4 is-4">
      <div id="login">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              Se connecter
            </p>
          </div>
          <div class="card-content">
            <template v-if="fromSubscription">
              <b-notification type="is-success" :closable=true>
                {{ form.message }}
              </b-notification>
            </template>
            <b-notification :type="form.error ? 'is-danger' : 'is-success'" :closable=false :active.sync="form.success || form.error">
              {{ form.message }}
            </b-notification>
            <form v-on:submit.prevent>
              <b-field label="Email" required>
                <b-input v-model="credential.email" type="text"></b-input>
              </b-field>
              <b-field label="Mot de passe">
                <b-input v-model="credential.password" password-reveal type="password" required></b-input>
              </b-field>
              <nuxt-link to='/subscriptions'>
                <span id="subscriptions" class="has-text-info form_link">Je n'ai pas encore de compte</span>
              </nuxt-link>
              <div class="is-pulled-right">
                <button class="button is-primary" v-on:click="connectUser(credential.email, credential.password)">Se connecter</button>
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
  import { TokenCredentials, UserCredentials } from "~/definitions";

  @Component({
    layout: 'blank',
  })
  export default class Login extends Vue {
    form = {
      error: false,
      success: false,
      message: ''
    }
    credential = {
      email: 'admin@test.com',
      password: 'admin@test.com'
    }
    fromSubscription = false

    mounted() {
      this.fromSubscription = !!this.$route.query.fromSubscription
      this.form.message = this.fromSubscription ? 'Vous pouvez désormais vous connecter' : ''
    }
    async connectUser(email: string, password: string) {
      this.form.success = false
      this.form.error = false
      this.form.message = ''
      try {
        const tokenCredentials: TokenCredentials = await authUser.fetchToken({email, password})
        authUser.setTokenCredentials(tokenCredentials)
        const userCredential: UserCredentials = await authUser.fetchUser(tokenCredentials.userId)
        authUser.setUserCredentials(userCredential)
        this.form.success = true
        this.form.message = "Vous allez être redirigé vers la page d\'accueil"
        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 1500)
      } catch(error) {
        this.form.error = true
        this.form.message = 'Identifiant / Mot de passe incorrecte'
      }
    }
  }
</script>

<style scoped>
#login {
  padding-top: 25%;
}
</style>
