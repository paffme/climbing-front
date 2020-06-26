<template>
  <div class="columns">
    <div class="column">
      <div class="custom_section page_header">
        <div class="is-flex">
          <GoBackBtn />
          <h1 class="title">
            Edition compétition
          </h1>
        </div>
      </div>

      <div class="custom_section page_content">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-primary">
              <nuxt-link to="/competitions">
                Compétitions
              </nuxt-link>
            </li>
            <li class="is-primary">
              <nuxt-link
                v-if="competition"
                :to="`/competitions/${competition.id}`"
              >
                {{ competition.name }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <b-notification v-if="currentRoles">
          Vous êtes connecté en tant que
          <template v-for="role in currentRoles">
            {{ role.toLocaleLowerCase() }},
          </template>
        </b-notification>
        <nuxt-child
          :competition="competition"
          :role="role"
          :rounds="rounds"
          @onFetchRole="loadRoles"
          @onFetchRound="loadRounds"
          @onFetchCompetition="loadCompetition"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import {
  APIBoulderingRounds,
  APICompetition,
  APIUserCompetitionRoles,
  RoleName,
  Roles
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import AuthUser from '~/store/authUser'

async function fetchRole(
  competitionId?: number,
  userId?: number
): Promise<APIUserCompetitionRoles | null> {
  if (!competitionId || !userId) return null
  const response = await ApiHelper.GetRolesForCompetition(
    competitionId,
    userId as number
  )

  console.log()

  return response.data
}

async function fetchRounds(
  competitionId: number
): Promise<APIBoulderingRounds> {
  const response = await ApiHelper.GetRound(competitionId)

  // @ts-ignore
  return _.isEmpty(response.data) ? null : response.data
}

async function fetchCompetition(
  idCompetition: number
): Promise<APICompetition> {
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
  async asyncData(ctx) {
    const idCompetition = parseInt(ctx.params.competitionId, 10)

    try {
      const competition = await fetchCompetition(idCompetition)

      const rounds = await fetchRounds(idCompetition)

      const role = await fetchRole(
        idCompetition,
        // @ts-ignore
        AuthUser.getters?.['Credentials']().id
      )

      console.log('role', role)

      return {
        competition,
        role,
        rounds
      }
    } catch (err) {
      if (err.response.status === 401) {
        ctx.redirect(498, '/login')
      } else {
        AxiosHelper.HandleAxiosError(this, err)
      }
    }
  },
  components: { GoBackBtn }
})
export default class EditOneCompetitionPage extends Vue {
  competition: APICompetition | null = null
  role: APIUserCompetitionRoles | null = null
  rounds: APIBoulderingRounds | null = null
  currentRoles: RoleName[] | null = null

  created() {
    if (!this.role) {
      return
    }
    const hasRole = Object.keys(this.role!).find((roleName) => {
      // @ts-ignore
      return this.role![roleName]
    })

    if (!hasRole) {
      return this.$nuxt.error({
        statusCode: 404,
        message: 'Page introuvable (pas de role)'
      })
    }

    this.currentRoles = this.displayCurrentRole(this.role)
  }

  displayCurrentRole(role?: APIUserCompetitionRoles | null): RoleName[] | null {
    if (!role) return null
    const currentRole: RoleName[] = []

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    for (const [roleName, bool] of Object.entries(role)) {
      if (bool) {
        if (roleName === Roles.chiefRouteSetter)
          currentRole.push(RoleName.ChefRouteSetter)
        if (roleName === Roles.organizer)
          currentRole.push(RoleName.Organisateur)
        if (roleName === Roles.routeSetter)
          currentRole.push(RoleName.RouteSetter)
        if (roleName === Roles.juryPresident)
          currentRole.push(RoleName.President)
        if (roleName === Roles.judge) currentRole.push(RoleName.Juges)
        if (roleName === Roles.technicalDelegate)
          currentRole.push(RoleName.DelegueTechnique)
      }
    }
    if (currentRole.length === 0) return null

    return currentRole
  }

  async loadCompetition() {
    this.competition = await fetchCompetition(this.competition!.id as number)
  }

  async loadRounds() {
    this.rounds = await fetchRounds(this.competition!.id as number)
  }

  async loadRoles() {
    this.role = await fetchRole(
      this.competition!.id as number,
      // @ts-ignore
      AuthUser.getters?.['Credentials']().id
    )
  }
}
</script>

<style scoped>
.title {
  margin-left: 10px;
}
</style>
