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
        Veuillez d'abord créer des rounds, pour pouvoir y entrer des résultats
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
        Un round doit être créé avec le genre souhaité
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
        Pour qu'une phase puissent être noté, le status du round doit être
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
        <div>
          <template v-if="groupsToDisplay.length > 0">
            <template v-for="(group, index) in groupsToDisplay">
              <div :key="index">
                <p class="subtitle">Groupe {{ group.id }}</p>
                <template v-if="firstGroup">
                  <template v-for="bloc in firstGroup">
                    <div :key="bloc.id">
                      <p class="subtitle">Bloc {{ bloc.id }}</p>
                      <div v-for="climber in group.climbers" :key="climber.id">
                        <AddResultComponent
                          :key="climber.id"
                          :bloc-id="bloc.id"
                          :group-id="group.id"
                          :round-id="idRoundToNote"
                          :competition-id="competition.id"
                          :climber="climber"
                          @onSendNote="sendNote"
                        />
                      </div>
                    </div>
                  </template>
                </template>
                <template v-if="secondGroup">
                  <template v-for="bloc in secondGroup">
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
          </template>
          <template v-else>
            Aucun participant à afficher
          </template>
        </div>
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
  BoulderingResult,
  BoulderingResultWithCredentials,
  CategoryName,
  Sex,
  TypeBouldering,
  TypeBoulderingRound
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import AddResultComponent from '~/components/AddResultComponent.vue'

@Component({
  components: { AddResultComponent }
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
  firstGroup: APIBoulders[] | null = null
  secondGroup: APIBoulders[] | null = null

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

  created() {
    console.log('rounds', this.rounds)
    this.competition.categories!.forEach((category) => {
      this.availableCategory.add(category.name)
    })
  }

  async sendNote(note: BoulderingResultWithCredentials) {
    console.log('sendNote', note)

    const result: BoulderingResult = {
      climberId: note.climberId,
      top: note.top,
      zone: note.zone,
      try: note.try
    }
    try {
      await ApiHelper.AddBoulderingResult(
        result,
        this.competition.id!,
        this.idRoundToNote!,
        note.groupId,
        note.blocId
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Note ajoutée'
      })
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
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

    const round = this.rounds[this.userChoice.category][this.userChoice.genre][
      type
    ]
    return round && round.state === 'ONGOING'
  }

  updateTypeUserChoice(type: TypeBoulderingRound) {
    this.userChoice.type = type
    this.stepMove(3)
    this.idRoundToNote = this.rounds[this.userChoice.category][
      this.userChoice.genre
    ][this.userChoice.type]?.id as number

    this.finalStepError = !this.idRoundToNote

    if (!this.finalStepError && this.competition.id) {
      this.fetchGroups(this.competition.id, this.idRoundToNote)
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

  async fetchGroups(competitionId: number, roundId: number) {
    console.log('fetchGroups', competitionId)
    console.log('fetchGroups - roundId', roundId)
    try {
      const groups = await ApiHelper.GetBoulderingGroups(competitionId, roundId)

      console.log('groups', groups)
      this.groupsToDisplay = groups.data as any
      const firstBloc =
        groups.data[0].boulders ||
        (await ApiHelper.GetBoulder(competitionId, roundId, groups.data[0].id))
      const secondBloc =
        groups.data && groups.data[1]
          ? groups.data[1].boulders ||
            (await ApiHelper.GetBoulder(
              competitionId,
              roundId,
              groups.data[1].id
            ))
          : null

      console.log('firstBloc', firstBloc)
      console.log('secondBloc', secondBloc)
      this.firstGroup = this.isJudgeOfBloc(firstBloc)
      this.secondGroup = secondBloc || null
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
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
