<template>
  <div>
    <h1 class="subtitle">
      Gestion des tours
    </h1>
    <div id="bouldering">
      <!-- Aucune qualification on affiche le template approprié -->
      <template v-if="!rounds">
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
                :roles="roles"
                @refreshRound="$emit('loadBouldering')"
                @edit="onOpenModalEditRound"
                @delete="onDeleteRound"
              />
            </template>
            <template v-else>
              <BouldersDisplayEmpty
                @openModalRound="
                  onOpenModalRound(
                    categoriesDisplayed.qualification &&
                      categoriesDisplayed.qualification.category,
                    categoriesDisplayed.qualification &&
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
                :roles="roles"
                @refreshRound="$emit('loadBouldering')"
                @edit="onOpenModalEditRound"
                @delete="onDeleteRound"
              />
            </template>
            <template v-else>
              <BouldersDisplayEmpty
                @openModalRound="
                  onOpenModalRound(
                    categoriesDisplayed.qualification.category,
                    categoriesDisplayed.qualification.sex,
                    typeBoulderingRound.SEMI_FINAL
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
                :roles="roles"
                @refreshRound="$emit('loadBouldering')"
                @edit="onOpenModalEditRound"
                @delete="onDeleteRound"
              />
            </template>
            <template v-else>
              <BouldersDisplayEmpty
                @openModalRound="
                  onOpenModalRound(
                    categoriesDisplayed.qualification.category,
                    categoriesDisplayed.qualification.sex,
                    typeBoulderingRound.FINAL
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
  BoulderingRoundInputEdit,
  BoulderingRoundCreateInput,
  BoulderingRoundInput,
  RawRankingType,
  APIUserCompetitionRoles
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
  @Prop(Number) competitionId!: number
  @Prop(Object) rounds!: APIBoulderingRounds
  @Prop(Object) roles!: APIUserCompetitionRoles
  @Watch('rounds', { immediate: true, deep: true })
  onBoulderingChange(
    boulderingRounds: APIBoulderingRounds,
    oldBoulderingRounds: APIBoulderingRounds
  ) {
    // Use to display all category that already exist in this Rounds
    if (!boulderingRounds) return
    this.categoriesCanBeSelected = this.extractCategoryGenre(boulderingRounds)
    if (oldBoulderingRounds) {
      const diff = this.difference(boulderingRounds, oldBoulderingRounds)
      const extracted: CategoriesSelect[] = this.extractCategoryGenre(diff)

      // Il n'y a aucune différence de catégorie on prend la premiere catégorie
      if (extracted.length === 0) {
        this.updateDisplayedCategories({
          category: this.categoriesCanBeSelected[0].category,
          genre: this.categoriesCanBeSelected[0].genre[0]
        })
        return
      }
      // Il y a une différence de catégorie on prend la premiere catégorie des
      this.updateDisplayedCategories({
        category: extracted[0].category,
        genre: extracted[0].genre[0]
      })
      return
    }
    this.updateDisplayedCategories()
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
      const data = this.roundCreateDto(value)
      console.log('data', data)
      if (!data) throw new Error('Des champs sont manquants')
      await ApiHelper.AddRound(this.competitionId, data)
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Tour ajouté'
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

  onOpenModalRound(
    category?: CategoryName,
    genre?: Sex,
    type?: TypeBoulderingRound
  ) {
    // Permet de savoir si le paramètre "category" est celui qu'on a passer en param ou si égal à EventMouse
    const haveCategory = category && typeof category !== 'string'
    this.$buefy.modal.open({
      parent: this,
      props: {
        category: haveCategory ? undefined : category,
        genre: genre || undefined,
        type: type || undefined
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
    if (!this.rounds) {
      console.log('No boulder has been found')
      return
    }

    if (!categories)
      categories = {
        category: this.categoriesCanBeSelected![0].category,
        genre: this.categoriesCanBeSelected![0].genre[0]
      }
    // @ts-ignore
    const genre = categories.genre === 'homme' ? 'male' : 'female'

    this.categoriesDisplayed.qualification =
      this.rounds?.[categories.category][genre]?.[
        TypeBoulderingRound.QUALIFIER
      ] || undefined
    this.categoriesDisplayed.semi = this.rounds[categories.category][genre][
      TypeBoulderingRound.SEMI_FINAL || undefined
    ]
    this.categoriesDisplayed.final = this.rounds[categories.category][genre][
      TypeBoulderingRound.FINAL
    ]
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
      maxTries:
        round.rankingType !== RawRankingType.UNLIMITED_CONTEST
          ? round.maxTries
          : undefined,
      name: round.name,
      rankingType: round.rankingType,
      type: round.type
    }
  }

  roundCreateDto(
    round: BoulderingRoundInput
  ): BoulderingRoundCreateInput | undefined {
    console.log('round', round)
    if (
      !round.name ||
      !round.rankingType ||
      !round.category ||
      !round.boulders ||
      !round.groups ||
      !round.boulders ||
      !round.sex ||
      !round.type
    )
      return
    return {
      name: round.name,
      sex: round.sex,
      type: TypeBoulderingRound[round.type],
      rankingType: RawRankingType[round.rankingType],
      category: round.category,
      maxTries:
        round.rankingType === RawRankingType.LIMITED_CONTEST
          ? round.maxTries
          : undefined,
      boulders: round.boulders,
      groups: round.groups
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
