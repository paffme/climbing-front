<template>
  <div>
    <template v-if="isConnected">
      <b-button
        type="is-primary"
        :disabled="isAlreadyRegister"
        :loading="isLoading"
        @click="isComponentModalActive = true"
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
          @click="isComponentModalActive = true"
        >
          {{ 'Je souhaite participer !' }}
        </b-button>
      </b-tooltip>
    </template>

    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <UserRegisterToCompetition
        :success="success"
        :is-loading="isLoading"
        @register="$emit('register')"
      />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import UserRegisterToCompetition from '~/components/Form/UserRegisterToCompetition.vue'

@Component({
  components: { UserRegisterToCompetition }
})
export default class BtnRegisterCompetition extends Vue {
  @Prop(Number) competitionId!: number
  @Prop(Boolean) isConnected!: boolean
  @Prop(Boolean) isAlreadyRegister!: boolean
  @Prop(Boolean) isLoading!: boolean
  @Prop(Boolean) success!: boolean

  isComponentModalActive = false
}
</script>

<style scoped></style>
