<template>
	<b-field>
		<b-upload v-model="fileDrop" multiple expanded drag-drop type="file" accept="image/*">
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

    @Watch('fileDrop')
    onFileDropChange(val: Array<File>, oldVal: Array<File>) {
      console.log("val=" + val.toString() + " && oldVal=" + oldVal.toString())
      if(val !== oldVal && this.fileDrop !== []) {
        this.$emit('updateImgBoulder', this.fileDrop[0])
      }
    }

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