<template>
  <form
    @submit.prevent="emitForm(userCredential.email, userCredential.password)"
  >
    <b-field label="Email" required>
      <b-input
        v-model="userCredential.email"
        type="text"
        class="email"
      ></b-input>
    </b-field>
    <b-field label="Mot de passe">
      <b-input
        v-model="userCredential.password"
        password-reveal
        type="password"
        required
        class="password"
      >
      </b-input>
    </b-field>
    <nuxt-link to="/subscriptions">
      <span id="subscriptions" class="has-text-info form_link"
        >Je n'ai pas encore de compte</span
      >
    </nuxt-link>
    <p class="control is-pulled-right">
      <b-button class="button" native-type="submit" type="is-primary">
        Se connecter
      </b-button>
    </p>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LoginFormEvent } from '~/definitions/FormEvent'
import { AuthCredentials } from '~/definitions'

@Component
export default class LoginForm extends Vue {
  userCredential: AuthCredentials = {
    email: 'admin@test.com',
    password: 'admin@test.com'
  }

  emitForm() {
    this.$emit('emitForm', {
      error: false,
      success: true,
      message: null,
      data: this.userCredential
    } as LoginFormEvent)
  }
}
</script>

<style scoped></style>
