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
        <nuxt-child
          :competition="competition"
          :role="role"
          :bouldering="bouldering"
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
  Roles
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'
import { authUser } from '~/utils/store-accessor'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'

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
  components: { GoBackBtn }
})
export default class EditOneCompetitionPage extends Vue {
  competition: APICompetition | null = null
  role: APIUserCompetitionRoles | null = null
  bouldering: APIBoulderingRounds | null = null

  displayCurrentRole(role?: APIUserCompetitionRoles | null): string | null {
    if (!role) return null
    let currentRole: Roles | null = null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    for (const [roleName, bool] of Object.entries(role)) {
      if (bool) {
        if (roleName === Roles.chiefRouteSetter)
          currentRole = Roles.chiefRouteSetter
        if (roleName === Roles.organizer) currentRole = Roles.organizer
        if (roleName === Roles.routeSetter) currentRole = Roles.routeSetter
        if (roleName === Roles.juryPresident) currentRole = Roles.juryPresident
        if (roleName === Roles.judge) currentRole = Roles.judge
        if (roleName === Roles.chiefRouteSetter)
          currentRole = Roles.chiefRouteSetter
        if (roleName === Roles.technicalDelegate)
          currentRole = Roles.technicalDelegate
      }
    }
    return currentRole
  }

  async loadCompetition() {
    this.competition = await fetchCompetition(this.competition!.id as number)
  }
}
</script>

<style scoped>
.title {
  margin-left: 10px;
}
</style>
