<template>
  <div class="columns">
    <div class="column is-offset-4 is-4">
      <div id="login">
        <div class="card">
          <div class="card-header">
            <LogoComponent />
          </div>
          <div class="card-content">
            <template v-if="fromSubscription">
              <b-notification
                id="from-subscription"
                type="is-info"
                :closable="true"
              >
                {{ form.message }}
              </b-notification>
            </template>
            <template v-else>
              <b-notification
                :type="form.error ? 'is-danger' : 'is-success'"
                :closable="false"
                :active.sync="form.success || form.error"
              >
                {{ form.message }}
              </b-notification>
            </template>
            <LoginForm @emitForm="connectUser" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { authUser } from '~/store'
import LoginForm from '~/components/Form/LoginForm.vue'
import { FormEvent, LoginEvent } from '~/definitions/FormEvent'
import { APIToken, APIUser } from '~/definitions'
import { AxiosHelper } from '~/utils/axiosHelper'
import Message from '~/definitions/fr'
import LogoComponent from '~/components/LogoComponent.vue'

@Component({
  layout: 'blank',
  components: { LoginForm, LogoComponent },
  middleware: 'isAuth'
})
export default class Login extends Vue {
  form: FormEvent = {
    error: false,
    success: false,
    message: null
  }

  fromSubscription: boolean = false // Utiliser pour afficher message perso si l'utilisateur provient de la page d'inscription

  mounted() {
    this.fromSubscription = !!this.$route.query?.fromSubscription
    this.form.message = this.fromSubscription ? Message.LoginIncitation : ''
  }

  async connectUser(loginEvent: LoginEvent) {
    try {
      this.form.message = "Vous allez être redirigé vers la page d'accueil"
      this.form.success = true

      const apiToken = await this.fetchToken(loginEvent)
      if (!apiToken) throw new Error('No Token was found')
      this.setToken(apiToken.token, apiToken.expiresIn)

      const user = await this.fetchUser(apiToken.userId)
      if (!user) throw new Error('No user was found')
      this.setUser(user)

      setTimeout(async () => this.$router.push({ name: 'index' }), 1000)
    } catch (error) {
      console.log('err', error)
      this.form.error = true
      this.form.message = 'Identifiant / Mot de passe incorrecte'
    }
  }

  async fetchToken(loginEvent: LoginEvent): Promise<APIToken | null> {
    try {
      console.log('authUser', authUser)
      const response = await authUser.fetchToken({
        email: loginEvent.data.email,
        password: loginEvent.data.password
      })

      return response.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  async fetchUser(userId: number): Promise<APIUser | null> {
    try {
      const response = await authUser.fetchUser(userId)

      return response.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  setToken(token: string, expiresIn: number): void {
    authUser.addTokenToCookies(token, expiresIn)
    AxiosHelper.SetHeaderAuthorizationToken(token)
  }

  setUser(userCredential: APIUser) {
    authUser.setUserCredentials(userCredential)
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
