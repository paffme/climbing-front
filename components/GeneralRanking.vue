<template>
  <div>
    <h1 class="title">
      Classement général
    </h1>
    <h2 class="subtitle go_back">
      <GoBackBtn />
      Voir le détail des classements
    </h2>
    <div v-if="competition" class="content notification">
      <div class="columns">
        <div class="column is-12">
          <CompetitionsDetails :competition="competition" />
        </div>
      </div>
    </div>
    <div v-if="Rankings">
      <div class="topBtn">
        <BouldersSelectCategories
          :category-can-be-selected="availableCategory"
          :current-select="selected"
          @select="onSelect"
        />
        <div v-if="competition && competition.id" class="is-pulled-right">
          <BtnDownloadPdf
            type-competition="general"
            :competition-id="competition.id"
          ></BtnDownloadPdf>
          <b-button
            class="button"
            tag="nuxt-link"
            :to="{
              name: 'competitions-id-rank-rounds',
              query: {
                cat: selected.category,
                genre: selected.genre === 'male' ? 'h' : 'f'
              }
            }"
          >
            Voir plus de classement...
          </b-button>
        </div>
      </div>
      <div v-show="selectedRanking">
        <b-table
          :data="selectedRanking"
          :hovered="true"
          :bordered="true"
          :striped="true"
          hoverable
          :total="totalCompetition"
          :per-page="perPage"
          default-sort="id"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <template slot-scope="props">
            <b-table-column
              field="ranking"
              label="Classement"
              sortable
              width="40"
            >
              {{ props.row.ranking }}
            </b-table-column>

            <b-table-column field="name" label="Prénom" sortable>
              {{ props.row.climber.firstName }}
            </b-table-column>

            <b-table-column disabled field="lastName" label="Nom" sortable>
              {{ props.row.climber.lastName }}
            </b-table-column>

            <b-table-column field="Club" label="Club" sortable>
              {{ props.row.climber.club }}
            </b-table-column>
          </template>

          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon icon="emoticon-sad" size="is-large" />
                </p>
                <p>Aucune compétition trouvée</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>
    <div v-else>
      <RankNotFound />
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  APIBoulderingGroups,
  APICompetition,
  APIRankingResponse,
  CategoriesSelect,
  CategoryName,
  Ranking,
  Sex
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import RankNotFound from '~/components/RankNotFound.vue'
import CompetitionsDetails from '~/components/CompetitionDetails.vue'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import BoulderFilter from '~/utils/boulderFilter'
import BouldersSelectCategories from '~/components/BouldersSettingsComponent/BouldersSelectCategories.vue'
import BtnDownloadPdf from '~/components/Button/BtnDownloadPdf.vue'

@Component({
  components: {
    RankNotFound,
    CompetitionsDetails,
    GoBackBtn,
    BouldersSelectCategories,
    BtnDownloadPdf
  }
})
export default class GeneralRanking extends Vue {
  @Prop(Number) totalCompetition!: number
  @Prop(Number) perPage!: number

  user!: APIBoulderingGroups
  competition: APICompetition | null = null

  sex = Sex
  selectedRanking: Array<Ranking> = []
  Rankings: APIRankingResponse | null = null

  selected: { genre: Sex; category: CategoryName } = {
    genre: Sex.Female,
    category: CategoryName.Benjamin
  }

  availableCategory: Array<CategoriesSelect> = []

  async created() {
    const competitionId = this.$route.params.id
    if (!competitionId) return
    try {
      const ranking = await ApiHelper.GetCompetitionRankings(
        parseInt(competitionId, 10)
      )
      console.log('created', ranking)
      if (_.isEmpty(ranking.data)) {
        this.selectedRanking = []
        return
      }

      this.Rankings = ranking.data

      const competitions = await ApiHelper.GetCompetition(
        parseInt(competitionId, 10)
      )

      this.competition = competitions.data

      this.availableCategory = BoulderFilter.getGeneralRankings(ranking.data)

      if (
        this.availableCategory?.[0]?.category &&
        this.availableCategory?.[0]?.genre?.[0]
      ) {
        console.log('here')
        this.selected.genre = this.availableCategory[0].genre[0]
        this.selected.category = this.availableCategory[0].category
        this.selectedRanking = this.Rankings[this.selected.category][
          this.selected.genre
        ]
      }
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  onSelect(selected: { category: CategoryName; genre: Sex }) {
    console.log('fire', selected)
    this.selected = selected
  }

  onSelectGenre(genre: Sex) {
    this.selected.genre = genre
  }
}
</script>

<style scoped>
.topBtn {
  display: flex;
  justify-content: space-between;
}
</style>
