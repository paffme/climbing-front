<template>
  <b-tabs type="is-boxed">
    <b-tab-item>
      <template slot="header">
        <b-icon icon="information-outline"></b-icon>
        <span> Configuration </span>
      </template>
      <template v-if="competition">
        <CompetitionForm :competition="competition" @emit="onEditCompetition" />
      </template>
    </b-tab-item>
    <b-tab-item v-if="!role.judge">
      <template slot="header">
        <b-icon icon="source-pull"></b-icon>
        <span> Roles </span>
      </template>
      <template>
        <div
          v-if="competition && competition.id && role"
          id="role-component"
          class="columns is-multiline"
        >
          <div v-if="role.organizer" class="roles column is-3">
            <RolesComponent
              :role-name="role_name.Organisateur"
              :competition-id="competition.id"
              @onSelect="loadRoles"
            />
          </div>
          <div v-if="role.organizer" class="roles column is-3">
            <RolesComponent
              :role-name="role_name.President"
              :competition-id="competition.id"
              @onSelect="loadRoles"
            />
          </div>
          <div
            v-if="role.organizer || role.juryPresident"
            class="roles column is-3"
          >
            <RolesComponent
              :role-name="role_name.ChefRouteSetter"
              :competition-id="competition.id"
              @onSelect="loadRoles"
            />
          </div>

          <div v-if="role.juryPresident" class="roles column is-3">
            <RolesComponent
              :role-name="role_name.Juges"
              :competition-id="competition.id"
              @onSelect="loadRoles"
            />
          </div>

          <div v-if="role.juryPresident" class="roles column is-3">
            <RolesComponent
              :role-name="role_name.DelegueTechnique"
              :competition-id="competition.id"
              @onSelect="loadRoles"
            />
          </div>

          <div v-if="role.chiefRouteSetter" class="roles column is-3">
            <RolesComponent
              :role-name="role_name.RouteSetter"
              :competition-id="competition.id"
              @onSelect="loadRoles"
            />
          </div>
        </div>
      </template>
    </b-tab-item>
    <b-tab-item v-if="role && role.juryPresident">
      <template slot="header">
        <b-icon icon="information-outline"></b-icon>
        <span>Rounds</span>
      </template>
      <template>
        <div id="boulder-settings">
          <BouldersSettingsComponent
            :competition-id="competition.id"
            :rounds="rounds"
            @loadBouldering="onLoadBouldering"
          />
        </div>
      </template>
    </b-tab-item>
    <b-tab-item v-if="role && role.judge">
      <template slot="header">
        <b-icon icon="information-outline"></b-icon>
        <span>Résultats</span>
      </template>
      <p>Pour quel compétition souhaitez vous entrer les résultats ?</p>
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
            userChoice.category
              ? `Catégorie (${userChoice.category})`
              : 'Catégorie'
          "
          :clickable="isStepsClickable"
        >
          <h1 class="title has-text-centered">
            Catégorie
          </h1>
          <div class="choice">
            <template v-for="(category, index) in availableCategory">
              <b-button
                :key="index"
                size="is-large"
                type="is-primary"
                @click="updateCategoryUserChoice(category)"
              >
                {{ category }}
              </b-button>
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
          <div class="choice">
            <b-button
              size="is-large"
              type="is-primary"
              @click="updateGenreUserChoice(sex.Male)"
            >
              Homme
            </b-button>
            <b-button
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
          label="Phase"
          :clickable="isStepsClickable"
          :type="{ 'is-success': isProfileSuccess }"
        >
          <h1 class="title has-text-centered">
            Phases
          </h1>
          <div class="choice">
            <b-button
              size="is-large"
              type="is-primary"
              @click="updateTypeUserChoice(type.QUALIFIER)"
            >
              Qualification
            </b-button>
            <b-button
              size="is-large"
              type="is-primary"
              @click="updateTypeUserChoice(type.SEMI_FINAL)"
            >
              Demi-final
            </b-button>
            <b-button
              size="is-large"
              type="is-primary"
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
            <template v-if="GroupsToDisplay.length > 0">
              <template v-for="(group, index) in GroupsToDisplay">
                <div :key="index">
                  <p class="subtitle">Groupe {{ group.id }}</p>
                  <template v-if="firstBlocs">
                    <template v-for="bloc in firstBlocs">
                      <div :key="bloc.id">
                        <p class="subtitle">Bloc {{ bloc.id }}</p>
                        <div
                          v-for="climber in group.climbers"
                          :key="climber.id"
                        >
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
                                  <figure class="image is-256x-256">
                                    <img
                                      src="https://bulma.io/images/placeholders/128x128.png"
                                    />
                                  </figure>
                                  <FormClimber
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
                        <div
                          v-for="climber in group.climbers"
                          :key="climber.id"
                        >
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
          </template>
        </b-step-item>
      </b-steps>
    </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Vue } from 'vue-property-decorator'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import {
  APIBoulderingGroupsClimbers,
  APIBoulderingRounds,
  APIBoulders,
  APICompetition,
  APIUserCompetitionRoles,
  BoulderingResult,
  BoulderingResultWithCredentials,
  CategoryName,
  Competition,
  CompetitionEdit,
  RoleName,
  Sex,
  TypeBoulderingRound
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import RolesComponent from '~/components/RolesComponent/RolesComponent.vue'
import BouldersSettingsComponent from '~/components/BouldersSettingsComponent/BouldersSettingsComponent.vue'
import CompetitionForm from '~/components/Form/CompetitionForm.vue'
import BtnDeleteCompetition from '~/components/Button/BtnDeleteCompetition.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import FormClimber from '~/components/Form/FormClimber.vue'

async function fetchBouldering(
  competitionId: number
): Promise<APIBoulderingRounds> {
  const response = await ApiHelper.GetRound(competitionId)

  // @ts-ignore
  return _.isEmpty(response.data) ? null : response.data
}

@Component({
  middleware: ['isAuth', 'setHeader'],
  components: {
    RolesComponent,
    CompetitionForm,
    BtnDeleteCompetition,
    GoBackBtn,
    BouldersSettingsComponent,
    FormClimber
  },
  validate({ params }: any) {
    const competitionId = parseInt(params.competitionId, 10)
    if (!competitionId) {
      throw new Error('ID de compétition non valide')
    }

    return true
  },
  data() {
    return {
      role_name: RoleName,
      idCompetition: undefined
    }
  }
})
export default class EditOneCompetition extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Object) rounds!: APIBoulderingRounds

  sex = Sex
  type = TypeBoulderingRound

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

  userChoice = {
    genre: '',
    type: '',
    category: ''
  }

  idRoundToNote: number | null = null
  finalStepError: boolean = false
  availableCategory = new Set()
  GroupsToDisplay: APIBoulderingGroupsClimbers[] = []
  firstBlocs: APIBoulders[] | null = null
  secondBlocs: APIBoulders[] | null = null

  created() {
    this.competition.categories!.forEach((category) => {
      this.availableCategory.add(category.name)
    })
  }

  async onLoadBouldering() {
    if (!this.competition?.id) return
    this.rounds = await fetchBouldering(this.competition.id)
  }

  async onEditCompetition(competition: Competition) {
    try {
      if (!this.competition?.id) throw new Error('No id has been found')
      await ApiHelper.UpdateCompetition(
        this.competition.id,
        this.editCompetitionDTO(competition)
      )
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Compétition modifiée'
      })
      this.$emit('onFetchCompetition')
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  editCompetitionDTO(competition: Competition): CompetitionEdit {
    return {
      name: competition.name || undefined,
      type: competition.type || undefined,
      startDate: competition.startDate || undefined,
      endDate: competition.endDate || undefined,
      address: competition.address || undefined,
      city: competition.city || undefined,
      postalCode: competition.postalCode || undefined,
      categories: competition.categories || undefined
    }
  }

  updateGenreUserChoice(genre: Sex) {
    this.userChoice.genre = genre
    this.stepMove(2)
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
    console.log('category', category)
    this.userChoice.category = category
    this.stepMove(1)
  }

  stepMove(stepNumber: number) {
    this.activeStep = stepNumber
  }

  loadRoles() {
    this.$emit('onFetchRole')
  }

  async fetchGroups(competitionId: number, roundId: number) {
    try {
      const currentUser = await ApiHelper.GetBoulderingGroups(
        competitionId,
        roundId
      )

      console.log('currentUser', currentUser)
      this.GroupsToDisplay = currentUser.data as any
      const firstBloc = await ApiHelper.GetBoulder(
        competitionId,
        roundId,
        currentUser.data[0].id
      )
      const secondBloc =
        currentUser.data && currentUser.data[1]
          ? await ApiHelper.GetBoulder(
              competitionId,
              roundId,
              currentUser.data[1].id
            )
          : undefined
      console.log('firstBloc', firstBloc)
      console.log('secondBloc', secondBloc)
      this.firstBlocs = firstBloc.data
      this.secondBlocs = secondBloc ? secondBloc.data : null
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
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
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped>
.title {
  margin-left: 10px;
}
._background {
  background-color: #fbfbfb;
}
section.b-tabs .tab-content {
  background-color: #fbfbfb;
}

.choice {
  display: flex !important;
  justify-content: space-evenly;
}
</style>
