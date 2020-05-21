<template>
  <div>
      <h1 class="subtitle">
        Gestion des rounds
      </h1>
      <div id="bouldering">
          <!-- Aucune qualification on affiche le template approprié -->
          <template v-if="!bouldering">
            <div class="columns">
              <div class="column is-one-thirds">
                <BouldersEmpty />
              </div>
            </div>
          </template>

          <!-- Dans le cas ou j'ai des qualifications -->
          <template v-else>
            <div class="select-input">
              <BouldersSelectCategories :category-can-be-selected="categoriesCanBeSelected" @select="onSelect" />
            </div>
            <div class="columns">
              <div class="column is-one-thirds">
                <template v-if="categoriesDisplayed.qualification">
                  <BouldersDisplay
                    v-if="categoriesDisplayed.qualification"
                    :qualification-round="typeBoulderingRound.QUALIFIER"
                    :round="categoriesDisplayed.qualification"
                    @delete="onDeleteRound"
                  />
                </template>
                <template v-else>
                  <BouldersDisplayEmpty />
                </template>
              </div>

              <div class="column is-one-thirds">
                <template v-if="categoriesDisplayed.semi">
                  <BouldersDisplay
                    v-if="categoriesDisplayed.semi"
                    :qualification-round="typeBoulderingRound.SEMI_FINAL"
                    :round="categoriesDisplayed.semi"
                    @delete="onDeleteRound"
                  />
                </template>
                <template v-else>
                  <BouldersDisplayEmpty />
                </template>
              </div>

              <div class="column is-one-thirds">
                <template v-if="categoriesDisplayed.final">
                  <BouldersDisplay
                    :qualification-round="typeBoulderingRound.FINAL"
                    :round="categoriesDisplayed.final"
                    @delete="onDeleteRound"
                  />
                </template>
                <template v-else>
                  <BouldersDisplayEmpty />
                </template>
              </div>
            </div>
          </template>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BouldersSelectCategories from '~/components/BouldersSettingsComponent/BouldersSelectCategories.vue'
import BouldersDisplay from '~/components/BouldersSettingsComponent/BouldersDisplay.vue'
import {
  APIBoulderingRounds,
  CategoriesSelect,
  CategoryDisplay, TempCategoriesSelect,
  TypeBoulderingRound,
  CategoryName
} from "~/definitions";
import BouldersEmpty from "~/components/BouldersSettingsComponent/BouldersEmpty.vue";
import BouldersDisplayEmpty from "~/components/BouldersSettingsComponent/BouldersDisplayEmpty.vue";

@Component({
  data() {
    return {
      typeBoulderingRound: TypeBoulderingRound
    }
  },
  components: { BouldersSelectCategories, BouldersDisplay, BouldersEmpty, BouldersDisplayEmpty }
})
export default class BouldersSettingsComponent extends Vue {
  @Prop(Object) bouldering!: APIBoulderingRounds

  categoriesCanBeSelected: CategoriesSelect[] | null = null

  categoriesDisplayed: CategoryDisplay = {
    qualification: null,
    semi: null,
    final: null
  }

  // .HOOKS
  created() {
    this.categoriesCanBeSelected = this.extractCategoryGenre(this.bouldering)
    this.updateDisplayedCategories({category: this.categoriesCanBeSelected[0].category, genre: this.categoriesCanBeSelected[0].genre[0]})
  }

  // .PERSO FUNCTION
  onSelect(categories: { category: string; genre: string }) {
    this.updateDisplayedCategories(categories)
  }

  onDeleteRound(roundId: number) {
    alert('Delete - roundId = ' + roundId)
  }

  updateDisplayedCategories(categories: {
    category: string
    genre: string
  }): void {
    if (!this.bouldering) {
      console.log('No boulder has been found')
      return
    }
    const genre = categories.genre === 'homme' ? 'male' : 'female'

    this.categoriesDisplayed.qualification = this.bouldering?.[categories.category][
      genre
    ]?.[TypeBoulderingRound.QUALIFIER] || undefined
    this.categoriesDisplayed.semi = this.bouldering[categories.category][genre][
      TypeBoulderingRound.SEMI_FINAL || undefined
    ]
    this.categoriesDisplayed.final = this.bouldering[categories.category][genre][
      TypeBoulderingRound.FINAL
    ]
  }

  extractCategoryGenre(data: APIBoulderingRounds): CategoriesSelect[] {
    if (!data) return []
    const final = []
    for (const [key, value] of Object.entries(data)) {
      const haveFemaleCategory =
        value.female && Object.keys(value.female).length !== 0
      const haveMaleCategory = value.male && Object.keys(value.male).length !== 0

      if (!haveFemaleCategory && !haveMaleCategory) continue

      let temp: TempCategoriesSelect = {
        category: undefined,
        genre: []
      }

      if (haveFemaleCategory) {
        temp.genre?.push('femme')
      }
      if (haveMaleCategory) {
        temp.genre?.push('homme')
      }

      temp.category = key as CategoryName
      final.push(temp as CategoriesSelect)
    }

    return final
  }
}
</script>

<style scoped>
  .select-input {
    margin-bottom: 15px;
  }
</style>
