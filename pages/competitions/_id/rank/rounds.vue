<template>
  <div>
    <h1 class="title">
      Classement round
    </h1>
    <h2 class="subtitle">
      Voir le détail des classements
    </h2>
    <BulkResultStepComponent
      :is-bulk="false"
      :rounds="rounds"
      :competition="competition"
    ></BulkResultStepComponent>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BulkResultStepComponent from '~/components/BulkResultStepComponent.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { APIBoulderingRounds, APICompetition } from '~/definitions'

async function getRound(competitionId: number) {
  try {
    const round = await ApiHelper.GetRound(competitionId)

    return round.data
  } catch (err) {
    err({ statusCode: 404, message: 'Round non trouvé' })
  }
}
async function fetchCompetition(
  idCompetition: number
): Promise<APICompetition> {
  const result = await ApiHelper.GetCompetition(idCompetition)
  return {
    ...result.data,
    startDate: result.data?.startDate ? new Date(result.data?.startDate) : null,
    endDate: result.data?.endDate ? new Date(result.data.endDate) : null,
    welcomingDate: result.data?.welcomingDate
      ? new Date(result.data.welcomingDate)
      : null
  }
}
@Component({
  components: { BulkResultStepComponent },
  async asyncData(ctx) {
    const idCompetition = parseInt(ctx.params.id, 10)
    const rounds = await getRound(idCompetition)
    const competition = await fetchCompetition(idCompetition)

    return {
      rounds,
      competition
    }
  }
})
export default class RoundsRankPage extends Vue {
  rounds: APIBoulderingRounds | null = null
  competition: APICompetition | null = null
}
</script>

<style scoped></style>
