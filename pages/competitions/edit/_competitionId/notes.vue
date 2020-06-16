<template>
  <div>
    <h1>Notes</h1>
    <template v-for="group in groups">
      <section :key="group.id" class="section">
        <p class="subtitle">{{ group.name }} (id:{{ group.id }})</p>

        <template v-for="boulder in group.boulders">
          <div :key="boulder.id">
            <p>Bloc : {{ boulder.id }}</p>
            <template
              v-if="
                Array.isArray(group.climbers) && group.climbers.length === 0
              "
            >
              <p>Pas de grimpeurs enregistrées</p>
            </template>
            <template v-for="climber in group.climbers" v-else>
              <div :key="climber.id" class="columns">
                <div class="column is-8">
                  {{ currentRound }}
                  <FormClimber :climber="climber" />
                </div>
              </div>
            </template>
          </div>
        </template>
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  APIBoulderingGroupsClimbers,
  APIBoulderingRounds,
  APICompetition,
  APIUserCompetitionRoles,
  BoulderingLimitedRounds
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import NotesBulk from '~/components/NotesBulk.vue'
import FormClimber from '~/components/Form/FormClimber.vue'

@Component({
  middleware: ['isAuth', 'setHeader'],
  async asyncData(ctx) {
    const idCompetition = parseInt(ctx.params.competitionId, 10)
    const roundId = parseInt(ctx.query.roundId as string, 10)

    const groups = await ApiHelper.GetBoulderingGroups(idCompetition, roundId)

    return {
      groups: groups.data
    }
  },
  components: { NotesBulk, FormClimber }
})
export default class NotesCompetition extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Object) bouldering!: APIBoulderingRounds
  groups: APIBoulderingGroupsClimbers[] | null = null
  columns = [
    {
      field: 'top',
      label: 'top'
    },
    {
      field: 'zone',
      label: 'zone'
    },
    {
      field: 'try',
      label: 'try'
    }
  ]

  currentRound: APIBoulderingGroupsClimbers | null = null
  currentRoundConfiguration: BoulderingLimitedRounds | null = null

  created() {
    console.log('group', this.bouldering)
    this.currentRound = this.getCurrentRound(this.groups)
    // this.currentRoundConfiguration = this.getCurrentRoundConfiguration(this.bouldering)
  }

  getCurrentRound(
    rounds: APIBoulderingGroupsClimbers[] | null
  ): APIBoulderingGroupsClimbers | null {
    if (!rounds) return null

    return (
      rounds.find((round: APIBoulderingGroupsClimbers) => {
        return round.id === parseInt(this.$route.query.groupId as string, 10)
      }) || null
    )
  }

  /* public getCurrentRoundConfiguration(rounds: APIBoulderingRounds): BoulderingLimitedRounds | boolean {
    // WIP
  } */
}
</script>

<style scoped></style>
