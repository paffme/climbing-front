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
            <li class="is-active"><a href="#" aria-current="page">Champigny</a></li>
          </ul>
        </nav>

        <div class="columns">
          <div class="column">
            <div class="tiles">
              <b-notification :closable="false">
                {{ internal_competition}}
                <CompetitionForm :test-compet="internal_competition"></CompetitionForm>
              </b-notification>
              <b-notification :closable="false">
                <UserGestion></UserGestion>
              </b-notification>
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
  import CompetitionForm from "~/components/Form/CompetitionForm.vue";
  import GoBackBtn from "~/components/GoBackBtn.vue";
  import { ApiCompetition, CategoryName, Competition, Sex, TypeCompetition } from "~/definitions";

  @Component({
    middleware: 'isAuth',
    components: { UserGestion, CompetitionForm, GoBackBtn }
  })
  export default class EditOneCompetition extends Vue {
    idCompetition?: number
    internal_competition: ApiCompetition | null = null

    async mounted() {
      this.idCompetition = parseInt(this.$route.params['competitionId'], 10) || undefined
      this.internal_competition = this.idCompetition ? await this.getCompetition(this.idCompetition) : null
    }

    async getCompetition(idCompetition: number): Promise<ApiCompetition> {
      console.log('idCompetition', idCompetition)
      return Promise.resolve(
        {
          id: 2,
          name: 'Chalais Savoyard',
          type: TypeCompetition.Bouldering,
          startDate: new Date('2020-04-25T14:50:54.009Z'),
          createdAt: new Date('2020-04-25T14:50:54.009Z'),
          updatedAt: new Date('2020-04-25T14:50:54.009Z'),
          endDate: new Date('2020-04-25T14:50:54.009Z'),
          address: '19 Avenue Villejuif',
          city: 'Choisy',
          postalCode: '94320',
          categories: [
            {sex: Sex.Female, name: CategoryName.Benjamin}
          ]
        }
      )
    }
  }
</script>

<style scoped>

</style>
