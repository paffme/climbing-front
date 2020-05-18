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
              <div :closable="false">
                <UserGestion />
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
import { ApiCompetition } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import RoundCompetitionForm from '~/components/Form/RoundCompetitionForm.vue'
import { authUser } from '~/utils/store-accessor'

@Component({
  middleware: 'isAuth',
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
    UserGestion,
    EditCompetitionForm,
    GoBackBtn,
    RoundCompetitionForm
  }
})
export default class EditOneCompetition extends Vue {
  idCompetition?: number
  internalCompetition: ApiCompetition | null = null
  role: string | null = null

  async mounted() {
    this.idCompetition =
      parseInt(this.$route.params.competitionId, 10) || undefined
    this.internalCompetition = this.idCompetition
      ? await this.getCompetition(this.idCompetition)
      : null
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
