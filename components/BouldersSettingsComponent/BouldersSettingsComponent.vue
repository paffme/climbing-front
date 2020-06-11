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
            <BouldersEmpty @createRound="onOpenModalRound" />
          </div>
        </div>
      </template>

      <!-- Dans le cas ou j'ai des qualifications -->
      <template v-else>
        <div class="is-flex top-action">
          <div class="select-input">
            <BouldersSelectCategories
              :category-can-be-selected="categoriesCanBeSelected"
              @select="onSelect"
            />
          </div>
          <div class="create-round">
            <b-button @click="onOpenModalRound">
              Créer round
            </b-button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-thirds">
            <template v-if="categoriesDisplayed.qualification">
              <BouldersDisplay
                :qualification-round="typeBoulderingRound.QUALIFIER"
                :round="categoriesDisplayed.qualification"
                @edit="onOpenModalEditRound"
                @delete="onDeleteRound"
              />
            </template>
            <template v-else>
              <BouldersDisplayEmpty
                @openModalRound="
                  onOpenModalRound(
                    categoriesDisplayed.qualification.category,
                    categoriesDisplayed.qualification.sex
                  )
                "
              />
            </template>
          </div>

          <div class="column is-one-thirds">
            <template v-if="categoriesDisplayed.semi">
              <BouldersDisplay
                :qualification-round="typeBoulderingRound.SEMI_FINAL"
                :round="categoriesDisplayed.semi"
                @edit="onOpenModalEditRound"
                @delete="onDeleteRound"
              />
            </template>
            <template v-else>
              <BouldersDisplayEmpty
                @openModalRound="
                  onOpenModalRound(
                    categoriesDisplayed.qualification.category,
                    categoriesDisplayed.qualification.sex
                  )
                "
              />
            </template>
          </div>

          <div class="column is-one-thirds">
            <template v-if="categoriesDisplayed.final">
              <BouldersDisplay
                :qualification-round="typeBoulderingRound.FINAL"
                :round="categoriesDisplayed.final"
                @edit="onOpenModalEditRound"
                @delete="onDeleteRound"
              />
            </template>
            <template v-else>
              <BouldersDisplayEmpty
                @openModalRound="
                  onOpenModalRound(
                    categoriesDisplayed.qualification.category,
                    categoriesDisplayed.qualification.sex
                  )
                "
              />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import BouldersSelectCategories from '~/components/BouldersSettingsComponent/BouldersSelectCategories.vue'
import BouldersDisplay from '~/components/BouldersSettingsComponent/BouldersDisplay.vue'
import {
  APIBoulderingRounds,
  CategoriesSelect,
  CategoryDisplay,
  TempCategoriesSelect,
  TypeBoulderingRound,
  CategoryName,
  Sex,
  CurrentCategory,
  BoulderingRoundInputEdit
} from '~/definitions'
import BouldersEmpty from '~/components/BouldersSettingsComponent/BouldersEmpty.vue'
import BouldersDisplayEmpty from '~/components/BouldersSettingsComponent/BouldersDisplayEmpty.vue'
import BouldersCreateRound from '~/components/BouldersSettingsComponent/BouldersCreateRound.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import BouldersEditRound from '~/components/BouldersSettingsComponent/BouldersEditRound.vue'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  data() {
    return {
      typeBoulderingRound: TypeBoulderingRound
    }
  },
  components: {
    BouldersSelectCategories,
    BouldersDisplay,
    BouldersEmpty,
    BouldersDisplayEmpty
  }
})
export default class BouldersSettingsComponent extends Vue {
  @Prop(Object) bouldering!: APIBoulderingRounds
  @Prop(Number) competitionId!: number
  @Watch('bouldering', { immediate: true, deep: true })
  onBoulderingChange(
    boulderingRounds: APIBoulderingRounds,
    oldBoulderingRounds: APIBoulderingRounds
  ) {
    if (!boulderingRounds) return
    this.categoriesCanBeSelected = this.extractCategoryGenre(boulderingRounds)
    let diff: APIBoulderingRounds | undefined
    if (oldBoulderingRounds) {
      diff = this.difference(boulderingRounds, oldBoulderingRounds)
      const extracted: CategoriesSelect[] = this.extractCategoryGenre(diff)

      // Il n'y plus aucune catégorie
      if (extracted.length === 0) {
        this.updateDisplayedCategories({
          category: this.categoriesCanBeSelected[0].category,
          genre: this.categoriesCanBeSelected[0].genre[0]
        })
        return
      }
      this.updateDisplayedCategories({
        category: extracted[0].category,
        genre: extracted[0].genre[0]
      })
      return
    }
    this.updateDisplayedCategories({
      category: this.categoriesCanBeSelected[0].category,
      genre: this.categoriesCanBeSelected[0].genre[0]
    })
  }

