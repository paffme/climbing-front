<template>
  <div>
    <h1 class="title">
      Classement groupe
    </h1>
    <h2 class="subtitle go_back">
      <GoBackBtn />
      Voir le détail des classements par groupe
    </h2>
    <template v-if="groupRank">
      <BtnDownloadPdf
        type-competition="rounds"
        :competition-id="parameters.competitionId"
        :round-id="parameters.roundId"
        :group-id="parameters.groupId"
      />
      <template v-if="groupRank.type === rawRankingType.UNLIMITED_CONTEST">
        <div>
          <p class="notification content">
            Selectionner le bloc souhaité
          </p>
          <template v-for="(bloc, index) in groupRank.data.boulders">
            <b-button :key="index" class="content" @click="onSelectBloc(index)">
              Bloc n°{{ bloc }}
            </b-button>
          </template>
          <UnlimitedGroupRanking :group-rankings="selectedBloc" />
        </div>
      </template>
    </template>
    <template v-else>
      <div class="has-text-centered">
        <p class="notification is-warning">
          Aucun classement
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AxiosHelper } from '~/utils/axiosHelper'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import CircuitRoundRanking from '~/components/Table/CircuitRoundRanking.vue'
import {
  APIGroupRanking,
  APIGroupRankingData,
  BoulderingUnlimitedContestRanking,
  BoulderingUnlimitedContestRankingWithTops,
  DtoUnlimitedContestRanking,
  RawRankingType
} from '~/definitions'
import UnlimitedGroupRanking from '~/components/Table/UnlimitedGroupRanking.vue'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import BtnDownloadPdf from '~/components/Button/BtnDownloadPdf.vue'

@Component({
  components: {
    CircuitRoundRanking,
    UnlimitedGroupRanking,
    GoBackBtn,
    BtnDownloadPdf
  }
})
export default class groupsRankPage extends Vue {
  groupRank: APIGroupRanking | null = null
  rawRankingType = RawRankingType

  selectedBloc: DtoUnlimitedContestRanking | null = null
  parameters: {
    competitionId?: number
    roundId?: number
    groupId?: number
  } | null = null

  async created() {
    console.log('this.sockets', this.$socket)
    this.parameters = this.getParameters()

    if (
      !this.parameters?.competitionId ||
      !this.parameters?.roundId ||
      !this.parameters?.groupId
    )
      return

    try {
      const result = await ApiHelper.GetGroupRankings(
        this.parameters.competitionId,
        this.parameters.roundId,
        this.parameters.groupId
      )
      console.log('result', result)
      this.groupRank = result.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  onSelectBloc(index: number): void {
    if (this.groupRank?.type === this.rawRankingType.UNLIMITED_CONTEST) {
      this.selectedBloc = this.formatUnlimitedContestBloc(
        this.groupRank.data,
        index
      )
    }
  }

  getParameters(): {
    competitionId?: number
    roundId?: number
    groupId?: number
  } {
    return {
      competitionId: parseInt(this.$route.params.id, 10) || undefined,
      roundId: parseInt(this.$route.query.roundId as string, 10) || undefined,
      groupId: parseInt(this.$route.params.groupId, 10) || undefined
    }
  }

  formatUnlimitedContestBloc(
    groupRankingData: APIGroupRankingData,
    index: number
  ): DtoUnlimitedContestRanking {
    return {
      bloc: groupRankingData?.boulders?.[index],
      points: groupRankingData?.bouldersPoints?.[index],
      rankings: ((groupRankingData?.rankings as unknown) as BoulderingUnlimitedContestRankingWithTops[])?.map(
        (ranking): BoulderingUnlimitedContestRanking => {
          return {
            ...ranking,
            tops: ranking.tops[index]
          }
        }
      )
    }
  }
}
</script>

<style scoped></style>
