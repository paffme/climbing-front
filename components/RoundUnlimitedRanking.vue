<template>
  <b-table :data="data" :bordered="true">
    <template slot-scope="props">
      <b-table-column field="ranking" label="Classement" sortable>
        {{ props.row.ranking }}
      </b-table-column>
      <b-table-column
        field="climber.firstName"
        label="Prénom"
        sortable
        searchable
      >
        {{ props.row.climber.firstName }}
      </b-table-column>
      <b-table-column field="climber.lastName" label="Nom" sortable searchable>
        {{ props.row.climber.lastName }}
      </b-table-column>

      <b-table-column field="top" label="Top" sortable>
        <b-tag
          :type="props.row.top ? 'is-success' : 'is-danger'"
          class="custom-btag"
          @click.native="editTop(props)"
        >
          {{ props.row.top }}
        </b-tag>
      </b-table-column>

      <b-table-column field="nbTop" label="Nombre de top" numeric sortable>
        <form>
          <b-input
            v-model="props.row.nbTop"
            :custom-class="'custom-input'"
            :disabled="!isBulk"
            @blur="editTopInTry(props)"
          >
            {{ props.row.nbTop }}
          </b-input>
        </form>
      </b-table-column>

      <b-table-column field="point" label="Point" sortable>
        <b-tag
          :type="props.row.point ? 'is-success' : 'is-danger'"
          class="custom-btag"
          @click.native="editZone(props)"
        >
          {{ props.row.point }}
        </b-tag>
      </b-table-column>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  PropsBulkResult,
  RawBoulderingUnlimitedContestRankingWithType,
  RawPropsBulkResult,
  RawRankingType
} from '~/definitions'

@Component
export default class RoundUnlimitedRanking extends Vue {
  @Prop(Array) data!: Array<RawBoulderingUnlimitedContestRankingWithType>
  @Prop(Boolean) isBulk!: boolean
  @Prop(String) typeRanking!: RawRankingType
  @Prop(Number) boulderId!: number
  @Prop(Number) groupId!: number
  @Prop(Number) competitionId!: number
  @Prop(Number) roundId!: number

  editTop(propsBulkResult: PropsBulkResult) {
    if (!this.isBulk) return
    propsBulkResult.row.top = !propsBulkResult.row.top
    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  editTopInTry(propsBulkResult: PropsBulkResult) {
    if (!this.isBulk) return
    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  editZone(propsBulkResult: PropsBulkResult) {
    if (!this.isBulk) return
    propsBulkResult.row.zone = !propsBulkResult.row.zone
    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  editZoneInTry(propsBulkResult: PropsBulkResult) {
    if (!this.isBulk) return
    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  DTOBulkResult(props: RawPropsBulkResult): PropsBulkResult {
    return {
      ...props,
      groupId: this.groupId,
      roundId: this.roundId,
      boulderId: this.boulderId,
      competitionId: this.competitionId
    }
  }
}
</script>

<style scoped>
input.input.custom-input {
  box-shadow: none !important;
  border: none !important;
}

.custom-input:focus {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1) !important;
  border: 1px solid transparent !important;
}

.custom-input[disabled] {
  background-color: inherit;
  color: black;
  cursor: text;
}

.custom-btag {
  cursor: pointer;
}
</style>
