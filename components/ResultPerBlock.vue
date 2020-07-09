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
      :step="1"
      :value="0"
      :label="
        userChoice.category ? `Catégorie (${userChoice.category})` : 'Catégorie'
      "
      :clickable="isStepsClickable"
    >
      <h1 class="title has-text-centered">
        Catégorie
      </h1>
      <p v-show="!rounds" class="notification is-warning has-text-centered">
        Veuillez d'abord créer des tours, pour pouvoir y entrer des résultats
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
      :step="2"
      :value="1"
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
      <p class="notification is-warning has-text-centered">
        Un round doit être préalablement créé avec le <b>genre</b> souhaité
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
      :step="3"
      :value="2"
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
        Pour qu'une phase puissent être noté, le status du round doit être
        <b>"EN COURS"</b>
      </p>
      <div class="choice">
        <template
          v-if="
            !checkIfTypeExist(type.QUALIFIER) &&
            !checkIfTypeExist(type.SEMI_FINAL) &&
            !checkIfTypeExist(type.FINAL)
          "
        >
          Aucune compétition n'est disponible pour être noté
        </template>
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
      :step="4"
      :value="3"
      :label="
        userChoice.nbGroup !== null
          ? `Groupe(${userChoice.nbGroup + 1})`
          : 'Groupe'
      "
      :clickable="isStepsClickable"
      :type="{ 'is-success': isProfileSuccess }"
    >
      <h1 class="title has-text-centered">
        Groupes
      </h1>
      <template>
        <div class="choice">
          <template v-for="(group, index) in groupsToDisplay">
            <b-button
              :key="group.id"
              size="is-large"
              type="is-primary"
              @click.native="updateGroupUserChoice(index)"
            >
              Groupe (n°{{ index + 1 }})
            </b-button>
          </template>
        </div>
      </template>
    </b-step-item>

    <b-step-item
      :step="5"
      :value="4"
      label="Résultat"
      :clickable="isStepsClickable"
      :type="{ 'is-success': isProfileSuccess }"
    >
      <h1 class="title has-text-centered">
        Résultat
      </h1>
      <template v-if="finalStepError">
        Aucun ID ne correspond aux critères demandées
      </template>
      <template v-else>
        <template v-if="finalGroupToDisplay">
          <ResultClimberComponent
            :group="finalGroupToDisplay"
            :round="roundtoDisplay"
          />
        </template>
      </template>
    </b-step-item>
  </b-steps>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  APIBoulderingGroupsClimbers,
  APIBoulderingRounds,
  APIBoulders,
  APICompetition,
  BoulderingLimitedRounds,
  CategoryName,
  Sex,
  TypeBouldering,
  TypeBoulderingRound
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import ResultClimberComponent from '~/components/ResultClimberComponent/ResultClimberComponent.vue'

@Component({
  components: { ResultClimberComponent }
})
export default class ResultPerBlock extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) rounds!: APIBoulderingRounds

  sex = Sex
  type = TypeBoulderingRound
  typeBouldering = TypeBouldering
  category = CategoryName

  availableCategory = new Set()
  groupsToDisplay: APIBoulderingGroupsClimbers[] = []
  finalGroupToDisplay: APIBoulderingGroupsClimbers | null = null

  idRoundToNote: number | null = null
  roundtoDisplay: BoulderingLimitedRounds | null = null
  finalStepError: boolean = false

  userChoice: {
    genre: string | null
    type: string | null
    category: string | null
    nbGroup: number | null
  } = {
    genre: null,
    type: null,
    category: null,
    nbGroup: null
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

  created() {
    this.competition.categories!.forEach((category) => {
      this.availableCategory.add(category.name)
    })
  }

  updateGenreUserChoice(genre: Sex) {
    try {
      // Check if a genre with his name exists
      if (!this.userChoice.category) return
      const data = this.rounds[this.userChoice.category][genre]
      if (!data) throw new Error(`La catégorie ${genre} n'existe pas`)
      this.userChoice.genre = genre
      this.stepMove(this.activeStep + 1)
    } catch (err) {
      console.log('err', err)
    }
  }

  checkIfGenreExist(genre: Sex): boolean {
    if (!this.userChoice.category) return false
    try {
      return !!this.rounds[this.userChoice.category][genre]
    } catch (err) {
      return false
    }
  }

  checkIfCategoryExist(category: CategoryName): boolean {
    try {
      return !!this.rounds[category]
    } catch (err) {
      return false
    }
  }

  checkIfTypeExist(type: TypeBoulderingRound): boolean {
    if (!this.userChoice.category || !this.userChoice.genre) return false

    try {
      const round = this.rounds[this.userChoice.category][
        this.userChoice.genre
      ][type]
      return round && round.state === 'ONGOING'
    } catch (err) {
      return false
    }
  }

  updateTypeUserChoice(type: TypeBoulderingRound) {
    this.userChoice.type = type
    if (!this.userChoice.category || !this.userChoice.genre) return
    this.roundtoDisplay = this.rounds[this.userChoice.category][
      this.userChoice.genre
    ][this.userChoice.type]
    this.idRoundToNote = this.roundtoDisplay?.id as number

    this.finalStepError = !this.idRoundToNote

    if (!this.finalStepError && this.competition.id) {
      this.stepMove(this.activeStep + 1)
      this.fetchGroups(this.idRoundToNote)
    }
  }

  updateCategoryUserChoice(category: CategoryName) {
    try {
      // Check if a category with his name exists
      const data = this.rounds[category]
      if (!data) throw new Error(`Category ${category} dont exist`)
      this.userChoice.category = category
      this.stepMove(this.activeStep + 1)
    } catch (err) {
      console.log('err', err)
    }
  }

  async fetchGroups(currentRoundId: number) {
    try {
      if (!this.competition.id) throw new Error('No competition ID')
      // Check if a category with his name exists
      const result = await ApiHelper.GetBoulderingGroups(
        this.competition.id,
        currentRoundId
      )
      console.log('result', result.data)
      this.groupsToDisplay = result.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async updateGroupUserChoice(nbGroup: number) {
    try {
      this.userChoice.nbGroup = nbGroup
      console.log('this.groupsToDisplay', this.groupsToDisplay)
      console.log('nbGroup', nbGroup)
      this.finalGroupToDisplay = this.groupsToDisplay[nbGroup]

      console.log(
        'this.rounds[this.userChoice.category][\n' +
          '        this.userChoice.genre\n' +
          '        ][this.userChoice.type]',
        this.rounds[this.userChoice.category!][this.userChoice.genre!][
          this.userChoice.type!
        ]
      )

      this.stepMove(this.activeStep + 1)
    } catch (err) {
      console.log('err', err)
    }
  }

  stepMove(stepNumber: number) {
    this.activeStep = stepNumber
  }

  isJudgeOfBloc(boulder: APIBoulders[]) {
    return boulder
  }
}
</script>

<style scoped>
.choice {
  display: flex !important;
  justify-content: space-evenly;
}
</style>
