<template>
  <div>
    <b-table
      :data="data"
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
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Prénom" sortable>
          {{ props.row.firstName }}
        </b-table-column>

        <b-table-column disabled field="lastName" label="Nom" sortable>
          {{ props.row.lastName }}
        </b-table-column>

        <b-table-column field="top" label="Top" sortable>
          <div class="field">
            <b-switch :value="props.row.top" type="is-info" />
          </div>
        </b-table-column>

        <b-table-column field="zone" label="Zone" sortable>
          <b-switch :value="props.row.zone" type="is-info" />
        </b-table-column>

        <b-table-column field="try" label="Try" sortable>
          <b-switch :value="props.row.try" type="is-info" />
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIBoulderingGroups } from '~/definitions'

@Component
export default class NotesBulk extends Vue {
  user!: APIBoulderingGroups
  data: any = [
    {
      firstName: 'Ruben',
      lastName: 'Faro',
      top: true,
      zone: true,
      try: false
    },
    {
      firstName: 'Yoni',
      lastName: 'Faro',
      top: false,
      zone: true,
      try: true
    }
  ]

  @Prop(Number) totalCompetition!: number
  @Prop(Number) perPage!: number
}
</script>

<style></style>
