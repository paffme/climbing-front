<template>
  <div>
    <div v-if="groups">
      <template v-for="(group, index) in groups">
        <div :key="index" class="notification">
          <div class="content">
            Groupe n°{{ index + 1 }}
            <b-tag class="is-info"> id: {{ group.id }} </b-tag>
            <b-tag class="is-warning is-pulled-right">
              {{ stateRound[group.state] }}
            </b-tag>
          </div>
          <template v-for="(boulder, boulderIndex) in group.boulders">
            <div :key="boulderIndex" class="notification is-primary">
              <p class="content">
                Bloc n°{{ boulderIndex + 1 }}
                <b-tag class="is-info"> id: {{ boulder.id }} </b-tag>
              </p>
              <div>
                <template
                  v-if="
                    rankingsPerBloc &&
                    rankingsPerBloc[boulderIndex] &&
                    rankingsPerBloc[boulderIndex][0] &&
                    rankingsPerBloc[boulderIndex][0].type ===
                      rawRankingType.UNLIMITED_CONTEST
                  "
                >
                  <div class="content">
                    <b-tag>
                      Contest :
                      {{ rankingType[rankingsPerBloc[boulderIndex][0].type] }}
                    </b-tag>
                  </div>
                  <RoundUnlimitedRanking
                    :boulder-id="boulder.id"
                    :group-id="group.id"
                    :competition-id="competitionId"
                    :round-id="roundId"
                    :is-bulk="isBulk"
                    :data="rankingsPerBloc[boulderIndex]"
                    @bulkEdition="onBulkEdition"
                  />
                </template>
                <template v-else>
                  <RoundRanking
                    :boulder-id="boulder.id"
                    :group-id="group.id"
                    :competition-id="competitionId"
                    :round-id="roundId"
                    :is-bulk="isBulk"
                    :data="rankingsPerBloc[boulderIndex]"
                    @bulkEdition="onBulkEdition"
                  />
                </template>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {
  APIBoulderingGroupsClimbers,
  APIBoulderingRounds,
  BoulderingLimitedRounds,
  CircuitResult,
  CountedRankings,
  RankingType,
  RawBoulderingUnlimitedContestRankingWithType,
  RawCountedRanking,
  RawCountedRankingWithType,
  RawRankingType,
  StateRound,
  UnlimitedContestResult,
  UserChoice
} from '~/definitions'
import boulderFilter from '~/utils/boulderFilter'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import RankNotFound from '~/components/RankNotFound.vue'
import RoundRanking from '~/components/RoundRanking.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import RoundUnlimitedRanking from '~/components/RoundUnlimitedRanking.vue'

@Component({
  components: { RankNotFound, RoundRanking, RoundUnlimitedRanking }
})
export default class BoulderRankingPerBlocs extends Vue {
  @Prop(Object) rounds!: APIBoulderingRounds
  @Prop(Boolean) isBulk!: boolean
  @Prop(Object) userChoice!: UserChoice

  @Watch('userChoice', { immediate: true, deep: true })
  onUserChoice(userChoice: UserChoice) {
    // Use to update the user choice
    if (userChoice.category && userChoice.genre && userChoice.type) {
      const currentRound = this.rounds[userChoice.category][userChoice.genre][
        userChoice.type
      ]

      this.currentRound = currentRound

      this.roundId = currentRound.id
      this.competitionId = currentRound.competitionId

      this.fetchGroup(currentRound)
    }
  }

  rawRankingType = RawRankingType
  rankingType = RankingType
  stateRound = StateRound
  roundId: number = 0
  competitionId: number = 0

  currentRound: BoulderingLimitedRounds | null = null

  groups: APIBoulderingGroupsClimbers[] = []

  rankingPerGroups: Array<CountedRankings> = []
  rankingsPerBloc: Array<
    Array<
      RawCountedRanking | RawBoulderingUnlimitedContestRankingWithType | null
    >
  > = []

  visible = true

  async onBulkEdition(props: {
    index: number
    row: RawCountedRankingWithType
    groupId: number
    boulderId: number
  }) {
    let result: CircuitResult[] | UnlimitedContestResult[]
    if (props.row.type === RawRankingType.UNLIMITED_CONTEST) {
      result = [
        {
          climberId: props.row.climber?.id,
          boulderId: props.boulderId,
          type: props.row.type,
          top: props.row.top
        }
      ] as UnlimitedContestResult[]
    } else {
      result = [
        {
          climberId: props.row.climber?.id,
          boulderId: props.boulderId,
          type: props.row.type,
          topInTries: parseInt((props.row.topInTry as unknown) as string, 10),
          zoneInTries: parseInt((props.row.zoneInTry as unknown) as string, 10)
        }
      ] as CircuitResult[]
    }
    try {
      await ApiHelper.AddBulkResult(
        { results: result },
        this.competitionId,
        this.roundId,
        props.groupId
      )
      this.$buefy.snackbar.open({
        message: 'Les résultats on été mis à jours',
        actionText: null
      })
      if (!this.currentRound) return

      this.fetchGroup(this.currentRound)
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async fetchGroup(currentRound: BoulderingLimitedRounds) {
    try {
      const groups = await ApiHelper.GetBoulderingGroups(
        currentRound.competitionId,
        currentRound.id
      )
      this.groups = groups.data

      for (const group of this.groups) {
        const rankingPerGroups = await ApiHelper.GetGroupRankings(
          currentRound.competitionId,
          currentRound.id,
          group.id
        )
        if (((rankingPerGroups.data as unknown) as string) === '')
          throw new Error('Aucun classement trouvé')

        if (!rankingPerGroups.data?.data?.boulders)
          throw new Error('Aucun classement trouvé')

        this.rankingsPerBloc = []

        rankingPerGroups.data.data.boulders.forEach((bloc, index) => {
          if (!this.rankingsPerBloc && bloc) return
          const filtered = boulderFilter.getGroupsRankings(
            rankingPerGroups.data,
            index
          )
          if (!filtered) return
          this.rankingsPerBloc.push(filtered)
        })
      }
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped></style>
