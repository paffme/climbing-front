<template>
  <b-steps
    v-model="activeStep"
    :animated="isAnimated"
    :rounded="isRounded"
    :has-navigation="hasNavigation"
  >
    <b-step-item
      step="1"
      :label="
        userChoice.category
          ? `Catégorie (${wordingCategory(userChoice.category)})`
          : 'Catégorie'
      "
      :clickable="isStepsClickable"
    >
      <h1 class="title has-text-centered">
        Catégorie
      </h1>
      <p v-show="!rounds" class="notification is-warning has-text-centered">
        Veuillez d'abord créer des tours
      </p>
      <div class="choice">
        <template v-for="(category, index) in availableCategory">
          <template v-if="rounds && checkIfCategoryExist(category)">
            <b-button
              :key="index"
              size="is-large"
              type="is-primary"
              @click="updateCategoryUserChoice(category)"
            >
              {{ wordingCategory(category) }}
            </b-button>
          </template>
        </template>
      </div>
    </b-step-item>
    <b-step-item
      step="2"
      :label="
        userChoice.genre
          ? `Genre (${userChoice.genre === 'female' ? 'Femme' : 'Homme'})`
          : 'Genre'
      "
      :clickable="isStepsClickable"
    >
      <h1 class="title has-text-centered">
        Genre
      </h1>
      <p class="notification has-text-centered">
        Veuillez choisir le genre que vous souhaitez noter
      </p>
      <div class="choice">
        <template v-if="checkIfGenreExist(sex.Male)">
          <b-button
            size="is-large"
            type="is-primary"
            @click="updateGenreUserChoice(sex.Male)"
          >
            Homme
          </b-button>
        </template>
        <template v-if="checkIfGenreExist(sex.Female)">
          <b-button
            size="is-large"
            type="is-primary"
            @click="updateGenreUserChoice(sex.Female)"
          >
            Femme
          </b-button>
        </template>
      </div>
    </b-step-item>

    <b-step-item
      step="3"
      :label="
        userChoice.type ? `Tours (${typeBouldering[userChoice.type]})` : 'Tours'
      "
      :clickable="isStepsClickable"
      :type="{ 'is-success': isProfileSuccess }"
    >
      <h1 class="title has-text-centered">
        Tours
      </h1>
      <p class="notification is-warning has-text-centered">
        Pour qu'un tour soit disponible le status de cette doit être
        <b>"EN COURS"</b> ou <b>"TERMINEE"</b>
      </p>
      <div class="choice">
        <template v-if="checkIfTypeExist(type.QUALIFIER)">
          <b-button
            size="is-large"
            type="is-primary"
            @click="updateTypeUserChoice(type.QUALIFIER)"
          >
            Qualification
          </b-button>
        </template>
        <template v-if="checkIfTypeExist(type.SEMI_FINAL)">
          <b-button
            size="is-large"
            type="is-primary"
            @click="updateTypeUserChoice(type.SEMI_FINAL)"
          >
            Demi-final
          </b-button>
        </template>
        <template v-if="checkIfTypeExist(type.FINAL)">
          <b-button
            size="is-large"
            type="is-primary"
            @click="updateTypeUserChoice(type.FINAL)"
          >
            Final
          </b-button>
        </template>
      </div>
    </b-step-item>

    <b-step-item step="4" label="Résultat" :clickable="false">
      <h1 class="title has-text-centered">
        Résultat
      </h1>
      <template v-if="finalStepError || !selectedRound">
        Aucun ID ne correspond aux critères demandées
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </b-step-item>
  </b-steps>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  APIBoulderingRounds,
  APICompetition,
  CategoryName,
  QueryParamsRank,
  RawStateRound,
  Sex,
  TypeBouldering,
  TypeBoulderingRound
} from '~/definitions'
import WordingCategory from '~/utils/wordingCategory'

@Component
export default class RankingsStepComponent extends Vue {
  @Prop(Object) rounds!: APIBoulderingRounds
  @Prop(Object) competition!: APICompetition
  @Prop(Boolean) rating!: boolean

