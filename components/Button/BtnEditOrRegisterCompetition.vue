<template>
  <div class="BtnEditOrRegisterCompetition is-pulled-right">
    <template v-if="userHasRole">
      <BtnEditCompetition :competition-id="competitionId" />
    </template>
    <template v-else-if="!userHasRole">
      <BtnRegisterCompetition
        :is-loading="isLoading"
        :success="success"
        :is-already-register="isAlreadyRegister"
        :competition-id="competitionId"
        :is-connected="isAuthenticated"
        @register="$emit('register')"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BtnEditCompetition from '~/components/Button/BtnEditCompetition.vue'
import BtnRegisterCompetition from '~/components/Button/BtnRegisterCompetition.vue'

@Component({
  components: { BtnRegisterCompetition, BtnEditCompetition }
})
export default class BtnEditOrRegisterCompetition extends Vue {
  @Prop(Boolean) userHasRole!: boolean
  @Prop(Number) competitionId!: number
  @Prop(Boolean) isAuthenticated!: boolean
  @Prop(Boolean) isAlreadyRegister!: boolean
  @Prop(Boolean) isLoading!: boolean
  @Prop(Boolean) success!: boolean
}
</script>

<style scoped></style>
