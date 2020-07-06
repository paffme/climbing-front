<template>
	<div class="card">
		<div class="card-header">
			<p class="card-header-title">
				Annotations
			</p>
		</div>
		<div class="card-content">
			<div class="content">
				<b-switch type="is-primary">
					Activer
				</b-switch>
			</div>
			<div class="content" @click="loadAnnotations">
				<b-button type="is-primary" icon-left="file-find">
					<p>
						Auto Detection
					</p>
				</b-button>
			</div>
			<div v-if="loadingAnnotations" class="content">
				<b-progress></b-progress>
			</div>
		</div>
		<div v-if="file !== null"  class="card-header">
			<p class="card-header-title">
				Image
			</p>
		</div>
		<div v-if="file !== null" class="card-content">
			<div class="content" @click="deleteImg">
				<b-button type="is-danger">Supprimer</b-button>
			</div>
		</div>
		<footer class="card-footer">
			<a class="card-footer-item"
			   @click="downloadFile">
				Télécharger
			</a>
		</footer>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'


  @Component
  export default class BoulderToolBar extends Vue {
    @Prop(Object) readonly oldFile!: File | null

    private file: File | null = this.oldFile

    loadingAnnotations = false

    loadAnnotations() {
      this.loadingAnnotations = true
    }

    deleteImg() {
      this.file = null
    }

    downloadFile() {
      if(this.file === null) {
        this.warningNoFile()
	      return
      }
      console.log("WESHHHHH")
	    console.log(this.file)
    }
    warningNoFile() {
		  this.$buefy.snackbar.open({
		    duration: 2000,
		    message: "Il n'y a pas d'Image a Télécharger",
		    type: "is-warning",
		    position: 'is-top',
		    actionText: 'OK'
	    })
    }
  }
</script>

<style scoped>
	b-button > p {
		word-wrap: break-spaces;
	}

</style>
