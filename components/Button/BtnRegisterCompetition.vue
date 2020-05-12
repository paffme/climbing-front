<template>
  <div>
    <template v-if="AuthUser.Authenticated">
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
import { authUser } from '~/utils/store-accessor'

@Component({
  data() {
    return {
      AuthUser: authUser
    }
  }
})
export default class BtnRegisterCompetition extends Vue {
  @Prop(Number) competitionId!: number
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
