<template>
  <section>
    <b-table
      :data="roundRanking"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column
          field="ranking"
          label="Classement"
          width="40"
          sortable
          numeric
        >
          {{ props.row.ranking }}
        </b-table-column>

        <b-table-column field="climber.firstName" label="Prénom" sortable>
          {{ props.row.climber.firstName }}
        </b-table-column>

        <b-table-column field="climber.lastName" label="Nom" sortable>
          {{ props.row.climber.lastName }}
        </b-table-column>

        <b-table-column field="climber.club" label="Club" sortable>
          {{ props.row.climber.club }}
        </b-table-column>

        <b-table-column field="climber.nbTops" label="Nombre Tops" sortable>
          {{ props.row.nbTops }}
        </b-table-column>

        <b-table-column field="climber.points" label="Points" sortable>
          {{ props.row.points }}
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIRoundRanking } from '~/definitions'

@Component
export default class UnlimitedRoundRanking extends Vue {
  @Prop(Array) roundRanking!: APIRoundRanking[]

  isPaginated = true
  isPaginationSimple = false
  paginationPosition = 'bottom'
  defaultSortDirection = 'asc'
  sortIcon = 'arrow-up'
  sortIconSize = 'is-small'
  currentPage = 1
  perPage = 5
}
</script>

<style scoped></style>
