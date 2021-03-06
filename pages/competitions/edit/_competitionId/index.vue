<template>
  <b-tabs type="is-boxed">
    <template v-if="role">
      <b-tab-item>
        <template slot="header">
          <b-icon icon="information-outline"> </b-icon>
          <span>
            Configuration
          </span>
        </template>
        <template v-if="competition">
          <CompetitionForm
            :competition="competition"
            @emit="onEditCompetition"
          />
        </template>
      </b-tab-item>

      <b-tab-item v-if="!role.judge || role.juryPresident">
        <template slot="header">
          <b-icon icon="source-pull"> </b-icon>
          <span>
            Roles
          </span>
        </template>
        <template>
          <div
            v-if="competition && competition.id && role"
            id="role-component"
            class="columns is-multiline"
          >
            <Roles
              :role="role"
              :competition-id="competition.id"
              @onFetchRole="loadRoles"
            />
          </div>
        </template>
      </b-tab-item>

      <b-tab-item
        v-if="
          role.juryPresident ||
          role.judge ||
          role.chiefRouteSetter ||
          role.routeSetter
        "
      >
        <template slot="header">
          <b-icon icon="information-outline"> </b-icon>
          <span>
            Tours
          </span>
        </template>
        <template>
          <div id="boulder-settings">
            <BouldersSettingsComponent
              :roles="role"
              :competition-id="competition.id"
              :rounds="rounds"
              @loadBouldering="onLoadBouldering"
            />
          </div>
        </template>
      </b-tab-item>

      <b-tab-item v-if="role.judge || role.juryPresident">
        <template slot="header">
          <b-icon icon="information-outline"> </b-icon>
          <span>
            Ajout de résultat
          </span>
        </template>
        <p class="content notification has-text-centered">
          Veuillez selectionner la compétition que vous souhaitez juger
        </p>
        <AddResultPerBlockStepComponent
          :roles="role"
          :competition="competition"
          :rounds="rounds"
        />
      </b-tab-item>

      <b-tab-item v-if="role.juryPresident">
        <template slot="header">
          <b-icon icon="information-outline"> </b-icon>
          <span>
            Vue globale des résultats
          </span>
        </template>
        <BulkResultStepComponent
          :is-bulk="isBulk"
          :competition="competition"
          :rounds="rounds"
        />
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import {
  APIBoulderingRounds,
  APICompetition,
  APIUserCompetitionRoles,
  Competition,
  CompetitionEdit
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import RolesComponent from '~/components/RolesComponent/RolesComponent.vue'
import BouldersSettingsComponent from '~/components/BouldersSettingsComponent/BouldersSettingsComponent.vue'
import CompetitionForm from '~/components/Form/CompetitionForm.vue'
import BtnDeleteCompetition from '~/components/Button/BtnDeleteCompetition.vue'
import { AxiosHelper } from '~/utils/axiosHelper'
import AddResultPerBlockStepComponent from '~/components/ResultPerBlock.vue'
import BulkResultStepComponent from '~/components/BulkResultStepComponent.vue'
import Roles from '~/components/RolesComponent/Roles.vue'

@Component({
  middleware: ['isAuth', 'setHeader'],
  components: {
    RolesComponent,
    CompetitionForm,
    BtnDeleteCompetition,
    GoBackBtn,
    BouldersSettingsComponent,
    AddResultPerBlockStepComponent,
    BulkResultStepComponent,
    Roles
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
      idCompetition: undefined
    }
  }
})
export default class EditOneCompetition extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Object) rounds!: APIBoulderingRounds

  isBulk: boolean = true

  async onLoadBouldering() {
    if (!this.competition?.id) return
    this.$emit('onFetchRound')
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

  loadRoles() {
    this.$emit('onFetchRole')
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
