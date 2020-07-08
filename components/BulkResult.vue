<template>
  <b-steps
    v-model="activeStep"
    :animated="isAnimated"
    :rounded="isRounded"
    :has-navigation="hasNavigation"
    :icon-prev="prevIcon"
    :icon-next="nextIcon"
    :label-position="labelPosition"
    :mobile-mode="mobileMode"
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
        <div v-for="(category, index) in availableCategory" :key="index">
          <b-button
            size="is-large"
            type="is-primary"
            :disabled="!rounds || !checkIfCategoryExist(category)"
            @click="updateCategoryUserChoice(category)"
          >
            {{ category }}
          </b-button>
        </div>
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
        Un round doit être créé avec le genre souhaité
      </p>
      <div class="choice">
        <b-button
          :disabled="!checkIfGenreExist(sex.Male)"
          size="is-large"
          type="is-primary"
          @click="updateGenreUserChoice(sex.Male)"
        >
          Homme
        </b-button>
        <b-button
          :disabled="!checkIfGenreExist(sex.Female)"
          size="is-large"
          type="is-primary"
          @click="updateGenreUserChoice(sex.Female)"
        >
          Femme
        </b-button>
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
        <b>"TERMINEE"</b>
      </p>
      <div class="choice">
        <b-button
          size="is-large"
          type="is-primary"
          :disabled="!checkIfTypeExist(type.QUALIFIER)"
          @click="updateTypeUserChoice(type.QUALIFIER)"
        >
          Qualification
        </b-button>
        <b-button
          size="is-large"
          type="is-primary"
          :disabled="!checkIfTypeExist(type.SEMI_FINAL)"
          @click="updateTypeUserChoice(type.SEMI_FINAL)"
        >
          Demi-final
        </b-button>
        <b-button
          size="is-large"
          type="is-primary"
          :disabled="!checkIfTypeExist(type.FINAL)"
          @click="updateTypeUserChoice(type.FINAL)"
        >
          Final
        </b-button>
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
        <div>
          <div v-if="groupsToDisplay.length > 0">
            <template v-for="(group, index) in groupsToDisplay">
              <div :key="index">
                <p class="subtitle">Groupe {{ group.id }}</p>
                firstBlocs = {{ firstBlocs }}
                <template v-if="firstBlocs">
                  <template v-for="bloc in firstBlocs">
                    <div :key="bloc.id">
                      <p class="subtitle">Bloc {{ bloc.id }}</p>
                      <div v-for="climber in group.climbers" :key="climber.id">
                        <b-collapse
                          aria-id="contentIdForA11y2"
                          class="panel"
                          animation="slide"
                        >
                          <div
                            slot="trigger"
                            class="panel-heading"
                            role="button"
                            aria-controls="contentIdForA11y2"
                          >
                            <strong>{{
                              `${climber.firstName} ${climber.lastName}`
                            }}</strong>
                          </div>
                          <div class="panel-block">
                            <div class="columns">
                              <div class="column is-flex">
                                <RoundRanking
                                  :key="climber.id"
                                  :data="firstRoundRanking"
                                />
                              </div>
                            </div>
                          </div>
                        </b-collapse>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-if="secondBlocs">
                  <template v-for="bloc in secondBlocs">
                    <div :key="bloc.id">
                      Bloc {{ bloc.id }}
                      <div v-for="climber in group.climbers" :key="climber.id">
                        <b-collapse
                          aria-id="contentIdForA11y2"
                          class="panel"
                          animation="slide"
                        >
                          <div
                            slot="trigger"
                            class="panel-heading"
                            role="button"
                            aria-controls="contentIdForA11y2"
                          >
                            <strong>{{
                              `${climber.firstName} ${climber.lastName}`
                            }}</strong>
                          </div>
                          <div class="panel-block">
                            <div class="columns">
                              <div class="column is-6">
                                <figure class="image is-128x128">
                                  <img
                                    src="https://bulma.io/images/placeholders/128x128.png"
                                  />
                                </figure>
                              </div>
                            </div>
                          </div>
                        </b-collapse>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </template>
          </div>
          <div v-else>
            Aucun participant à afficher
          </div>
        </div>
      </template>
    </b-step-item>
  </b-steps>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  APIBoulderingRounds,
  APIBoulders,
  APICompetition,
  APIRoundRanking,
  CategoryName,
  RawCountedRanking,
  RawStateRound,
  Sex,
  TypeBouldering,
  TypeBoulderingRound
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import RoundRanking from '~/components/RoundRanking.vue'
import boulderFilter from '~/utils/boulderFilter'

@Component({
  components: { RoundRanking }
})
export default class BulkResult extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) rounds!: APIBoulderingRounds

  sex = Sex
  type = TypeBoulderingRound
  typeBouldering = TypeBouldering
  category = CategoryName

  availableCategory = new Set()
  groupsToDisplay: any = []
  firstBlocs: APIBoulders[] | null = null
  secondBlocs: APIBoulders[] | null = null

  idRoundToNote: number | null = null
  finalStepError: boolean = false

  userChoice = {
    genre: '',
    type: '',
    category: ''
  }

  activeStep = 0
  isAnimated = true
  isRounded = true
  isStepsClickable = true

  hasNavigation = false
  isProfileSuccess = false

  prevIcon = 'chevron-left'
  nextIcon = 'chevron-right'
  labelPosition = 'bottom'
  mobileMode = 'minimalist'

  roundRanking: APIRoundRanking | null = null
  firstRoundRanking: Array<RawCountedRanking | null> = []
  secondRoundRanking: Array<RawCountedRanking | null> = []

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

  checkIfTypeExist(type: TypeBoulderingRound): any | undefined {
    if (!this.userChoice.category || !this.userChoice.genre) return

    return (
      this.rounds[this.userChoice.category][this.userChoice.genre][type] &&
      this.rounds[this.userChoice.category][this.userChoice.genre][type]
        .state === RawStateRound.ENDED
    )
  }

  updateTypeUserChoice(type: TypeBoulderingRound) {
    this.userChoice.type = type
    this.stepMove(3)
    this.idRoundToNote = this.rounds[this.userChoice.category][
      this.userChoice.genre
    ][this.userChoice.type]?.id as number

    this.finalStepError = !this.idRoundToNote

    if (!this.finalStepError && this.competition.id) {
      this.fetchGroups()
    }
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

  async fetchGroups() {
    const currentRound = this.rounds[this.userChoice.category][
      this.userChoice.genre
    ][this.userChoice.type]
    console.log('currentRound', currentRound)

    try {
      const ranking = await ApiHelper.GetBoulderRoundRankings(
        currentRound.competitionId,
        currentRound.id
      )
      if (ranking.data) {
        this.roundRanking = ranking.data
        this.firstRoundRanking = boulderFilter.getRound(this.roundRanking)
        this.secondRoundRanking = boulderFilter.getRound(
          this.roundRanking,
          true
        )
        console.log('this.firstRoundRanking', this.firstRoundRanking)
        console.log('this.secondRoundRanking', this.secondRoundRanking)
      }
    } catch (err) {
      // AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped></style>
