<template>
	<b-carousel-list :data="boulders" :items-to-show="1" v-model="this.boulderId">
		<template slot="item" slot-scope="props">
			<div class="card">
				<div class="card-image">
					<figure class="image is-5by4">
						<p v-if="props.list.image !== null">
							<a @click="info(props.id)"><img :srcset="props.list.image" alt="" src=""></a>
						</p>
					</figure>
					<b-tag rounded style="position: absolute; top: 0;" type="is-danger"><b>50%</b></b-tag>
				</div>
				<div class="card-content">
					<div class="content">
						<p class="title is-6">{{ "Block n°" + props.list.id }}</p>
						<p class="subtitle is-7">@johnsmith</p>
						<div class="field is-grouped">
							<p class="control" style="margin-left: auto">
								<button class="button is-small is-danger is-outlined">
									<b-icon icon="heart" size="is-small"/>
								</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</template>
	</b-carousel-list>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { CompetitionBoulderingResult } from "~/definitions";

  @Component
  export default class BouldersPicture extends Vue {
    @Prop(Number) boulderId !: number;
    @Prop(Object) readonly round !: { id: number, boulderIds: Array<number> };
    @Prop(Object) readonly competition !: { id: number, name: string };

    boulders: Array<{ id: number, image: string | null }> = new Array<{ id: number, image: null }>(this.round.boulderIds.length);

    constructor() {
      super();

      this.round.boulderIds.forEach((boulderId) => {
        this.boulders.unshift({ id: boulderId, image: "https://buefy.org/static/img/placeholder-1280x960.png" });
        // if(boulderId == this.boulderId) {
        // this.boulders[0].image = this.retrieveBoulderPicture(this.boulderId);
        // }
      });
    }

    public info(boulderId: number) {
      this.boulderId = boulderId;
    }

    private retrieveBoulderPicture(id: number): string {
      // require('../../assets/example_climbing_wall.jpg')
      return "https://buefy.org/static/img/placeholder-1280x960.png";
    }
  }
</script>

<style scoped>

</style>
