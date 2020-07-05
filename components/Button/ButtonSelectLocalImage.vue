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
							Ajouter une image
						</div>
					</div>
				</div>
			</b-upload>
		</b-field>
		<div class="tags">
			<span  v-if="fileDrop.length !== 0" class="tag is-primary">
				{{fileDrop[0].name}}
				<button class="delete is-small" type="button" @click="deleteFile">
				</button>
			</span>
		</div>
	</section>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'


  @Component
  export default class ButtonSelectLocalImage extends Vue {
    @Prop(Object) fileSelected !: File | null

	public fileDrop: Array<File> = []

    @Watch('fileDrop')
    onFileDropChange(val: Array<File>, oldVal: Array<File>) {
      if(val !== oldVal) {
        this.$emit('updateFile', thsi.fileDrop === [] ? null : thsi.fileDrop[0])
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
	.is-mobile {
		align-items: center;
	}
</style>