  // .DATA
  categoriesCanBeSelected: CategoriesSelect[] | null = null
  currentCategoryDisplay: CurrentCategory | null = null
  categoriesDisplayed: CategoryDisplay = {
    qualification: null,
    semi: null,
    final: null
  }
  // ./DATA

  // .HOOKS
  // ./HOOKS

  // .PERSO FUNCTION
  async onCreateRound(value: any) {
    try {
      delete value.quota
      await ApiHelper.AddRound(this.competitionId, value)
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Round ajouté'
      })
      this.$emit('loadBouldering')
    } catch (error) {
      AxiosHelper.HandleAxiosError(this, error)
    }
  }

  async onEditRound(competitionId: number, round: BoulderingRoundInputEdit) {
    const roundDto = this.roundEditDto(round)
    try {
      await ApiHelper.EditRound(competitionId, round.id, roundDto)
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Round modifié'
      })
      this.$emit('loadBouldering')
    } catch (error) {
      AxiosHelper.HandleAxiosError(this, error)
    }
  }

  async deleteRound(roundId: number) {
    try {
      await ApiHelper.DeleteRound(this.competitionId, roundId)
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Round supprimé'
      })
      this.$emit('loadBouldering')
    } catch (error) {
      AxiosHelper.HandleAxiosError(this, error)
    }
  }

  onSelect(categories: CurrentCategory) {
    this.updateDisplayedCategories(categories)
  }

  onOpenModalRound(category?: CategoryName, genre?: Sex) {
    // Permet de savoir si le paramètre "category" est celui qu'on a passer en param ou si égal à EventMouse
    const haveCategory = typeof category !== 'string'
    this.$buefy.modal.open({
      parent: this,
      props: {
        category: haveCategory ? undefined : category,
        genre: genre || undefined
      },
      component: BouldersCreateRound,
      events: {
        createRound: this.onCreateRound
      },
      hasModalCard: true
    })
  }

  onDeleteRound(roundId: number) {
    this.$buefy.dialog.confirm({
      type: 'is-danger',
      message: 'Voulez-vous vraiment supprimer ce round ?',
      onConfirm: async () => {
        this.deleteRound(roundId)
      }
    })
  }

  onOpenModalEditRound(round: BoulderingRoundInputEdit) {
    this.$buefy.modal.open({
      parent: this,
      props: {
        round
      },
      component: BouldersEditRound,
      events: {
        editRound: (roundEdited: BoulderingRoundInputEdit) => {
          this.onEditRound(this.competitionId, roundEdited)
        }
      },
      hasModalCard: true
    })
  }

  updateDisplayedCategories(categories?: CurrentCategory): void {
    if (!this.bouldering) {
      console.log('No boulder has been found')
      return
    }

    if (!categories) categories = this.currentCategoryDisplay as CurrentCategory
    // @ts-ignore
    const genre = categories.genre === 'homme' ? 'male' : 'female'

    this.categoriesDisplayed.qualification =
      this.bouldering?.[categories.category][genre]?.[
        TypeBoulderingRound.QUALIFIER
      ] || undefined
    this.categoriesDisplayed.semi = this.bouldering[categories.category][genre][
      TypeBoulderingRound.SEMI_FINAL || undefined
    ]
    this.categoriesDisplayed.final = this.bouldering[categories.category][
      genre
    ][TypeBoulderingRound.FINAL]
  }

  extractCategoryGenre(data: APIBoulderingRounds): CategoriesSelect[] {
    if (!data) return []
    const final = []
    for (const [key, value] of Object.entries(data)) {
      const haveFemaleCategory =
        value.female && Object.keys(value.female).length !== 0
      const haveMaleCategory =
        value.male && Object.keys(value.male).length !== 0

      if (!haveFemaleCategory && !haveMaleCategory) continue

      const temp: TempCategoriesSelect = {
        category: undefined,
        genre: []
      }

      if (haveFemaleCategory) {
        temp.genre.push('femme' as Sex)
      }
      if (haveMaleCategory) {
        temp.genre.push('homme' as Sex)
      }

      temp.category = key as CategoryName
      final.push(temp as CategoriesSelect)
    }

    return final
  }

  difference(object: any, base: any): APIBoulderingRounds {
    function changes(object: any, base: any): APIBoulderingRounds {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, base[key])) {
          // @ts-ignore
          result[key] =
            _.isObject(value) && _.isObject(base[key])
              ? changes(value, base[key])
              : value
        }
      })
    }
    return changes(object, base)
  }

  roundEditDto(round: BoulderingRoundInputEdit): any {
    return {
      maxTries: round.maxTries,
      name: round.name,
      rankingType: round.rankingType,
      type: round.type
    }
  }
}
</script>

<style scoped>
.top-action {
  justify-content: space-between;
}
.select-input {
  margin-bottom: 15px;
}
</style>
