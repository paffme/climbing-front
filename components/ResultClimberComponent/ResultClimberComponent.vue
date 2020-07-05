<template>
  <div class="columns is-multiline">
    <template>
      <div class="column is-offset-3 is-6">
        <NoteClimberComponent
          :boulders="group.boulders"
          @onChangeBloc="changeBloc"
        />
      </div>
      <div class="column is-offset-3 is-6">
        <b-field label="Nom des grimpeurs">
          <b-select
            v-model="blocToSend.userId"
            placeholder="Select a character"
            expanded
          >
            <option
              v-for="climber in group.climbers"
              :key="climber.id"
              :value="climber.id"
            >
              {{ climber.firstName + ' ' + climber.lastName }}
            </option>
          </b-select>
        </b-field>
        <FormClimber
          :round="round"
          :result="results"
          :group-id="group.id"
          :is-disabled="!this.blocToSend.blocId || !this.blocToSend.userId"
          @onSendNote="sendNote"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  APIBoulderingGroupsClimbers,
  BoulderingLimitedRounds,
  BoulderingResult,
  BoulderingResultWithCredentials
} from '~/definitions'
import NoteClimberComponent from '~/components/ResultClimberComponent/NoteClimberComponent.vue'
import FormClimber from '~/components/Form/FormClimber.vue'

@Component({
  components: { NoteClimberComponent, FormClimber }
})
export default class ResultClimberComponent extends Vue {
  @Prop(Object) group!: APIBoulderingGroupsClimbers
  @Prop(Object) round!: BoulderingLimitedRounds

  results = {
    climberId: 0,
    top: false,
    zone: false,
    try: 1
  }

  blocToSend: { blocId: number | null; userId: number | null } = {
    blocId: null,
    userId: null
  }

  created() {
    this.blocToSend.blocId = this.group.boulders?.[0]?.id
  }

  sendNote(note: BoulderingResultWithCredentials) {
    if (!this.blocToSend.userId || !this.blocToSend.blocId) return

    const result: {
      data: BoulderingResult
      info: { blocId: number; groupId: number }
    } = {
      data: {
        climberId: this.blocToSend.userId,
        top: note.top,
        zone: note.zone,
        try: note.try
      },
      info: {
        groupId: this.group.id,
        blocId: this.blocToSend.blocId
      }
    }
    this.$emit('onSendNote', result)
  }

  getResult() {}

  changeBloc(blocId: number) {
    this.blocToSend.blocId = blocId
  }
}
</script>

<style scoped></style>
