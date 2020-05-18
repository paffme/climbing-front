<template>
  <div>
    CompetitionID = {{ competitionId }}
    <BouldersSelectCategories :categories="fakeCategories" @select="onSelect" />
    <BouldersDisplay
      v-if="categoriesDisplayed.qualification"
      :qualification-round="typeBoulderingRound.QUALIFIER"
      :round-information="categoriesDisplayed.qualification"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BouldersSelectCategories from '~/components/BouldersSettingsComponent/BouldersSelectCategories.vue'
import BouldersDisplay from '~/components/BouldersSettingsComponent/BouldersDisplay.vue'
import { TypeBoulderingRound } from '~/definitions'

@Component({
  data() {
    return {
      typeBoulderingRound: TypeBoulderingRound
    }
  },
  components: { BouldersSelectCategories, BouldersDisplay }
})
export default class BouldersSettingsComponent extends Vue {
  @Prop(Number) competitionId!: number

  fakeCategories = [
    { genre: ['femme', 'homme'], category: 'minime' },
    { genre: ['femme'], category: 'poussin' }
  ]

  categoriesDisplayed = {
    qualification: null,
    semi: null,
    final: null
  }

  fakeData: any = {
    minime: {
      female: {
        QUALIFIER: {
          id: 0,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        },
        SEMI_FINAL: {
          id: 0,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        },
        FINAL: {
          id: 0,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        }
      },
      male: {
        QUALIFIER: {
          id: 0,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        },
        SEMI_FINAL: {
          id: 0,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        },
        FINAL: {
          id: 0,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        }
      }
    },
    poussin: {
      female: {
        QUALIFIER: {
          id: 1,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        },
        SEMI_FINAL: {
          id: 1,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        },
        FINAL: {
          id: 1,
          competitionId: 0,
          name: 0,
          quota: 0,
          type: 'CIRCUIT',
          sex: 'male',
          category: 'microbe',
          state: 'PENDING',
          maxTries: 0
        }
      }
    },
    senior: {},
    cadet: {
      female: {}
    }
  }

  onSelect(categories: { category: string; genre: string }) {
    this.updateDisplayedCategories(categories)
  }

  updateDisplayedCategories(categories: {
    category: string
    genre: string
  }): void {
    const genre = categories.genre === 'homme' ? 'male' : 'female'
    this.categoriesDisplayed.qualification = this.fakeData[categories.category][
      genre
    ][TypeBoulderingRound.QUALIFIER]
    this.categoriesDisplayed.semi = this.fakeData[categories.category][genre][
      TypeBoulderingRound.SEMI_FINAL
    ]
    this.categoriesDisplayed.final = this.fakeData[categories.category][genre][
      TypeBoulderingRound.FINAL
    ]
  }
}
</script>

<style scoped></style>
