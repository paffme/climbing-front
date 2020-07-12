<template>
  <div class="columns">
    <div class="column">
      <div class="custom_section page_header">
        <div class="is-flex">
          <GoBackBtn />
          <h1 class="title">
            Créer une nouvelle compétition
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
              <a href="#" aria-current="page">
                Création
              </a>
            </li>
          </ul>
        </nav>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child notification">
              <CompetitionForm @emit="onCreateCompetition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GoBackBtn from '~/components/Button/GoBackBtn.vue'
import CompetitionForm from '~/components/Form/CompetitionForm.vue'
import { Competition } from '~/definitions'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component({
  components: { GoBackBtn, CompetitionForm },
  middleware: 'isAuth'
})
export default class CompetitionCreate extends Vue {
  async onCreateCompetition(competition: Competition) {
    try {
      const newCompetition = await ApiHelper.CreateCompetition(competition)
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Compétition créée'
      })
      this.$router.push(`/competitions/${newCompetition.data.id}`)
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped></style>
