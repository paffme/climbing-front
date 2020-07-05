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
    <div
      v-if="rankingData && Array.isArray(rankingData) && rankingData.length > 0"
    >
      <div class="topBtn">
        <b-select v-model="selected.genre" @input="onSelectGenre">
          <option :value="sex.Male">
            Homme
          </option>
          <option :value="sex.Female">
            Femme
          </option>
        </b-select>
        <b-button class="is-pulled-right">
          Télécharger le PDF
        </b-button>
      </div>
      <b-tabs>
        <template v-for="(category, index) in availableCategory">
          <b-tab-item :key="index" :label="category">
            <b-table
              :data="rankingData"
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

                <b-table-column
                  field="moreClassement"
                  label="Plus de classement"
                  sortable
                >
                  <nuxt-link
                    :to="{
                      name: 'competitions-id-rank-rounds',
                      query: {
                        cat: selected.category,
                        genre: selected.genre === 'h' ? 'h' : 'f'
                      }
                    }"
                  >
                    Voir plus de classement...
                  </nuxt-link>
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
          </b-tab-item>
        </template>
      </b-tabs>
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
  CategoryName,
  Sex
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import RankNotFound from '~/components/RankNotFound.vue'
import CompetitionsDetails from '~/components/CompetitionDetails.vue'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'

@Component({
  components: { RankNotFound, CompetitionsDetails, GoBackBtn }
})
export default class GeneralRanking extends Vue {
  @Prop(Number) totalCompetition!: number
  @Prop(Number) perPage!: number

  user!: APIBoulderingGroups
  competition: APICompetition | null = null

  sex = Sex
  rankingData: any | null = null

  selected: { genre: Sex; category: CategoryName } = {
    genre: Sex.Female,
    category: CategoryName.Benjamin
  }

  availableCategory: Array<string> = []

  async created() {
    const competitionId = this.$route.params.id
    if (!competitionId) return
    try {
      const ranking = await ApiHelper.GetCompetitionRankings(
        parseInt(competitionId, 10)
      )
      if (_.isEmpty(ranking.data)) {
        this.rankingData = []
        return
      }

      const competitions = await ApiHelper.GetCompetition(
        parseInt(competitionId, 10)
      )

      this.competition = competitions.data

      const categories: CategoryName[] = Object.keys(
        ranking.data
      ) as CategoryName[]
      this.availableCategory = categories
      this.selected.category = categories[0] as CategoryName
      this.rankingData =
        ranking.data[this.selected.category][this.selected.genre]
      console.log('rankingData', this.rankingData)
      console.log('this.$route.params.i', this.$route.params.id)
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
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
