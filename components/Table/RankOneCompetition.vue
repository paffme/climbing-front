<template>
  <b-table :data="data">
    <template slot-scope="props">
      <b-table-column field="ranking" label="Rang" sortable>
        {{ props.row.ranking }}
      </b-table-column>

      <b-table-column
        field="climber.firstName"
        label="Prénom"
        sortable
        searchable
      >
        {{ props.row.climber.firstName }}
      </b-table-column>

      <b-table-column field="climber.lastName" label="Nom" sortable searchable>
        {{ props.row.climber.lastName }}
      </b-table-column>

      <b-table-column field="climber.club" label="Club" sortable searchable>
        {{ props.row.climber.club }}
      </b-table-column>
    </template>
    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large" />
          </p>
          <p>Aucun participant.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'
import { CategoryName, Sex } from '~/definitions'

@Component
export default class RankOneCompetition extends Vue {
  @PropSync('sex', { type: String }) selectedSex!: Sex
  @PropSync('categories', { type: String }) selectedCategory!: CategoryName
  @Prop(Number) competitionId!: number

  @Watch('selectedCategory', { immediate: true })
  onSelectCategory(category: CategoryName) {
    this.refreshRankData(this.selectedSex, category)
  }

  @Watch('selectedSex', { immediate: true })
  onSelectSex(sex: Sex) {
    this.refreshRankData(sex, this.selectedCategory)
  }

  data: any = []
  datas: any = {
    benjamin: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'Thomas',
            lastName: 'Belinger',
            club: 'string'
          }
        },
        {
          ranking: 1,
          climber: {
            id: 0,
            firstName: 'Thomas',
            lastName: 'Belinger',
            club: 'string'
          }
        },
        {
          ranking: 2,
          climber: {
            id: 0,
            firstName: 'Thomas',
            lastName: 'Belinger',
            club: 'string'
          }
        },
        {
          ranking: 3,
          climber: {
            id: 0,
            firstName: 'Thomas',
            lastName: 'Belinger',
            club: 'string'
          }
        },
        {
          ranking: 4,
          climber: {
            id: 0,
            firstName: 'Thomas',
            lastName: 'Belinger',
            club: 'string'
          }
        },
        {
          ranking: 5,
          climber: {
            id: 0,
            firstName: 'Thomas',
            lastName: 'Belinger',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 1,
          climber: {
            id: 1,
            firstName: 'Isabella',
            lastName: 'Von Carstein',
            club: 'string'
          }
        },
        {
          ranking: 2,
          climber: {
            id: 2,
            firstName: 'Maribelle',
            lastName: 'Vondelrub',
            club: 'string'
          }
        }
      ]
    },
    cadet: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ]
    },
    junior: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ]
    },
    microbe: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ]
    },
    minime: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ]
    },
    poussin: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'Matthieu',
            lastName: 'Vondelrub',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ]
    },
    senior: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ]
    },
    veteran: {
      male: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ],
      female: [
        {
          ranking: 0,
          climber: {
            id: 0,
            firstName: 'string',
            lastName: 'string',
            club: 'string'
          }
        }
      ]
    }
  }

  async created() {
    try {
      /* const rankings = await ApiHelper.GetCompetitionRankings(
        this.competitionId
      )
      this.datas = rankings.data */
    } catch (err) {
      this.datas = []
    }
  }

  refreshRankData(sex: Sex, category: CategoryName) {
    console.log('refreshData - sex :', sex)
    console.log('refreshData - category :', category)
    console.log('refreshData - this.datas :', this.datas)
    this.data = this.datas?.[category]?.[sex]
    console.log('this.data', this.data)
  }
}
</script>

<style scoped></style>
