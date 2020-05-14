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
              <a href="#" aria-current="page">Création</a>
            </li>
          </ul>
        </nav>
        <div class="tile is-ancestor">
          <div class="tile is-3 is-parent">
            <div class="tile is-child notification">
              <div id="title_notification">
                <b-icon icon="license" type="is-primary" />
                <span>Compétitions en cours </span>
              </div>
              <div id="content_notification">
                <ul>
                  <li>
                    <nuxt-link to="/competitions/3">
                      Champigny - Homme
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="tile is-9 is-parent">
            <div class="tile is-child notification">
              <CreateCompetitionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GoBackBtn from '~/components/GoBackBtn.vue'
import CreateCompetitionForm from '~/components/Form/CreateCompetitionForm.vue'

@Component({
  components: { GoBackBtn, CreateCompetitionForm },
  middleware: 'isAuth'
})
  export default class CompetitionCreate extends Vue {}
</script>

<style scoped>
.is-flex .title {
  margin-left: 10px;
}
.breadcrumb {
  margin: 10px 0;
}
#content_notification,
title_notification {
  margin: 5px 0;
}
</style>
