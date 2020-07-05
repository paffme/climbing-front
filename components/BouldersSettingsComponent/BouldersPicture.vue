<template>
	<b-carousel :autoplay="false" :indicator-inside="false" :overlay="gallery" indicator-custom>
		<b-carousel-item :key="i" v-for="(item, i) in round.boulderIds.length">
			<a class="image" v-if="boulders[i].image !== null">
				<img :src="boulders[i].image">
			</a>
			<p class="level-item has-text-centered add-image" v-if="boulders[i].image === null">
				<b-button icon-left="plus-box"
				          size="is-large">
					Ajouter
				</b-button>
			</p>
		</b-carousel-item>
		<span class="modal-close is-large" v-if="gallery"/>
		<template slot="indicators" slot-scope="props">
			<figure :draggable="false" class="al image">
				<img :draggable="false"
				     :src="boulders[props.i].image" :title="props.i" v-if="boulders[props.i].image !== null">
				<img :draggable="false"
				     :src="require('../../assets/image_not_found.png')" :title="props.i"
				     v-if="boulders[props.i].image === null">
			</figure>
		</template>
	</b-carousel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component
export default class BouldersPicture extends Vue {
  @Prop(Number) boulderId!: number;
  @Prop(Object) readonly round!: { id: number; boulderIds: Array<number> };
  @Prop(Object) readonly competition!: { id: number; name: string };

  boulders: Array<{ id: number; image: string | null }> = [];

  test = 0;

  // items: any = null

  created() {
    this.retrieveImageAPI();
    this.round.boulderIds.forEach((boulderId) => {
      this.boulders.push({
        id: boulderId,
        image: "https://buefy.org/static/img/placeholder-1280x960.png"
      })
    })
  }

  info(value: any) {
    this.test = value
  }

  async retrieveImageAPI() {
    const fakeData = [
      {
        id: 0,
        image: "https://www.bienetre-et-sante.fr/wp-content/uploads/2018/08/NL_135_ESCALADE.jpg"
      },
      {
        id: 1,
        image: null
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
</style>
