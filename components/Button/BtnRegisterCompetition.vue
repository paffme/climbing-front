<template>
  <div>
    <template v-if="isConnected">
      <b-button
        type="is-primary"
        :loading="isLoading"
        @click="openRegisterModal"
      >
        {{
          isAlreadyRegister
            ? 'Vous êtes déjà inscrit'
            : 'Je souhaite participer !'
        }}
      </b-button>
    </template>
    <template v-else>
      <b-tooltip label="Vous devez être connecté">
        <b-button
          type="is-primary"
          disabled
          :loading="isLoading"
          @click="openRegisterModal"
        >
          {{
            isAlreadyRegister
              ? 'Vous êtes déjà inscrit'
              : 'Je souhaite participer !'
          }}
        </b-button>
      </b-tooltip>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import UserRegisterToCompetition from '~/components/Form/UserRegisterToCompetition.vue'
import AuthUser from '~/store/authUser'

@Component
export default class BtnRegisterCompetition extends Vue {
  @Prop(Number) competitionId!: number
  isAlreadyRegister = false
  // @ts-ignore
  isConnected = AuthUser.getters?.['Authenticated']() || false

  openRegisterModal() {
    this.$buefy.modal.open({
      parent: this,
      props: {
        competitionId: this.competitionId
      },
      events: {
        hasRegister: () => {
          this.isAlreadyRegister = true
        }
      },
      component: UserRegisterToCompetition,
      hasModalCard: true,
      trapFocus: true
    })
  }
}
</script>

<style scoped></style>
