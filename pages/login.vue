<template>
  <div class="columns">
    <div class="column is-offset-4 is-4">
      <div id="login">
        <div class="card">
          <div class="card-header">
            <img src="../assets/ffme_logo.png" alt="" width="140">
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
            <LoginForm v-on:emitForm="connectUser"></LoginForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { authUser } from '~/store'
  import LoginForm from "~/components/Form/LoginForm.vue";
  import { FormEvent, LoginFormEvent } from "~/definitions/FormEvent";

  @Component({
    layout: 'blank',
    components: {LoginForm},
    middleware: 'isAuth'
  })
  export default class Login extends Vue {
    form: FormEvent = {
      error: false,
      success: false,
      message: null
    }
    fromSubscription = false // Utiliser pour afficher message perso si l'utilisateur provient de la page d'inscription

    mounted() {
      this.fromSubscription = !!this.$route.query.fromSubscription
      this.form.message = this.fromSubscription ? 'Vous pouvez désormais vous connecter' : ''
    }
    async connectUser(loginFormEvent: LoginFormEvent) {
      this.form.success = loginFormEvent.success
      this.form.error = loginFormEvent.error
      this.form.message = loginFormEvent.message
      try {
        const tokenCredentials = await authUser.fetchToken({email: loginFormEvent.data.email, password: loginFormEvent.data.password})
        authUser.setTokenCredentials(tokenCredentials.data)
        const userCredential = await authUser.fetchUser(tokenCredentials.data.userId)
        authUser.setUserCredentials(userCredential.data)
        this.form.success = true
        this.form.message = "Vous allez être redirigé vers la page d\'accueil"
        await this.$router.push({name: 'index'})
      } catch(error) {
        console.log('err', error)
        this.form.error = true
        this.form.message = 'Identifiant / Mot de passe incorrecte'
      }
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
