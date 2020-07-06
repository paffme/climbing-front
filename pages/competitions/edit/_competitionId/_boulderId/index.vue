<template>
	<div class="columns is-mobile">
		<div class="column">
			<boulders-picture :boulder-id="0"
			                  :competition="{ id: 0, name: 'Competition Damien' }"
			                  :round="{ id: 0, boulderIds: [0] }">
			</boulders-picture>
		</div>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Competition } from '~/definitions'

  import BouldersPicture from '~/components/BouldersSettingsComponent/BouldersPicture.vue'

  @Component({ components: { BouldersPicture } })
  export default class BouldersVue extends Vue {
    @Prop(Object) readonly annotations!: Array<Array<Number>>

  }
</script>

<style scoped></style>
