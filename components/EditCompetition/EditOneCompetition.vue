<template>
  <div class="columns is-multiline">
    <div class="column is-8">
      <b-notification :closable="false">
        <template v-if="competition">
          <CompetitionForm
            :competition="competition"
            @emit="onEditCompetition"
          />
        </template>
      </b-notification>
    </div>

    <div class="column is-4">
      <div
        v-if="competition && competition.id && role"
        id="role-component"
        class="columns is-multiline"
      >
        <div v-if="role.organizer" class="roles column">
          <RolesComponent
            :role-name="role_name.Organisateur"
            :competition-id="competition.id"
          />
        </div>
        <div v-if="role.organizer" class="roles column">
          <RolesComponent
            :role-name="role_name.President"
            :competition-id="competition.id"
          />
        </div>
        <div v-if="role.organizer || role.juryPresident" class="roles column">
          <RolesComponent
            :role-name="role_name.ChefRouteSetter"
            :competition-id="competition.id"
          />
        </div>

        <div v-if="role.juryPresident" class="roles column">
          <RolesComponent
            :role-name="role_name.Juges"
            :competition-id="competition.id"
          />
        </div>
        <div v-if="role.juryPresident" class="roles column">
          <RolesComponent
            :role-name="role_name.DelegueTechnique"
            :competition-id="competition.id"
          />
        </div>

        <div v-if="role.chiefRouteSetter" class="roles column">
          <RolesComponent
            :role-name="role_name.RouteSetter"
            :competition-id="competition.id"
          />
        </div>
      </div>
    </div>

    <div class="column">
      <div
        v-if="role && role.juryPresident"
        id="boulder-settings"
        class="notification"
      >
        <BouldersSettingsComponent
          :competition-id="competition.id"
          :bouldering="bouldering"
          @loadBouldering="onLoadBouldering"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Vue } from 'vue-property-decorator'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import {
  APIBoulderingRounds,
  APICompetition,
  APIUserCompetitionRoles,
  Competition,
  CompetitionEdit,
  RoleName
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { authUser } from '~/utils/store-accessor'
import RolesComponent from '~/components/RolesComponent/RolesComponent.vue'
import BouldersSettingsComponent from '~/components/BouldersSettingsComponent/BouldersSettingsComponent.vue'
import CompetitionForm from '~/components/Form/CompetitionForm.vue'
import BtnDeleteCompetition from '~/components/Button/BtnDeleteCompetition.vue'
import { AxiosHelper } from '~/utils/axiosHelper'

async function fetchRole(
  competitionId?: number,
  userId?: number
): Promise<APIUserCompetitionRoles | null> {
  if (!competitionId || !userId) return null
  const response = await ApiHelper.GetRolesForCompetition(
    competitionId,
    userId as number
  )

  return response.data
}

async function fetchBouldering(
  competitionId: number
): Promise<APIBoulderingRounds> {
  const response = await ApiHelper.GetRound(competitionId)

  // @ts-ignore
  return _.isEmpty(response.data) ? null : response.data
}

async function fetchCompetition(idCompetition: number): Promise<Competition> {
  const result = await ApiHelper.GetCompetition(idCompetition)
  return {
    ...result.data,
    startDate: result.data?.startDate ? new Date(result.data?.startDate) : null,
    endDate: result.data?.endDate ? new Date(result.data.endDate) : null,
    welcomingDate: result.data?.welcomingDate
      ? new Date(result.data.welcomingDate)
      : null
  }
}

@Component({
  middleware: ['isAuth', 'setHeader'],
  components: {
    RolesComponent,
    CompetitionForm,
    BtnDeleteCompetition,
    GoBackBtn,
    BouldersSettingsComponent
  },
  validate({ params }: any) {
    const competitionId = parseInt(params.competitionId, 10)
    if (!competitionId) {
      throw new Error('ID de compétition non valide')
    }

    return true
  },
  async asyncData(ctx) {
    const idCompetition = parseInt(ctx.params.competitionId, 10)

    try {
      const competition = await fetchCompetition(idCompetition)

      const bouldering = await fetchBouldering(idCompetition)

      const role = await fetchRole(idCompetition, authUser.Credentials?.id)

      return {
        competition,
        role,
        bouldering
      }
    } catch (err) {
      if (err.response.status === 401) {
        ctx.redirect(498, '/login')
      } else {
        AxiosHelper.HandleAxiosError(this, err)
      }
    }
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
  @Prop(Object) bouldering!: APIBoulderingRounds

  async onLoadBouldering() {
    if (!this.competition?.id) return
    this.bouldering = await fetchBouldering(this.competition.id)
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
      this.$buefy.toast.open({
        type: 'is-danger',
        message: "Une erreur s'est produite"
      })
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
}
</script>

<style scoped>
.title {
  margin-left: 10px;
}
</style>
