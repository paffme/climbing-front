<template>
	<div class="card">
		<div class="card-content">
			<div id="picture-selection" class="media">
				<div class="media-left">
					<b-icon icon="image" size="is-large">
					</b-icon>
				</div>
				<div class="media-content">
					<button-select-local-image :fileSelected="null">
					</button-select-local-image>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import ButtonSelectLocalImage  from '~/components/Button/ButtonSelectLocalImage.vue'

  @Component({components: { ButtonSelectLocalImage }})
  export default class BoulderToolBar extends Vue {

  }
</script>

<style scoped>
	#picture-selection {
		align-items: center;
	}

</style>
