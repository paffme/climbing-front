<template>
  <div class="columns is-mobile">
    <div class="column">
      <boulders-picture :boulder-id="0"
                        :competition="{ id: 0, name: 'Competition Damien' }"
                        :round="{ id: 0, boulderIds: [0, 1, 2, 3, 4] }">
      </boulders-picture>
    </div>
    <div class="column is-one-fifth">
      <boulder-tool-bar>
      </boulder-tool-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BouldersPicture from '~/components/BouldersSettingsComponent/BouldersPicture.vue'

import BoulderToolBar from '~/components/BouldersSettingsComponent/BoulderToolBar.vue'

@Component({ components: { BouldersPicture, BoulderToolBar} })
export default class damien extends Vue {

}
</script>

<style scoped></style>
