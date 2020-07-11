<template>
  <div>
    <b-table
      :data="internalCompetitions ? internalCompetitions : []"
      :hovered="true"
      paginated
      hoverable
      backend-pagination
      :total="totalCompetition"
      :per-page="perPage"
      default-sort="id"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :row-class="() => 'cursor'"
      @click="goTo"
      @page-change="pageChange"
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Nom" sortable>
          {{ props.row.name }}
        </b-table-column>

        <b-table-column disabled field="type" label="Type" sortable>
          {{ type[props.row.type] }}
        </b-table-column>

        <b-table-column field="startDate" label="Date début" sortable>
          <span class="tag is-success">
            {{ new Date(props.row.startDate).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="endDate" label="Date fin" sortable>
          <span class="tag is-danger">
            {{ new Date(props.row.endDate).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="createdAt" label="Date de création" sortable>
          <span class="tag is-success">
            {{ new Date(props.row.createdAt).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="city" label="Ville" sortable>
          {{ props.row.city }}
        </b-table-column>

        <b-table-column field="city" label="Plus d'infos">
          <nuxt-link :to="'competitions/' + props.row.id">
            <b-button icon-left="arrow-right-bold" type="is-primary" />
          </nuxt-link>
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Aucune compétition trouvée</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'
import { Competition, FRTypeCompetition } from '~/definitions'

@Component
export default class TableCompetition extends Vue {
  @PropSync('competitions', { type: Array })
  internalCompetitions!: Competition[]

  @Prop(Number) totalCompetition!: number
  @Prop(Number) perPage!: number
  columns = [
    {
      field: 'name',
      label: 'ID',
      width: '40'
    },
    {
      field: 'type',
      label: 'Type'
    },
    {
      field: 'startDate',
      label: 'Date début'
    },
    {
      field: 'createdAt',
      label: 'Date de création'
    },
    {
      field: 'endDate',
      label: 'Date fin'
    },
    {
      field: 'city',
      label: 'Ville'
    }
  ]

  type = FRTypeCompetition

  pageChange(params: number) {
    this.$emit('page-change', params)
  }

  goTo(row: any) {
    console.log('goTo', row)
    this.$router.push('/competitions/' + row.id)
  }
}
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
