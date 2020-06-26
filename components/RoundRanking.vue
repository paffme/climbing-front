<template>
  <b-table :data="data" :bordered="true">
    <template slot-scope="props">
      <b-table-column field="ranking" label="Classement" sortable>
        {{ props.row.ranking }}
      </b-table-column>
      <b-table-column field="climber.firstName" label="Prénom" sortable>
        {{ props.row.climber.firstName }}
      </b-table-column>
      <b-table-column field="climber.lastName" label="Nom" sortable>
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
      <b-table-column
        field="topInTry"
        label="Top (nb essais)"
        numeric
        sortable
        :visible="typeRanking !== rawRankingType.UNLIMITED_CONTEST"
      >
        <form>
          <b-input
            v-model="props.row.topInTry"
            custom-class="custom-input"
            :disabled="!isBulk"
            :visible="typeRanking !== rawRankingType.UNLIMITED_CONTEST"
            @blur="editTopInTry(props)"
          >
            {{ props.row.topInTry }}
          </b-input>
        </form>
      </b-table-column>
      <b-table-column
        field="zone"
        label="Essais"
        sortable
        :visible="typeRanking !== rawRankingType.UNLIMITED_CONTEST"
      >
        <b-tag
          :type="props.row.zone ? 'is-success' : 'is-danger'"
          class="custom-btag"
          @click.native="editZone(props)"
        >
          {{ props.row.zone }}
        </b-tag>
      </b-table-column>
      <b-table-column
        field="zoneInTry"
        label="Zone (nb essais)"
        numeric
        sortable
        :visible="typeRanking !== rawRankingType.UNLIMITED_CONTEST"
      >
        <form>
          <b-input
            v-model="props.row.zoneInTry"
            custom-class="custom-input"
            :disabled="!isBulk"
            :visible="typeRanking !== rawRankingType.UNLIMITED_CONTEST"
            @blur="editZoneInTry(props)"
          >
            {{ props.row.zoneInTry }}
          </b-input>
        </form>
      </b-table-column>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  PropsBulkResult,
  RawCountedRanking,
  RawPropsBulkResult,
  RawRankingType
} from '~/definitions'

@Component
export default class RoundRanking extends Vue {
  @Prop(Array) data!: Array<RawCountedRanking>
  @Prop(Boolean) isBulk!: boolean
  @Prop(String) typeRanking!: RawRankingType
  @Prop(Number) boulderId!: number
  @Prop(Number) groupId!: number
  @Prop(Number) competitionId!: number
  @Prop(Number) roundId!: number

  rawRankingType = RawRankingType

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

<style>
.custom-input {
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
