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
        userChoice.category ? `Catégorie (${userChoice.category})` : 'Catégorie'
      "
      :clickable="isStepsClickable"
    >
      <h1 class="title has-text-centered">
        Catégorie
      </h1>
      <p v-show="!rounds" class="notification is-warning has-text-centered">
        Veuillez d'abord créer des rounds
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
              {{ category }}
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
        userChoice.type ? `Phase (${typeBouldering[userChoice.type]})` : 'Phase'
      "
      :clickable="isStepsClickable"
      :type="{ 'is-success': isProfileSuccess }"
    >
      <h1 class="title has-text-centered">
        Phases
      </h1>
      <p class="notification is-warning has-text-centered">
        Pour qu'une phase soit active, le status du round doit être
        <b>"EN COURS"</b>
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

    <b-step-item
      step="4"
      label="Résultat"
      :clickable="false"
      :type="{ 'is-success': isProfileSuccess }"
    >
      <h1 class="title has-text-centered">
        Résultat
      </h1>
      <template v-if="finalStepError">
        Aucun ID ne correspond aux critères demandées
      </template>
      <template v-else>
        <BoulderRankingPerBlocs
          :is-bulk="isBulk"
          :rounds="rounds"
          :user-choice="userChoice"
          @bulkEdition="onBulkEdition"
        />
      </template>
    </b-step-item>
  </b-steps>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  APIBoulderingRounds,
  APICompetition,
  CategoryName,
  PropsBulkResult,
  RawStateRound,
  Sex,
  TypeBouldering,
  TypeBoulderingRound
} from '~/definitions'
import BoulderRankingPerBlocs from '~/components/BoulderRankingPerBlocs.vue'

@Component({
  components: { BoulderRankingPerBlocs }
})
export default class BulkResultStepComponent extends Vue {
  @Prop(Object) rounds!: APIBoulderingRounds
  @Prop(Object) competition!: APICompetition
  @Prop(Boolean) isBulk!: boolean
  sex = Sex
  type = TypeBoulderingRound
  typeBouldering = TypeBouldering
  category = CategoryName

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
    this.competition.categories!.forEach((category) => {
      this.availableCategory.add(category.name)
    })
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

    const roundExist = !!this.rounds[this.userChoice.category][
      this.userChoice.genre
    ][type]
    if (!roundExist) return false

    const canBeRating =
      this.rounds[this.userChoice.category][this.userChoice.genre][type]
        .state === RawStateRound.ONGOING
    if (!canBeRating) return false

    return true
  }

  updateTypeUserChoice(type: TypeBoulderingRound) {
    this.userChoice.type = type
    this.stepMove(3)
  }

  updateCategoryUserChoice(category: CategoryName) {
    try {
      // Check if a category with his name exists
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

  onBulkEdition(props: PropsBulkResult) {
    console.log('StepComponent', props)
    this.$emit('bulkEdition', props)
  }
}
</script>

<style scoped>
.choice {
  display: flex !important;
  justify-content: space-evenly;
}
</style>
