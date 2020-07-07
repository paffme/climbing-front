<template>
	<b-field>
		<b-upload v-model="fileDrop" @input="$emit('newFile', fileDrop[0])"
		          multiple expanded drag-drop type="file" accept="image/*">
			<section class="section">
				<div class="content has-text-centered">
					<p>
						<b-icon icon="upload" size="is-large"></b-icon>
					</p>
					<p>Ajouter une image</p>
				</div>
			</section>
		</b-upload>
	</b-field>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'


  @Component
  export default class ButtonSelectLocalImage extends Vue {
    @Prop(Object) fileSelected!: File | null

		public fileDrop: Array<File> = []

		created() {
			if(this.fileSelected !== null) this.fileDrop.push(this.fileSelected)
		}

	    public deleteFile() {
	      this.fileDrop = []
	    }
  }
</script>

<style scoped>
</style>