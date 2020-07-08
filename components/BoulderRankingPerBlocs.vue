<template>
  <div>
    <div v-if="groups">
      <template v-for="(group, index) in groups">
        <div :key="index" class="notification">
          Groupe {{ index + 1 }} ({{ group.id }})
          <template v-for="(boulder, boulderIndex) in group.boulders">
            <div :key="boulderIndex" class="notification is-primary">
              Bloc : {{ boulder.id }}
              <p>
                <RoundRanking
                  :boulder-id="boulder.id"
                  :group-id="group.id"
                  :competition-id="competitionId"
                  :round-id="roundId"
                  :is-bulk="isBulk"
                  :data="rankingsPerBloc[boulderIndex]"
                  @bulkEdition="onBulkEdition"
                />
              </p>
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
  RawCountedRanking,
  RawCountedRankingWithType,
  UserChoice
} from '~/definitions'
import boulderFilter from '~/utils/boulderFilter'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import RankNotFound from '~/components/RankNotFound.vue'
import RoundRanking from '~/components/RoundRanking.vue'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  components: { RankNotFound, RoundRanking }
})
export default class BoulderRankingPerBlocs extends Vue {
  @Prop(Object) rounds!: APIBoulderingRounds
  @Prop(Boolean) isBulk!: boolean
  @Prop(Object) userChoice!: UserChoice
  @Watch('userChoice', { immediate: true, deep: true })
  async onUserChoice(userChoice: UserChoice) {
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
        console.log('groups - onUserChoice', groups)
        for (const group of this.groups) {
          const rankingPerGroups = await ApiHelper.GetGroupRankings(
            currentRound.competitionId,
            currentRound.id,
            group.id
          )
          console.log('rankingPerGroups', rankingPerGroups)
          if (((rankingPerGroups.data as unknown) as string) === '')
            throw new Error('Aucun classement trouvé')
          // @ts-ignore
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

  roundId: number = 0
  competitionId: number = 0

  groups: APIBoulderingGroupsClimbers[] = []

  rankingPerGroups: Array<CountedRankings> = []
  rankingsPerBloc: Array<Array<RawCountedRanking | null>> = []
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
