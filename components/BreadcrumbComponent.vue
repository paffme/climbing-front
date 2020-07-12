<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>
        <nuxt-link to="/">
          Dashboard
        </nuxt-link>
      </li>
      <li class="is-primary">
        <nuxt-link to="/competitions">
          Toutes les compétitions
        </nuxt-link>
      </li>
      <li class="is-active">
        <a href="#" aria-current="page">
          {{ currentPage }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BreadcrumbComponent extends Vue {
  @Prop(String) currentPage!: string
}
</script>

<style scoped></style>
