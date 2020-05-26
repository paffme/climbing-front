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
            <li class="is-active">
              <a v-if="internalCompetition" href="#" aria-current="page">{{
                internalCompetition.name
              }}</a>
            </li>
          </ul>
        </nav>

        <div class="columns">
          <div class="column">
            <div class="tiles">
              <div v-if="idCompetition && role" class="columns">
                <div v-if="role.organizer" class="roles column is-4">
                  <RolesComponent
                    :role-name="role_name.Organisateur"
                    :competition-id="idCompetition"
                  />
                </div>
                <div v-if="role.organizer" class="roles column is-4">
                  <RolesComponent
                    :role-name="role_name.President"
                    :competition-id="idCompetition"
                  />
                </div>
                <div v-if="role.organizer" class="roles column is-4">
                  <RolesComponent
                    :role-name="role_name.ChefRouteSetter"
                    :competition-id="idCompetition"
                  />
                </div>

                <div v-if="role.juryPresident" class="roles column is-4">
                  <RolesComponent
                    :role-name="role_name.Juges"
                    :competition-id="idCompetition"
                  />
                </div>
                <div v-if="role.juryPresident" class="roles column is-4">
                  <RolesComponent
                    :role-name="role_name.DelegueTechnique"
                    :competition-id="idCompetition"
                  />
                </div>
                <div v-if="role.juryPresident" class="roles column is-4">
                  <RolesComponent
                    :role-name="role_name.ChefRouteSetter"
                    :competition-id="idCompetition"
                  />
                </div>

                <div v-if="role.chiefRouteSetter" class="roles column is-4">
                  <RolesComponent
                    :role-name="role_name.RouteSetter"
                    :competition-id="idCompetition"
                  />
                </div>
              </div>
              <b-notification :closable="false">
                <template v-if="internalCompetition">
                  <EditCompetitionForm
                    :internal_competition="internalCompetition"
                  />
                </template>
              </b-notification>

              <div class="column is-6">
                <b-notification :closable="false">
                  <template v-if="internalCompetition">
                    <h3 class="subtitle">
                      Ajout des rounds
                    </h3>
                    <RoundCompetitionForm />
                  </template>
                </b-notification>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserGestion from '~/components/UserGestion.vue'
import EditCompetitionForm from '~/components/Form/EditCompetitionForm.vue'
import GoBackBtn from '~/components/GoBackBtn.vue'
import {
  ApiCompetition,
  APIUserCompetitionRoles,
  RoleName
} from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import RoundCompetitionForm from '~/components/Form/RoundCompetitionForm.vue'
import { authUser } from '~/utils/store-accessor'
import RolesComponent from '~/components/RolesComponent/RolesComponent.vue'

@Component({
  middleware: ['isAuth', 'setHeader'],
  validate({ params }: any) {
    const competitionId = parseInt(params.competitionId, 10)
    if (!competitionId) {
      throw new Error('ID de compétition non valide')
    }

    return true
  },
  async fetch() {
    const userId = authUser.Credentials?.id
    if (!userId) {
      throw new Error('Vous devez être connecté')
    }
  },
  components: {
    RolesComponent,
    UserGestion,
    EditCompetitionForm,
    GoBackBtn,
    RoundCompetitionForm
  },
  data() {
    return {
      role_name: RoleName
    }
  }
})
export default class EditOneCompetition extends Vue {
  idCompetition?: number
  internalCompetition: ApiCompetition | null = null
  role: APIUserCompetitionRoles | null = null

  async mounted() {
    this.idCompetition =
      parseInt(this.$route.params.competitionId, 10) || undefined

    if (!this.idCompetition) throw new Error('ID de la compétition manquante')
    this.internalCompetition = await this.getCompetition(this.idCompetition)

    const response = await ApiHelper.GetRolesForCompetition(
      this.idCompetition,
      authUser.Credentials?.id as number
    )

    this.role = response.data

    console.log('this.roles', this.role)
  }

  async getCompetition(idCompetition: number): Promise<ApiCompetition | null> {
    const result = await ApiHelper.GetCompetition(idCompetition)
    return {
      ...result.data,
      startDate: result.data?.startDate
        ? new Date(result.data?.startDate)
        : null,
      endDate: result.data?.endDate ? new Date(result.data.endDate) : null,
      welcomingDate: result.data?.welcomingDate
        ? new Date(result.data.welcomingDate)
        : null
    }
  }
}
</script>

<style scoped></style>
