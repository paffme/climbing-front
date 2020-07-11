<template>
  <div>
    <h1 class="title">
      Classement des tours
    </h1>
    <h2 class="subtitle go_back">
      <GoBackBtn />
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
        :rating="false"
        @onSelectRound="selectRound"
      >
        <template
          v-if="
            selectedRound && currentRoundRanking && currentRoundRanking.data
          "
        >
          <div class="display-btn">
            <b-button
              v-if="currentGroups && currentGroups[0]"
              tag="nuxt-link"
              :to="{
                name: 'competitions-id-rank-groups-groupId',
                params: { groupId: currentGroups[0].id },
                query: { roundId: currentGroups[0].roundId }
              }"
            >
              Voir classement groupe 1
            </b-button>
            <b-button
              v-if="currentGroups && currentGroups[1]"
              tag="nuxt-link"
              :to="{
                name: 'competitions-id-rank-groups-groupId',
                params: { groupId: currentGroups[1].id },
                query: { roundId: currentGroups[1].roundId }
              }"
            >
              Voir classement groupe 2
            </b-button>
            <BtnDownloadPdf
              type-competition="rounds"
              :competition-id="competition.id"
              :round-id="selectedRound.id"
            />
          </div>
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
          <div class="has-text-centered">
            <p class="notification is-warning">
              Aucun classement pour ce type de round
            </p>
          </div>
        </template>
      </StepComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import {
  APIBoulderingGroupsClimbers,
  APIBoulderingRounds,
  APICompetition,
  APIRoundRanking,
  BoulderingLimitedRounds,
  CategoryName,
  QueryParamsRank,
  RawRankingType
} from '~/definitions'
import GoogleMapComponent from '~/components/GoogleMapComponent.vue'
import UnlimitedRoundRanking from '~/components/Table/UnlimitedRoundRanking.vue'
import StepComponent from '~/components/StepComponent.vue'
import CompetitionsDetails from '~/components/CompetitionDetails.vue'
import CircuitRoundRanking from '~/components/Table/CircuitRoundRanking.vue'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import BtnDownloadPdf from '~/components/Button/BtnDownloadPdf.vue'

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
    GoogleMapComponent,
    StepComponent,
    CircuitRoundRanking,
    UnlimitedRoundRanking,
    CompetitionsDetails,
    GoBackBtn,
    BtnDownloadPdf
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
  currentGroups: APIBoulderingGroupsClimbers[] | null = null

  async selectRound(round: BoulderingLimitedRounds): Promise<void> {
    this.selectedRound = round
    this.currentRoundRanking = await this.fetchRoundRanking(round.id)
    this.currentGroups = await this.fetchGroups(round.id)
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
      // AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  async fetchGroups(
    roundId: number
  ): Promise<APIBoulderingGroupsClimbers[] | null> {
    try {
      if (!this.competition?.id)
        throw new Error('No competition ID has been found')

      const result = await ApiHelper.GetBoulderingGroups(
        this.competition.id,
        roundId
      )

      console.log('fetchGroups - result', result)
      return result.data
    } catch (err) {
      // AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  buildQuery(): QueryParamsRank {
    const query = {
      cat: (this.$route.query.cat as CategoryName) || undefined,
      genre: (this.$route.query.genre as string) || undefined,
      phase: (this.$route.query.type as any) || undefined
    }

    console.log('buildQuery', query)

    return query
  }
}
</script>

<style scoped>
.display-btn {
  display: flex;
  justify-content: space-evenly;
}
</style>
