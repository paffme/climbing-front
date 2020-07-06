<template>
  <div class="columns is-mobile">
    <div class="column">
      <boulders-picture :boulder-id="0"
                        :competition="{ id: 0, name: 'Competition Damien' }"
                        :round="{ id: 0, boulderIds: [0, 1, 2, 3] }">
      </boulders-picture>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '~/node_modules/vue-property-decorator'
import BouldersPicture from '../../components/BouldersSettingsComponent/BouldersPicture.vue'

@Component({ components: { BouldersPicture } })
export default class damien extends Vue {
}
</script>

<style scoped></style>
