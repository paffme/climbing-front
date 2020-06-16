<template>
  <div class="notification">
    <p class="subtitle">{{ climber.firstName }} {{ climber.lastName }}</p>
    {{ results }}
    <form @submit.prevent="sendResult">
      <div class="tile is-ancestor">
        <div class="tile is-4">
          <div class="tile is-parent">
            <article class="tile is-child notification is-primary">
              <FormClimberRadio title="Top" @onSelect="selectTop" />
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-primary">
              <p class="subtitle">
                Try
              </p>
              <div class="content">
                <b-field>
                  <b-select v-model="results.try">
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
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-primary">
              <FormClimberRadio title="Zone" @onSelect="selectZone" />
            </article>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BoulderingResult, User } from '~/definitions'
import FormClimberRadio from '~/components/Form/FormClimberRadio.vue'

@Component({
  components: { FormClimberRadio }
})
export default class FormClimber extends Vue {
  @Prop(Object) climber!: User
  results: BoulderingResult = {
    climberId: this.climber.id,
    top: false,
    zone: false,
    try: 3
  }

  maxTries = 3

  sendResult() {}

  selectTry(value: number) {
    this.results.try = value
  }

  selectZone(value: boolean) {
    this.results.zone = value
  }

  selectTop(value: boolean) {
    this.results.top = value
  }
}
</script>

<style scoped></style>
