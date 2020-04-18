<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <div class="page_header">
            <h1 class="title">Compétitions FFME</h1>
            <b-button type="is-success"
                      icon-right="license"
                      tag="router-link"
                      :to="'/competitions/create'"
            >
              Créer une compétition
            </b-button>
          </div>

          <div class="custom_section page_stats">
            <div class="tile is-ancestor">
              <div class="tile is-4 is-parent">
                <div class="tile is-child notification is-primary">
                  <p class="title">24</p>
                  <p class="subtitle">Compétitions en cours</p>
                </div>
              </div>
              <div class="tile is-4 is-parent">
                <div class="tile is-child notification is-warning">
                  <p class="title">24</p>
                  <p class="subtitle">Compétitions en cours</p>
                </div>
              </div>

              <div class="tile is-4 is-parent">
                <div class="tile is-child notification is-danger">
                  <p class="title">24</p>
                  <p class="subtitle">Compétitions en cours</p>
                </div>
              </div>
            </div>
          </div>

          <div class="custom_section page_contents">
            <div class="is-flex">
              <span class="title">Compétition féminine</span>
              <span>Voir les autres compétitions</span>
            </div>
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <div class="tile is-child">
                  <Rank></Rank>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import Rank from "~/components/Rank.vue";

  @Component({
    components: { Rank }
  })
  export default class Competitions extends Vue {
  }
</script>

<style scoped>

</style>
