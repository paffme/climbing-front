<template>
  <section v-if="groupRankings">
    {{ groupRankings }}
    <p class="content">
      Nombre de points :
      <b-tag type="is-primary">
        {{ groupRankings.points }}
      </b-tag>
    </p>
    <b-table
      :data="groupRankings.rankings"
      :paginated="isPaginated"
      :per-page="perPage"
      :striped="isStriped"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-multiple="multiColumnSortingEnabled"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="ranking"
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
import { DtoUnlimitedContestRanking } from '~/definitions'

@Component
export default class CircuitGroupRanking extends Vue {
  @Prop(Object) groupRankings!: DtoUnlimitedContestRanking

  isPaginated = true
  isStriped = true
  isPaginationSimple = true
  paginationPosition = 'bottom'
  defaultSortDirection = 'asc'
  sortIcon = 'arrow-up'
  sortIconSize = 'is-small'
  currentPage = 1
  perPage = 5
  multiColumnSortingEnabled = true
}
</script>

<style scoped></style>
