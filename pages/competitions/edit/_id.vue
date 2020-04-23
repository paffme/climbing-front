<template>
  <div class="columns">
    <div class="column">
      <div class="page_header">
        <h1 class="title">Edition compétition</h1>
      </div>

      <div class="custom_section page_content">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-primary"><nuxt-link to="/competitions">Compétitions</nuxt-link></li>
            <li class="is-active"><a href="#" aria-current="page">Champigny</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";

  @Component
  export default class EditOneCompetition extends Vue {
  }
</script>

<style scoped>

</style>
