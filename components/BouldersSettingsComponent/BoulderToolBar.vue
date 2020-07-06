<template>
	<div class="card">
		<div class="card-header">
			Annotations
		</div>
		<div class="card-content">
			<div class="content">
				<b-switch type="is-primary">
					Activer
				</b-switch>
			</div>
			<div class="content">
				<b-button id="auto-detection" type="is-primary" icon-left="file-find">
					Auto Detection
				</b-button>
			</div>
			<div class="card-footer">
				<b-button class="card-footer-item" type="is-info" outlined @click="savePicture">
					Sauvegarder
				</b-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import ButtonSelectLocalImage  from '~/components/Button/ButtonSelectLocalImage.vue'


  export default class BoulderToolBar extends Vue {
    @Prop(Object) readonly oldFile!: File | null

    private file: File | null = this.oldFile

    savePicture() {
		if(this.file !== this.oldFile) {
		  console.log('OK on export le frero')
		}
    }
  }
</script>

<style scoped>
	#drag-drop {
		margin: 10px 10px 6px 10px;
	}
	.card-footer-item {
		margin-top: 10px;
	}
</style>
