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
            :custom-class="'custom-input'"
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
        label="Zone"
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
        label="Zone (nb zone)"
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
  RawCountedRankingWithType,
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

    const row: RawCountedRankingWithType = propsBulkResult.row as RawCountedRankingWithType

    row.top = !row.top

    if (!row.top) row.topInTry = 0

    if (row.top && row.topInTry === 0) row.topInTry = 1

    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  editTopInTry(propsBulkResult: PropsBulkResult) {
    if (!this.isBulk) return

    const row: RawCountedRankingWithType = propsBulkResult.row as RawCountedRankingWithType

    if (row.topInTry && row.topInTry > 0 && !row.top) row.top = true

    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  editZone(propsBulkResult: PropsBulkResult) {
    if (!this.isBulk) return

    const row: RawCountedRankingWithType = propsBulkResult.row as RawCountedRankingWithType

    row.zone = !row.zone

    if (!row.zone) row.zoneInTry = 0

    if (row.zone && row.zoneInTry === 0) row.zoneInTry = 1

    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  editZoneInTry(propsBulkResult: PropsBulkResult) {
    if (!this.isBulk) return

    if (!this.validate(propsBulkResult)) return

    this.$emit('bulkEdition', this.DTOBulkResult(propsBulkResult))
  }

  validate(propsBulkResult: PropsBulkResult): boolean {
    try {
      const row: RawCountedRankingWithType = propsBulkResult.row as RawCountedRankingWithType
      console.log('propsBulkResult', propsBulkResult)

      if (!row.topInTry || !row.zoneInTry)
        throw new Error('Essai (zone) ou essai (top) ne peut pas être vide')

      if (row.zoneInTry > row.topInTry)
        throw new Error(
          "Le nombre d'essai (zone) ne peut pas être supérieur au nombre d'essai (top)"
        )

      return true
    } catch (err) {
      this.$buefy.notification.open({
        type: 'is-info',
        message: err.message
      })
      return false
    }
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
