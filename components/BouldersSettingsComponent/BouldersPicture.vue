<template>
	<b-carousel :autoplay="false" :indicator-inside="false" indicator-custom id="carousel">
		<b-carousel-item :key="i" v-for="(item, i) in round.boulderIds">
			<a v-if="boulders[i].image !== null" >
				<img :src="boulders[i].image">
			</a>
			<a v-else class="image">
				<button-select-local-image id="drag-drop" :fileSelected="null"
				                           @screw-updated="updateImgBoulder">
				</button-select-local-image>
			</a>
		</b-carousel-item>
		<template slot="indicators" slot-scope="props">
			<figure :draggable="false" class="al image">
				<img v-if="boulders[props.i].image !== null" :draggable="false"
				     :src="boulders[props.i].image" :title="props.i">
				<img v-else :draggable="false"
				     :src="require('~/assets/image_not_found.png')" :title="props.i">
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
  }

  async retrieveImageAPI() {
    const fakeData = [
      {
        id: 0,
        image: null
      },
      {
        id: 1,
        image: require("/home/damso/Pictures/Screenshot from 2020-07-03 10-32-36.png")
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

	.add-image {
		min-height: 500px;
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
