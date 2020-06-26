<template>
  <div>
    <template v-if="isJudge">
      <b-collapse aria-id="contentIdForA11y2" class="panel" animation="slide">
        <div
          slot="trigger"
          class="panel-heading"
          role="button"
          aria-controls="contentIdForA11y2"
        >
          <strong>{{ `${climber.firstName} ${climber.lastName}` }}</strong>
        </div>
        <div class="panel-block">
          <div class="columns">
            <div class="column is-flex">
              <figure class="image is-256x-256">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
              <FormClimber
                :result="results"
                :climber="climber"
                :group-id="groupId"
                :bloc-id="blocId"
                @onSendNote="sendNote"
              />
            </div>
          </div>
        </div>
      </b-collapse>
    </template>
    <template v-else>
      <p class="notification is-warning">
        Vous n'êtes pas juge de ce bloc
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FormClimber from '~/components/Form/FormClimber.vue'
import { BoulderingResultWithCredentials, User } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  components: { FormClimber }
})
export default class AddResultComponent extends Vue {
  @Prop(Object) climber!: User
  @Prop(Number) blocId!: number
  @Prop(Number) groupId!: number
  @Prop(Number) roundId!: number
  @Prop(Number) competitionId!: number

  results: BoulderingResultWithCredentials = {
    climberId: this.climber.id,
    top: false,
    zone: false,
    try: 3,
    groupId: this.groupId,
    blocId: this.blocId
  }

  isJudge = true

  maxTries = 3
  isEdition = false
  oldResult = {
    try: 0,
    top: null,
    zone: null
  }

  created() {
    this.fetchClimberResult()
  }

  async fetchClimberResult() {
    try {
      const result = await ApiHelper.GetResultClimber(
        this.competitionId,
        this.roundId,
        this.groupId,
        this.blocId,
        this.climber.id
      )
      this.isEdition = true
      this.oldResult.try = result.data.tries
      this.setResult(result.data.top, result.data.zone, result.data.tries)
    } catch (err) {
      console.log('err.data', err.response)
      if (
        err.response.status === 404 &&
        err.response.data.code === 'BOULDERING_RESULT_NOT_FOUND'
      )
        return
      if (err.response.status === 403) {
        // Cela signifie que l'utilisateur n'est pas juge du bloc
        this.isJudge = false
        /* this.$buefy.snackbar.open({
            type: 'is-danger',
            position: 'is-top',
            message: "Vous n'êtes pas juge de ce bloc, edition impossible"
          }) */
        return
      }
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async sendNote(note: BoulderingResultWithCredentials) {
    this.$emit('onSendNote', note)
  }

  setResult(top: boolean, zone?: boolean, tries?: number) {
    this.results.top = top
    this.results.zone = zone || false
    this.results.try = tries || 3
  }
}
</script>

<style scoped></style>
