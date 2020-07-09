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
                  ></RoundUnlimitedRanking>
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
  CountedRankings,
  PropsBulkResult,
  RankingType,
  RawBoulderingUnlimitedContestRankingWithType,
  RawCountedRanking,
  RawCountedRankingWithType,
  RawRankingType,
  StateRound,
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
  async onUserChoice(userChoice: UserChoice) {
    // Use to update the user choice
    if (userChoice.category && userChoice.genre && userChoice.type) {
      const currentRound = this.rounds[userChoice.category][userChoice.genre][
        userChoice.type
      ]

      this.roundId = currentRound.id
      this.competitionId = currentRound.competitionId
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
          console.log('rankingPerGroups', rankingPerGroups)
          if (((rankingPerGroups.data as unknown) as string) === '')
            throw new Error('Aucun classement trouvé')

          if (!rankingPerGroups.data?.data?.boulders)
            throw new Error('Aucun classement trouvé')

          rankingPerGroups.data.data.boulders.forEach((bloc, index) => {
            if (!this.rankingsPerBloc && bloc) return
            const filtered = boulderFilter.getGroupsRankings(
              rankingPerGroups.data,
              index
            )
            console.log('filtered', filtered)
            if (!filtered) return
            this.rankingsPerBloc.push(filtered)
          })
        }
      } catch (err) {
        AxiosHelper.HandleAxiosError(this, err)
      }
    }
  }

  rawRankingType = RawRankingType
  rankingType = RankingType
  stateRound = StateRound
  roundId: number = 0
  competitionId: number = 0

  groups: APIBoulderingGroupsClimbers[] = []

  rankingPerGroups: Array<CountedRankings> = []
  rankingsPerBloc: Array<
    Array<
      RawCountedRanking | RawBoulderingUnlimitedContestRankingWithType | null
    >
  > = []

  visible = true

  onBulkEdition(props: {
    index: number
    row: RawCountedRankingWithType
    groupId: number
    boulderId: number
  }) {
    console.log('BoulderRanking', props)
    const propsBulkResult: PropsBulkResult = {
      ...props,
      groupId: props.groupId,
      boulderId: props.boulderId,
      roundId: this.roundId,
      competitionId: this.competitionId
    }
    this.$emit('bulkEdition', propsBulkResult)
  }
}
</script>

<style scoped></style>
