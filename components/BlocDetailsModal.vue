<template>
  <div class="card">
    <div id="blocs">
      <template v-for="(zone, index) in _zones">
        <b-tag
          :key="index"
          :class="[_tops[index] ? 'is-success' : 'is-danger', 'cursor']"
          @click.native="selectBloc(index)"
        >
          Bloc {{ index }}
        </b-tag>
      </template>
    </div>
    <div id="apercu">
      <template v-if="selectedBloc.top !== null">
        <ul>
          <li>
            Top :
            <template v-if="selectedBloc.top">
              <b-tag type="is-success">
                OK
              </b-tag>
            </template>
            <template v-else>
              <b-tag type="is-danger">
                KO
              </b-tag>
            </template>
          </li>

          <li>
            Zone :
            <template v-if="selectedBloc.zone">
              <b-tag type="is-success">
                OK
              </b-tag>
            </template>
            <template v-else>
              <b-tag type="is-danger">
                KO
              </b-tag>
            </template>
          </li>

          <li>
            Zone (nb) :
            <template>
              <b-tag type="is-info">
                {{ selectedBloc.zoneInTry }}
              </b-tag>
            </template>
          </li>

          <li>
            Top (nb) :
            <template>
              <b-tag type="is-info">
                {{ selectedBloc.topInTry }}
              </b-tag>
            </template>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'
import { CircuitBloc } from '~/definitions'

@Component
export default class BlocDetailsModal extends Vue {
  @PropSync('tops', { type: Array }) _tops!: boolean[]
  @PropSync('zones', { type: Array }) _zones!: boolean[]
  @PropSync('zoneInTries', { type: Array }) _zoneInTries!: number[]
  @PropSync('topInTries', { type: Array }) _topInTries!: number[]

  selectedBloc: CircuitBloc = {
    top: null,
    zone: null,
    zoneInTry: null,
    topInTry: null
  }

  selectBloc(index: number) {
    console.log('this._tops[index]', this._tops[index])
    console.log('this._zones[index]', this._zones[index])
    console.log('this._zoneInTries[index]', this._zoneInTries[index])
    console.log('this._topInTries[index]', this._topInTries[index])
    this.selectedBloc.top = this._tops[index]
    this.selectedBloc.zone = this._zones[index]
    this.selectedBloc.zoneInTry = this._zoneInTries[index]
    this.selectedBloc.topInTry = this._topInTries[index]
  }
}
</script>

<style scoped></style>
