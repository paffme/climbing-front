<template>
  <form v-if="user" @submit.prevent="updateCredentials">
    <b-field grouped>
      <b-field label="Prénom" :label-position="labelPosition" expanded>
        <b-input v-model="user.firstName"> </b-input>
      </b-field>
      <b-field label="Nom" :label-position="labelPosition" expanded>
        <b-input v-model="user.lastName"> </b-input>
      </b-field>
    </b-field>
    <b-field
      v-show="!showPassword"
      label="mot de passe"
      :label-position="labelPosition"
    >
      <b-input expanded value="*****" type="password"> </b-input>
      <p class="control">
        <b-button
          class="button is-primary"
          @click="showPassword = !showPassword"
        >
          Modifier
        </b-button>
      </p>
    </b-field>
    <template v-if="showPassword">
      <b-field label="Nouveau mot de passe" :label-position="labelPosition">
        <b-input
          v-model="credentials.newPassword"
          type="password"
          minlength="6"
        ></b-input>
      </b-field>
      <b-field
        label="Confirmez le mot de passe"
        :label-position="labelPosition"
      >
        <b-input
          v-model="credentials.newPassword2"
          type="password"
          minlength="6"
        ></b-input>
      </b-field>

      <div v-if="!credentials.passwordIsValid">
        <span class="has-text-danger"
          ><b-icon icon="close-octagon"> </b-icon>Les mots de passes doivent
          être identiques</span
        >
      </div>

      <div class="flex password">
        <b-button type="is-warning" @click="showPassword = !showPassword">
          Annuler
        </b-button>
        <b-button type="is-info" @click="updatePassword">
          Valider
        </b-button>
      </div>
    </template>
    <b-field label="Email" :label-position="labelPosition">
      <b-input v-model="user.email"> </b-input>
    </b-field>
    <b-field label="Année de naissance" :label-position="labelPosition">
      <b-input v-model="user.birthYear"> </b-input>
    </b-field>
    <b-field label="Club" :label-position="labelPosition">
      <b-input v-model="user.club"> </b-input>
    </b-field>
    <div>
      <b-button native-type="submit" type="is-primary">
        Valider
      </b-button>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIUser } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { authUser } from '~/utils/store-accessor'
import { AxiosHelper } from '~/utils/axiosHelper'
import AuthUser from '~/store/authUser'
import { EventBus } from '~/utils/EventBus'

@Component
export default class FormUpdateUser extends Vue {
  @Prop(Object) user!: APIUser

  labelPosition = 'on-border'
  showPassword = false
  originalEmail: string | null = null

  credentials = {
    password: null,
    newPassword: null,
    newPassword2: null,
    passwordIsValid: true
  }

  created() {
    // @ts-ignore
    this.originalEmail = AuthUser.getters?.['Credentials']().email
  }

  async updateCredentials() {
    try {
      const user = await ApiHelper.UpdateUser(
        this.user.id,
        this.dtoUser(this.user)
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Profil mis a jours'
      })
      authUser.setUserCredentials(user.data)
      EventBus.$emit('credentialUpdated')
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async updatePassword() {
    if (this.credentials.newPassword !== this.credentials.newPassword2) {
      this.credentials.passwordIsValid = false
      return
    }

    try {
      await ApiHelper.UpdateUser(this.user.id, {
        password: (this.credentials.newPassword as unknown) as string
      })
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Mot de passe mise à jours'
      })
      this.showPassword = false
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  dtoUser(
    user: APIUser
  ): {
    firstName: string
    lastName: string
    email?: string
    club?: string
    birthYear: number
  } {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: this.originalEmail !== user.email ? user.email : undefined,
      club: user.club || undefined,
      birthYear: parseInt(user.birthYear as any, 10)
    }
  }
}
</script>

<style scoped>
.password {
  margin: 20px 50px 20px 0;
}
</style>
