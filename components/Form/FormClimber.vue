<template>
  <div>
    <form @submit.prevent="sendResult">
      <table class="table">
        <thead>
          <tr>
            <th><abbr title="Top">Top</abbr></th>
            <template
              v-if="round.rankingType !== rankingType.UNLIMITED_CONTEST"
            >
              <th><abbr title="Try">Try</abbr></th>
              <th><abbr title="Zone">Zone</abbr></th>
            </template>
            <th><abbr title="results">Résultats</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <FormClimberRadio
                :data="result.top"
                :disabled="isEdition || result.alreadyNote || !isJudge"
                @onSelect="selectTop"
              />
            </th>
            <template
              v-if="round.rankingType !== rankingType.UNLIMITED_CONTEST"
            >
              <td>
                <div class="content">
                  <b-field>
                    <b-select
                      v-model="result.try"
                      :disabled="!isJudge || result.alreadyNote"
                    >
                      <option
                        v-for="maxTry in round.maxTries || 50"
                        :key="maxTry"
                        :value="maxTry"
                      >
                        {{ maxTry }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </td>
              <td>
                <FormClimberRadio
                  :data="result.zone"
                  :disabled="isEdition || !isJudge || result.alreadyNote"
                  @onSelect="selectZone"
                />
              </td>
            </template>
            <td>
              <b-button
                type="is-info"
                native-type="submit"
                :disabled="!isJudge || result.alreadyNote || isDisabled"
              >
                Envoyer les résultats
                {{ result.alreadyNote ? '(Déjà noté)' : '' }}
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  BoulderingLimitedRounds,
  BoulderingResult,
  BoulderResultWithNote,
  RawRankingType
} from '~/definitions'
import FormClimberRadio from '~/components/Form/FormClimberRadio.vue'

@Component({
  components: { FormClimberRadio }
})
export default class FormClimber extends Vue {
  @Prop(Object) result!: BoulderResultWithNote
  @Prop(Object) round!: BoulderingLimitedRounds
  @Prop(Number) groupId!: number
  @Prop(Boolean) isDisabled!: boolean

  rankingType = RawRankingType

  isJudge = true

  isEdition = false // Use to know if a result has been already set
  oldResult = {
    try: 0,
    top: null,
    zone: null
  }

  sendResult() {
    let result: BoulderingResult = {
      climberId: this.result.climberId
    }

    if (this.rankingType.UNLIMITED_CONTEST !== this.round.rankingType) {
      const essai =
        this.result.try && !this.isEdition
          ? this.result.try
          : this.oldResult.try && this.result.try
          ? this.differenceBetween(
              this.result.try,
              (this.oldResult.try as unknown) as number
            )
          : 0
      result = {
        ...result,
        top:
          this.isEdition && this.result.top !== this.oldResult.top
            ? undefined
            : this.result.top,
        zone:
          this.isEdition && this.result.zone !== this.oldResult.zone
            ? undefined
            : this.result.zone,
        try: essai
      }
    } else {
      result = {
        ...result,
        top: this.result.top
      }
    }
    console.log('result', result)
    this.$emit('onSendNote', result)
  }

  selectZone(value: boolean) {
    console.log('selectZone', value)
    this.result.zone = value
  }

  selectTop(value: boolean) {
    this.result.top = value
    this.selectZone(value)
  }

  differenceBetween(number1: number, number2: number): number {
    return number1 - number2
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
}
</style>
