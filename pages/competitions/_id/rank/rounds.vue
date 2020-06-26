<template>
  <div>
    <h1 class="title">
      Classement round
    </h1>
    <h2 class="subtitle">
      Voir le détail des classements
    </h2>
    <div class="content notification">
      <div class="columns">
        <div class="column is-12">
          <CompetitionsDetails :competition="competition" />
        </div>
      </div>
    </div>
    <div class="content">
      <StepComponent
        :competition="competition"
        :rounds="rounds"
        @onSelectRound="selectRound"
      >
        <template
          v-if="
            selectedRound && currentRoundRanking && currentRoundRanking.data
          "
        >
          <b-button>Voir classement groupe 1</b-button>
          <b-button>Voir classement groupe 2</b-button>
          <template
            v-if="
              selectedRound.rankingType === rawRankingType.UNLIMITED_CONTEST
            "
          >
            <UnlimitedRoundRanking :round-ranking="currentRoundRanking.data" />
          </template>
          <template
            v-if="selectedRound.rankingType === rawRankingType.LIMITED_CONTEST"
          >
            <CircuitRoundRanking :round-ranking="currentRoundRanking.data" />
          </template>
          <template v-if="selectedRound.rankingType === rawRankingType.CIRCUIT">
            <CircuitRoundRanking :round-ranking="currentRoundRanking.data" />
          </template>
        </template>
        <template v-else>
          <p>Aucun round trouvé</p>
        </template>
      </StepComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BulkResultStepComponent from '~/components/BulkResultStepComponent.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import {
  APIBoulderingRounds,
  APICompetition,
  APIRoundRanking,
  BoulderingLimitedRounds,
  RawRankingType
} from '~/definitions'
import GoogleMapComponent from '~/components/GoogleMapComponent.vue'
import UnlimitedRoundRanking from '~/components/Table/UnlimitedRoundRanking.vue'
import StepComponent from '~/components/StepComponent.vue'
import CompetitionsDetails from '~/components/CompetitionDetails.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import CircuitRoundRanking from '~/components/Table/CircuitRoundRanking.vue'

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
  components: {
    BulkResultStepComponent,
    GoogleMapComponent,
    StepComponent,
    CircuitRoundRanking,
    UnlimitedRoundRanking,
    CompetitionsDetails
  },
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

  selectedRound: BoulderingLimitedRounds | null = null
  currentRoundRanking: APIRoundRanking | null = null
  rawRankingType = RawRankingType

  async selectRound(round: BoulderingLimitedRounds): Promise<void> {
    this.selectedRound = round
    this.currentRoundRanking = await this.fetchRoundRanking(round.id)
  }

  async fetchRoundRanking(roundId: number): Promise<APIRoundRanking | null> {
    try {
      if (!this.competition?.id) throw new Error('ID Compétition undefined')

      const result = await ApiHelper.GetBoulderRoundRankings(
        this.competition.id,
        roundId
      )
      console.log('result', result)
      return result.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }
}
</script>

<style scoped></style>
