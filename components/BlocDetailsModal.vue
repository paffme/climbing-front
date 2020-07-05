<template>
  <div class="card">
    <div id="blocs" class="card-content">
      <div class="notification">
        <span class="media">
          <span class="media-left">
            <b-icon icon="information"> </b-icon>
          </span>
          <span class="media-content">
            Selectionner le bloc dont vous souhaitez voir les résultats
          </span>
        </span>
      </div>
      <template v-for="(zone, index) in _zones">
        <b-tag
          :key="index"
          :class="['is-info', 'pointer', 'blocs']"
          @click.native="selectBloc(this, index)"
        >
          Bloc {{ index + 1 }}
        </b-tag>
      </template>
    </div>
    <hr />
    <div id="apercu">
      <template v-if="selectedBloc.top !== null">
        <p class="subtitle has-text-centered">
          Résultat du bloc n°{{ indexSelectedBloc + 1 }}
        </p>
        <ul>
          <li>
            <b>Top :</b>
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
            <b>Zone :</b>
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
            <b>Zone (nb) :</b>
            <template>
              <b-tag type="is-info">
                {{ selectedBloc.zoneInTry }}
              </b-tag>
            </template>
          </li>

          <li>
            <b>Top (nb) :</b>
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

  indexSelectedBloc = 0

  mounted() {
    this.selectBloc('', 0)
  }

  selectBloc(event: any, index: number) {
    console.log('event', event)
    console.log('this._tops[index]', this._tops[index])
    console.log('this._zones[index]', this._zones[index])
    console.log('this._zoneInTries[index]', this._zoneInTries[index])
    console.log('this._topInTries[index]', this._topInTries[index])

    document
      .getElementsByClassName('blocs')
      [this.indexSelectedBloc].classList.add('is-info')
    document
      .getElementsByClassName('blocs')
      [this.indexSelectedBloc].classList.remove('is-success')

    this.indexSelectedBloc = index

    document.getElementsByClassName('blocs')[index].classList.add('is-success')
    document.getElementsByClassName('blocs')[index].classList.remove('is-info')

    this.selectedBloc.top = this._tops[index]
    this.selectedBloc.zone = this._zones[index]
    this.selectedBloc.zoneInTry = this._zoneInTries[index]
    this.selectedBloc.topInTry = this._topInTries[index]
  }
}
</script>

<style scoped>
.blocs {
  margin: 0 10px;
  transition: ease-out 0.2s;
}
ul {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
</style>
