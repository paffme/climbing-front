<template>
	<section>
		<b-field>
			<b-upload v-model="fileDrop" drag-drop>
				<section class="section">
					<div class="content has-text-centered">
						<p>
							<b-icon icon="upload" size="is-large"></b-icon>
						</p>
						<p>Glissé une image ici ou appuyé pour ajouter une image</p>
					</div>
				</section>
			</b-upload>
		</b-field>
		<div class="tags">
			<span  v-for="(file, index) in fileDrop" class="tag is-primary" :key="index" >
				{{file.name}}
				<button class="delete is-small" type="button" @click="deleteFile()">
				</button>
			</span>
		</div>
	</section>
</template>
<!--<div v-if="!fileSelected" class="button-select-file">
	<b-button :size="size" @click="">
		Ajouter
	</b-button>
</div>
<div v-else class="button-select-file">
	<b-button :size="size" >
		Changer
	</b-button>
</div>-->

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'


  @Component
  export default class ButtonSelectLocalFile extends Vue {
    @Prop(Object) fileSelected !: File | null

    fileDrop: File[] = this.fileSelected ? new Array(this.fileSelected) : []

    public deleteFile() {
      this.fileDrop = [];
    }
  }
</script>

<style scoped>

</style>
