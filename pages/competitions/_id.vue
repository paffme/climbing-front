<template>
  <div class="columns">
    <div class="column">
      <div class="page_header">
        <GoBackBtn></GoBackBtn>
        <h1 class="title">Compétitions champigny</h1>
        <b-button type="is-info"
                  icon-right="tools"
                  tag="router-link"
                  :to="'/competitions/edit/1'"
        >
          Editer cette compétition
        </b-button>
      </div>

      <div class="custom_section page_content">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-primary"><nuxt-link to="/competitions">Compétitions</nuxt-link></li>
            <li class="is-active"><a href="#" aria-current="page">Champigny</a></li>
          </ul>
        </nav>

        <div class="columns">
          <div class="column is-6">
            COmpétitions de Chagny
          </div>
          <div class="column is-6">
            <GmapMap
              :center="{lat:10, lng:10}"
              :zoom="7"
              map-type-id="terrain"
              style="width: 100%; height: 100vh"
            >
            </GmapMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import GoBackBtn from "~/components/GoBackBtn.vue";

  @Component({
    components: { GoBackBtn }
  })
  export default class OneCompetition extends Vue {
  }
</script>

<style scoped>

</style>
