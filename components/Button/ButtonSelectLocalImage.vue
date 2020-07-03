<template>
	<section>
		<b-field v-if="fileDrop.length === 0">
			<b-upload v-model="fileDrop" multiple drag-drop type="file" accept="image/*">
				<div class="content has-text-centered">
					<div class="columns is-mobile">
						<div class="column is-one-fifth">
							<b-icon icon="upload" size="is-large"></b-icon>
						</div>
						<div class="column">
							Glissé ou appuyé pour ajouter une image
						</div>
					</div>
				</div>
			</b-upload>
		</b-field>
		<div class="tags">
			<span  v-if="fileDrop.length !== 0" class="tag is-primary">
				{{fileDrop[0].name}}
				<button class="delete is-small" type="button" @click="deleteFile()">
				</button>
			</span>
		</div>
	</section>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'


  @Component
  export default class ButtonSelectLocalImage extends Vue {
    @Prop(Object) fileSelected !: File | null

	fileDrop: Array<File> = []

	created() {
		if(this.fileSelected !== null) this.fileDrop.push(this.fileSelected)
	}

    public deleteFile() {
      this.fileDrop = []
    }
  }
</script>

<style scoped>
	#vertical-center {
		align-items: center;
	}
	/*#vertical-center > div {*/
	/*	vertical-align: middle;*/
	/*}*/
</style>
