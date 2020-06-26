<template>
  <div>
    <form @submit.prevent="sendResult">
      <table class="table">
        <thead>
          <tr>
            <th><abbr title="Nom">Nom</abbr></th>
            <th><abbr title="Top">Top</abbr></th>
            <th><abbr title="Try">Try</abbr></th>
            <th><abbr title="Zone">Zone</abbr></th>
            <th><abbr title="Zone">Résultats</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ climber.firstName }} {{ climber.lastName }}</th>
            <th>
              <FormClimberRadio
                :data="result.top"
                :disabled="isEdition || !isJudge"
                @onSelect="selectTop"
              />
            </th>
            <td>
              <div class="content">
                <b-field>
                  <b-select v-model="result.try" :disabled="!isJudge">
                    <option
                      v-for="maxTry in maxTries"
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
                :disabled="isEdition || !isJudge"
                @onSelect="selectZone"
              />
            </td>
            <td>
              <b-button :disabled="!isJudge" @click="sendResult">
                Envoyer les résultats
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
import { BoulderingResultWithCredentials, User } from '~/definitions'
import FormClimberRadio from '~/components/Form/FormClimberRadio.vue'

@Component({
  components: { FormClimberRadio }
})
export default class FormClimber extends Vue {
  @Prop(Object) result!: BoulderingResultWithCredentials
  @Prop(Number) blocId!: number
  @Prop(Number) groupId!: number
  @Prop(Object) climber!: User

  isJudge = true

  maxTries = 3
  isEdition = false
  oldResult = {
    try: 0,
    top: null,
    zone: null
  }

  sendResult() {
    const essai = !this.isEdition
      ? this.result.try
      : this.oldResult.try
      ? this.differenceBetween(
          this.result.try,
          (this.oldResult.try as unknown) as number
        )
      : 0
    const result: BoulderingResultWithCredentials = {
      climberId: this.result.climberId,
      top:
        this.isEdition && this.result.top !== this.oldResult.top
          ? undefined
          : this.result.top,
      zone:
        this.isEdition && this.result.zone !== this.oldResult.zone
          ? undefined
          : this.result.zone,
      try: essai,
      groupId: this.groupId,
      blocId: this.blocId
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

<style scoped></style>
