<template>
  <b-table
    ref="table"
    :data="data"
    paginated
    per-page="5"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  >
    <template slot-scope="props">
      <b-table-column field="id" label="ID" width="40" numeric>
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="Top" label="Top">
        <div class="field">
          <b-switch v-model="props.row.top" true-value="Yes" false-value="No">
            {{ props.row.top }}
          </b-switch>
        </div>
      </b-table-column>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FormNotes extends Vue {
  @Prop(Array) data: any = [
    {
      id: 0,
      firstName: 'Jessi',
      lastName: 'Foster',
      top: false,
      zone: false,
      try: false
    }
  ]

  results = [
    {
      climberId: 0,
      top: true,
      zone: true,
      try: true
    },
    {
      climberId: 1,
      top: true,
      zone: true,
      try: true
    },
    {
      climberId: 2,
      top: true,
      zone: true,
      try: true
    }
  ]
}
</script>

<style scoped></style>
