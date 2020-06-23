<template>
  <div>
    <h1>Notes</h1>
    <template v-for="group in groups">
      <section :key="group.id" class="section">
        <p class="subtitle">{{ group.name }} (id:{{ group.id }})</p>
        <div v-if="currentBoulder && currentBoulder.id">
          <p>Bloc : {{ currentBoulder.id }}</p>
          <template
            v-if="Array.isArray(group.climbers) && group.climbers.length === 0"
          >
            <p>Pas de grimpeurs enregistrées</p>
          </template>
          <template v-for="climber in group.climbers" v-else>
            <FormClimber
              :key="climber.id"
              :climber="climber"
              @onSendNote="sendNote"
            />
          </template>
        </div>
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  APIBoulderingGroupsClimbers,
  APIBoulderingRounds,
  APIBoulders,
  APICompetition,
  APIUserCompetitionRoles,
  BoulderingResult
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import NotesBulk from '~/components/NotesBulk.vue'
import FormClimber from '~/components/Form/FormClimber.vue'
import { AxiosHelper } from '~/utils/axiosHelper'

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
  @Prop(Object) rounds!: APIBoulderingRounds
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

  currentGroup: APIBoulderingGroupsClimbers | null = null
  currentBoulder: APIBoulders | null = null

  created() {
    this.currentGroup = this.getCurrentGroup(this.groups)
    this.currentBoulder =
      this.getCurrentBoulder(this.currentGroup?.boulders) || null
    console.log('currentGroup', this.currentGroup)
    console.log('currentBoulder', this.currentBoulder)
  }

  getCurrentGroup(
    rounds: APIBoulderingGroupsClimbers[] | null
  ): APIBoulderingGroupsClimbers | null {
    if (!rounds) return null

    return (
      rounds.find((round: APIBoulderingGroupsClimbers) => {
        return round.id === parseInt(this.$route.query.groupId as string, 10)
      }) || null
    )
  }

  async sendNote(result: BoulderingResult) {
    console.log('sendNote', result)
    if (!this.competition.id || !this.currentGroup?.id) return
    console.log('this.competition.id', this.competition.id)
    console.log('this.currentRound.id', this.currentGroup.id)
    console.log('this.$route.query.boulderId', this.$route.query)
    if (!this.$route.query.roundId || !this.$route.query.boulderId) return

    try {
      await ApiHelper.AddBoulderingResult(
        result,
        this.competition.id,
        parseInt(this.$route.query.roundId as string, 10),
        parseInt(this.$route.query.groupId as string, 10),
        parseInt(this.$route.query.boulderId as string, 10)
      )
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  public getCurrentBoulder(rounds?: APIBoulders[]): APIBoulders | undefined {
    console.log('rounds', rounds)
    if (!rounds) return
    return rounds.find(
      (round) =>
        round.id === parseInt(this.$route.query.boulderId as string, 10)
    )
  }
}
</script>

<style scoped></style>
