<template>
	<div class="columns is-mobile">
		<div class="column">
			<boulders-picture :boulder-id="0"
			                  :competition="{ id: 0, name: 'Competition Damien' }"
			                  :round="{ id: 0, boulderIds: [0] }">
			</boulders-picture>
		</div>
		<div class="column is-one-fifth">
			<boulder-tool-bar oldFile="null">
			</boulder-tool-bar>
		</div>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Competition } from '~/definitions'

  import BouldersPicture from '~/components/BouldersSettingsComponent/BouldersPicture.vue'
  import BoulderToolBar from '~/components/BouldersSettingsComponent/BoulderToolBar.vue'

  @Component({ components: { BouldersPicture, BoulderToolBar} })
  export default class BouldersVue extends Vue {
    @Prop(Object) readonly annotations!: Array<Array<Number>>

  }
</script>

<style scoped></style>