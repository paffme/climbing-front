<template>
  <div>
    <b-table
      :data="internal_competitions ? internal_competitions : []"
      :hovered="true"
      default-sort="id"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <template slot-scope="props">
        <b-table-column field="name" label="Nom" sortable>
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="type" label="Type" sortable>
          {{ props.row.type }}
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

        <b-table-column field="city" label="Ville" sortable>
          {{ props.row.city }}
        </b-table-column>

        <b-table-column field="city" label="Apercu">
          <nuxt-link :to="'competitions/' + props.row.id">
            <b-button icon-left="arrow-right-bold" type="is-primary"></b-button>
          </nuxt-link>
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
            </p>
            <p>Aucune compétition trouvée</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, PropSync } from "vue-property-decorator";
  import { Competition } from "~/definitions";

  @Component
  export default class Rank extends Vue {
    @PropSync('competitions', {type: Array}) internal_competitions?: Competition
    columns = [
      {
        field: "name",
        label: "ID",
        width: "40"
      },
      {
        field: "type",
        label: "Type"
      },
      {
        field: "startDate",
        label: "Date début"
      },
      {
        field: "endDate",
        label: "Date fin"
      },
      {
        field: "city",
        label: "Ville"
      }
    ];
  }
</script>

<style scoped>

</style>
