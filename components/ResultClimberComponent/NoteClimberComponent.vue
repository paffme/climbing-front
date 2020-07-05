<template>
  <div>
    <template
      v-if="_boulders && Array.isArray(_boulders) && _boulders.length > 0"
    >
      <p class="subtitle notification has-text-centered">
        Bloc numéro {{ _boulders[index].id }}
      </p>
      <b-carousel :autoplay="false" @change="onChange">
        <b-carousel-item v-for="(boulder, i) in _boulders" :key="i">
          <span class="image is-4by3">
            <img :src="'https://picsum.photos/id/432/1230/500'" />
          </span>
        </b-carousel-item>
      </b-carousel>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
import { APIBoulders } from '~/definitions'

@Component
export default class NoteClimberComponent extends Vue {
  @PropSync('boulders', { type: Array }) _boulders!: APIBoulders[]
  index = 0

  onChange(value: number) {
    this.index = value
    this.$emit('onChangeBloc', this._boulders[value].id)
  }
}
</script>

<style>
.carousel-slide {
  width: 176px !important;
}
</style>
