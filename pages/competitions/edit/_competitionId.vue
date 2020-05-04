import { Sex } from "~/definitions";
<template>
  <div class="columns">
    <div class="column">
      <div class="custom_section page_header">
        <div class="is-flex">
          <GoBackBtn></GoBackBtn>
          <h1 class="title">Edition compétition</h1>
        </div>
      </div>

      <div class="custom_section page_content">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-primary"><nuxt-link to="/competitions">Compétitions</nuxt-link></li>
            <li class="is-active"><a href="#" aria-current="page" v-if="internal_competition">{{ internal_competition.name }}</a></li>
          </ul>
        </nav>

        <div class="columns">
          <div class="column">
            <div class="tiles">
              <div :closable="false">
                <UserGestion></UserGestion>
              </div>
              <b-notification :closable="false">
                <template v-if="internal_competition">
                  <EditCompetitionForm :internal_competition="internal_competition"></EditCompetitionForm>
                </template>
              </b-notification>

              <div class="column is-6">
                <b-notification :closable="false">
                  <template v-if="internal_competition">
                    <h3 class="subtitle">Ajout des rounds</h3>
                    <RoundCompetitionForm></RoundCompetitionForm>
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
  import { Component, Vue } from "vue-property-decorator";
  import UserGestion from "~/components/UserGestion.vue";
  import EditCompetitionForm from "~/components/Form/EditCompetitionForm.vue";
  import GoBackBtn from "~/components/GoBackBtn.vue";
  import { ApiCompetition } from "~/definitions";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
  import RoundCompetitionForm from "~/components/Form/RoundCompetitionForm.vue";

  @Component({
    middleware: 'isAuth',
    validate({ params, query }: any) {
      const competitionId = parseInt(params.competitionId, 10)
      if (!competitionId) throw new Error('ID de compétition non valide')

      const roleQuery = query.role
      if (!roleQuery) throw new Error("Aucun rôle n'est attribué")
      return true
    },
    components: { UserGestion, EditCompetitionForm, GoBackBtn, RoundCompetitionForm }
  })
  export default class EditOneCompetition extends Vue {
    idCompetition?: number
    internal_competition: ApiCompetition | null = null
    role: string | null = null

    async mounted() {
      this.idCompetition = parseInt(this.$route.params['competitionId'], 10) || undefined
      this.internal_competition = this.idCompetition ? await this.getCompetition(this.idCompetition) : null
    }

    async getCompetition(idCompetition: number): Promise<ApiCompetition | null> {
        const result = await ApiHelper.GetCompetition(idCompetition)
        return {
          ...result.data,
          startDate: result.data?.startDate ? new Date(result.data?.startDate) : null,
          endDate: result.data?.endDate ? new Date(result.data.endDate) : null,
          welcomingDate: result.data?.welcomingDate ? new Date(result.data.welcomingDate) : null,
        }
    }
  }
</script>

<style scoped>

</style>