  sex = Sex
  type = TypeBoulderingRound
  typeBouldering = TypeBouldering
  category = CategoryName
  wordingCategory = WordingCategory
  selectedRound: any = null

  activeStep = 0
  isAnimated = true
  isRounded = true
  isStepsClickable = true

  hasNavigation = false
  isProfileSuccess = false

  userChoice = {
    genre: '',
    type: '',
    category: ''
  }

  finalStepError: boolean = false
  availableCategory = new Set()

  created() {
    this.setUserChoice(this.$route.query as QueryParamsRank)
    this.competition.categories!.forEach((category) => {
      this.availableCategory.add(category.name)
    })
  }

  setUserChoice(query: QueryParamsRank) {
    console.log('query', query)
    if (query.cat) {
      const cat: string = query.cat.charAt(0).toUpperCase() + query.cat.slice(1)
      // @ts-ignore
      const categoryExist = !!CategoryName[cat]

      if (!categoryExist) return
      this.updateCategoryUserChoice(query.cat as CategoryName)

      if (query.genre) {
        if ((query.genre as string) !== 'f' && (query.genre as string) !== 'h')
          return
        if (query.genre === 'f') this.updateGenreUserChoice(Sex.Female)
        if ((query.genre as string) === 'h')
          this.updateGenreUserChoice(Sex.Male)

        if (query.phase) {
          if (query.phase === 'qualif')
            this.updateTypeUserChoice(TypeBoulderingRound.QUALIFIER)
          if (query.phase === 'semi')
            this.updateTypeUserChoice(TypeBoulderingRound.SEMI_FINAL)
          if (query.phase === 'final')
            this.updateTypeUserChoice(TypeBoulderingRound.FINAL)
        }
      }
    }
  }

  updateGenreUserChoice(genre: Sex) {
    try {
      // Check if a genre with his name exists
      const data = this.rounds[this.userChoice.category][genre]
      if (!data) throw new Error(`La catégorie ${genre} n'existe pas`)
      this.userChoice.genre = genre
      this.stepMove(2)
    } catch (err) {
      console.log('err', err)
    }
  }

  checkIfGenreExist(genre: Sex): any | undefined {
    if (!this.userChoice.category) return

    return this.rounds[this.userChoice.category][genre]
  }

  checkIfCategoryExist(category: CategoryName): any | undefined {
    return this.rounds[category]
  }

  checkIfTypeExist(type: TypeBoulderingRound): boolean {
    if (!this.userChoice.category || !this.userChoice.genre) return false

    try {
      const roundExist = !!this.rounds[this.userChoice.category][
        this.userChoice.genre
      ][type]
      console.log('roundExist', roundExist)
      if (!roundExist) return false

      if (!this.rating) return true

      const canBeRating =
        this.rounds[this.userChoice.category][this.userChoice.genre][type]
          .state === RawStateRound.ONGOING

      console.log('canBeRating', canBeRating)

      return canBeRating
    } catch (err) {
      return false
    }
  }

  updateTypeUserChoice(type: TypeBoulderingRound) {
    this.userChoice.type = type
    this.selectedRound = this.rounds[this.userChoice.category][
      this.userChoice.genre
    ][type]
    this.$emit('onSelectRound', this.selectedRound)
    this.stepMove(3)
  }

  updateCategoryUserChoice(category: CategoryName) {
    try {
      // Check if a category with his name exists
      console.log('category', category)
      console.log('this.rounds', this.rounds)
      const data = this.rounds[category]
      if (!data) throw new Error(`Category ${category} dont exist`)
      this.userChoice.category = category
      this.stepMove(1)
    } catch (err) {
      console.log('err', err)
    }
  }

  stepMove(stepNumber: number) {
    this.activeStep = stepNumber
  }
}
</script>

<style scoped>
.choice {
  display: flex !important;
  justify-content: space-evenly;
}
</style>
