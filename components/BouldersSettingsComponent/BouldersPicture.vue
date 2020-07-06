<template>
	<b-carousel :autoplay="false" :indicator-inside="false" indicator-custom>
		<b-carousel-item :key="i" v-for="(item, i) in round.boulderIds">
			<a v-if="item !== null" class="image" @click="switchGallery(true)">
				<img :src="item">
			</a>
			<a v-else @click="switchGallery(true)">
				<button-select-local-image id="drag-drop" :fileSelected="file"
					@screw-updated="updateImgBoulder">
				</button-select-local-image>
			</a>
<!--			<p class="level-item has-text-centered add-image" v-if="boulders[i].image === null">-->
<!--				<b-button icon-left="plus-box"-->
<!--				          size="is-large">-->
<!--					Ajouter-->
<!--				</b-button>-->
<!--			</p>-->
		</b-carousel-item>
		<template slot="indicators" slot-scope="props">
			<figure :draggable="false" class="al image">
				<img v-if="boulders[props.i].image !== null" :draggable="false"
				     :src="boulders[props.i].image" :title="props.i">
				<img v-else :draggable="false"
				     :src="require('../../assets/image_not_found.png')" :title="props.i">
			</figure>
		</template>
	</b-carousel>
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
  imgCurrentBoulder: string | File | null = null

  updateImgBoulder(newImg: File) {
    this.imgCurrentBoulder = newImg;
  }

  created() {
    this.retrieveImageAPI();
    this.round.boulderIds.forEach((boulderId) => {
      this.boulders.push({
        id: boulderId,
        image: "https://buefy.org/static/img/placeholder-1280x960.png"
      })
    })
  }

  async retrieveImageAPI() {
    const fakeData = [
      {
        id: 0,
        image: "https://www.bienetre-et-sante.fr/wp-content/uploads/2018/08/NL_135_ESCALADE.jpg"
      },
      {
        id: 1,
        image: "https://buefy.org/static/img/placeholder-1280x960.png"
      },
      {
        id: 2,
        image: "https://buefy.org/static/img/placeholder-1280x960.png"
      },
      {
        id: 3,
        image: "https://buefy.org/static/img/placeholder-1280x960.png"
      },
      {
        id: 4,
        image: "https://buefy.org/static/img/placeholder-1280x960.png"
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

	.add-image {
		min-height: 500px;
	}

	#drag-drop {
		margin: 10px 10px 6px 10px;
	}
</style>
