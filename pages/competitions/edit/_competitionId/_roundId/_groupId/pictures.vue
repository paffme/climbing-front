<template>
  <div class="columns is-mobile">
    <div class="column">
      <boulders-picture :roundBouldersInfo="roundBouldersInfo">
      </boulders-picture>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '~/node_modules/vue-property-decorator'
import BouldersPicture from '~/components/BouldersSettingsComponent/BouldersPicture.vue'
import { RoundBouldersPictures } from '~/definitions'

  @Component({ components: { BouldersPicture } })
  export default class BouldersVue extends Vue {
    @Prop(Object) readonly roundBouldersInfo!: RoundBouldersPictures

  }
</script>

<style scoped></style>