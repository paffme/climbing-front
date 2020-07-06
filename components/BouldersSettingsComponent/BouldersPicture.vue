<template>
	<div class="columns is-mobile">
		<div class="column">
			<b-carousel :autoplay="false" :indicator-inside="false" @change="updateBoulderId($event)" id="carousel"
			            indicator-custom>
				<b-carousel-item :key="i" v-for="(item, i) in round.boulderIds">
					<a v-if="boulders[i].image !== null">
						<img :src="boulders[i].image">
					</a>
					<a class="image" v-else>
						<button-select-local-image :fileSelected="null" @screw-updated="updateImgBoulder"
						                           id="drag-drop">
						</button-select-local-image>
					</a>
				</b-carousel-item>
				<template slot="indicators" slot-scope="props">
					<figure :draggable="false" class="al image">
						<img :draggable="false" :src="boulders[props.i].image"
						     :title="props.i" v-if="boulders[props.i].image !== null">
						<img :draggable="false" :src="require('~/assets/image_not_found.png')"
						     :title="props.i" v-else>
					</figure>
				</template>
			</b-carousel>
		</div>
		<div class="card" id="card">
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
				<div @click="loadAnnotations" class="content">
					<b-button icon-left="file-find" type="is-primary">
						<p>
							Auto Detection
						</p>
					</b-button>
				</div>
				<div class="content" v-if="loadingAnnotations">
					<b-progress></b-progress>
				</div>
			</div>
			<div class="card-header" v-if="localImgBoulder !== null">
				<p class="card-header-title">
					Image
				</p>
			</div>
			<div class="card-content" v-if="localImgBoulder !== null">
				<div @click="deleteImg" class="content">
					<b-button type="is-danger">Supprimer</b-button>
				</div>
			</div>
			<footer class="card-footer" v-if="localImgBoulder !== null">
				<a @click="downloadFile"
				   class="card-footer-item">
					Télécharger
				</a>
			</footer>
		</div>
	</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AxiosHelper } from '~/utils/axiosHelper'
import ButtonSelectLocalImage from '~/components/Button/ButtonSelectLocalImage.vue'

@Component({components: { ButtonSelectLocalImage }})
export default class BouldersPicture extends Vue {
  @Prop(Number) boulderId!: number;
  @Prop(Object) readonly round!: { id: number; boulderIds: Array<number> };
  @Prop(Object) readonly competition!: { id: number; name: string };

  boulders: Array<{ id: number; image: string | null }> = [];

  localBoulderId = this.round.id;
  localImgBoulder: string | File | null = null;

  loadingAnnotations = false;
  annotations: Array<Array<Number>> = [];

  reader = new FileReader();

  created() {
    this.retrieveImageAPI();
    this.localImgBoulder = this.boulders[this.localBoulderId].image;

    this.reader.addEventListener("load", () => {
      console.log(this.reader.result);
      this.boulders[this.localBoulderId].image = this.reader.result;
    }, false);
  }


  // Carousel
  updateBoulderId(newId: number) {
    this.localBoulderId = newId;
    this.localImgBoulder = this.boulders[newId].image;

  }

  updateImgBoulder(newImg: File) {
    this.localImgBoulder = newImg;

    console.log(newImg);
    this.reader.readAsDataURL(newImg);
  }

  // ToolBar
  loadAnnotations() {
    this.loadingAnnotations = true;
  }

  deleteImg() {
    this.localImgBoulder = null;
  }

  warningNoFile() {
    this.$buefy.snackbar.open({
      duration: 2000,
      message: "Il n'y a pas d'Image a Télécharger",
      type: "is-warning",
      position: "is-top",
      actionText: "OK"
    });
  }

  downloadFile() {
    if (this.localImgBoulder === null) {
      this.warningNoFile();
    } else {

    }
  }

  // API
  async retrieveImageAPI() {
    const fakeData = [
      {
        id: 0,
        image: null
      },
      {
        id: 1,
        image: require("~/assets/ffme_logo.png")
      },
      {
        id: 2,
        image: null
      },
      {
        id: 3,
        image: null
      },
      {
        id: 4,
        image: null
      }
    ]
    try {
      this.boulders = fakeData;
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err);
    }
  }
}
</script>

<style>
	.is-active .al img {
		border: 1px solid #fff;
		filter: grayscale(0%);
	}

	.al img {
		border: 1px solid transparent;
		filter: grayscale(100%);
	}

	#drag-drop {
		margin: 10px 10px 6px 10px;
	}

	.image {
		position: relative;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
