<template>
	<div class="sidebar-page">
		<section class="sidebar-layout">
			<b-sidebar position="absolute" type="is-light" open right>
				<div class="p-1">
					<b-menu class="is-custom-mobile">
						<div id="picture-selection" class="media content">
							<div class="media-left">
								<b-icon icon="image" size="is-large">
								</b-icon>
							</div>
							<div class="media-content">
								<button-select-local-image :fileSelected="null">
								</button-select-local-image>
							</div>
						</div>
					</b-menu>
				</div>
				<div class="p-1">
					<b-menu class="is-custom-mobile">
						<b-menu-list icon="image-search-outline" label="Annotations">
							<menu-item class="control">
								<b-switch type="is-primary">
									Activer
								</b-switch>
							</menu-item>
							<menu-item class="control">
								<b-button type="is-primary" icon-left="file-find">
									Detection Automatique
								</b-button>
							</menu-item>
						</b-menu-list>
					</b-menu>

				</div>
			</b-sidebar>

			<div class="is-divider content"></div>
		</section>
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
