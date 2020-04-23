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
                <CompetitionForm></CompetitionForm>
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
  import { Vue, Component } from "vue-property-decorator";
  import UserGestion from "~/components/UserGestion.vue";
  import CompetitionForm from "~/components/Form/CompetitionForm.vue";
  import GoBackBtn from "~/components/GoBackBtn.vue";

  @Component({
    components: { UserGestion, CompetitionForm, GoBackBtn }
  })
  export default class EditOneCompetition extends Vue {
  }
</script>

<style scoped>

</style>
