<template>
	<div>
		<div class="field">
			<section>
				<div class="block">
					<b-radio :disabled="!drawing || !annotationLoaded" name="name" native-value="START" type="is-success"
					         v-model="climbingHoldType">
						Début
					</b-radio>
					<b-radio :disabled="!drawing || !annotationLoaded" name="name" native-value="NORMAL" type="is-info"
					         v-model="climbingHoldType">
						Autre
					</b-radio>
					<b-radio :disabled="!drawing || !annotationLoaded" name="name" native-value="ZONE" type="is-warning"
					         v-model="climbingHoldType">
						Zone
					</b-radio>
					<b-radio :disabled="!drawing || !annotationLoaded" name="name" native-value="TOP" type="is-danger"
					         v-model="climbingHoldType">
						Top
					</b-radio>
					<b-switch :value="false" @input="modeDelete" type="is-danger" v-model="deleting">
						Mode Suppression
					</b-switch>
				</div>
			</section>
		</div>
		<div
				class="has-text-centered content"
				v-if="!annotationLoaded"
		>
			<b-progress></b-progress>
			<span>Detection des prises...</span>
		</div>
		<div class="annotator">
			<v-annotator
					:drawing="drawing && annotationLoaded"
					:height="img.height"
					:grid="[0, 0]"
					:width="img.width"
					:min-size="[5, 5]"
					:no-interact="noInteract"
					:no-select="false"
					v-if="holds !== null && img !== null"
					@draw-end="drawFinish"
					@click.native.ctrl="tryChangeBoxColor"
					@unselect="unselected"
					@select="tryDeleteBox"
			>
				<img :src="img.url"
				     v-if="img !== null"
				     draggable="false"
				     height="100%"
				     id="imgBlock"
				     width="100%"
				/>
				<template v-for="(hold,i) in holds.boundingBoxes">
					<rect :height="Math.abs(hold.coordinates[2] - hold.coordinates[0])" :id="i"
					      :key="i" :style="{'cursor': cursor, 'stroke': getColorFromType(hold.type)}"
					      :width="Math.abs(hold.coordinates[3] - hold.coordinates[1])"
					      :x="hold.coordinates[1]"
					      :y="hold.coordinates[0]"
					      slot="annotation"
					      fill="none">
					</rect>
				</template>
				<rect :stroke="getColorFromType(climbingHoldType)" slot="drawing" v-if="holds !== null && !noInteract">
				</rect>
			</v-annotator>
		</div>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
  import VAnnotator from "vue-annotator";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
  import { APIBoulderPicture, APIHolds, TypeHolds } from "~/definitions";
  import { AxiosHelper } from "~/utils/axiosHelper";

  @Component({ components: { VAnnotator } })
  export default class AnnotationComponent extends Vue {
    @Prop(Object) img !: APIBoulderPicture;
    @Prop(Number) competitionId !: number;

    oldImg: APIBoulderPicture | null = null;

    roundId !: number;
    groupId !: number;
    boulderId !: number;

    deleting = false;
    drawing = true;
    noInteract = false;

    cursor = "auto";
    climbingHoldType = TypeHolds.START;

    holds: APIHolds | null = null;
    annotationLoaded = false;

    @Watch("oldImg")
    onUpdateImg() {
      this.holdsInterval();
    }

    created() {
      this.oldImg = this.img;
      this.roundId = parseInt(this.$route.query.roundId as string, 10);
      this.boulderId = parseInt(this.$route.query.boulderId as string, 10);
      this.groupId = parseInt(this.$route.query.groupId as string, 10);

      this.holdsInterval();
    }

    async tryChangeBoxColor(annotation: any) {
      console.log(annotation);
      if (this.annotationLoaded && !this.deleting &&
        annotation.toElement.nodeName === "rect" &&
        this.holds!.boundingBoxes[annotation.target.id].type !== this.climbingHoldType) {

        console.log("color update");
        const deletedBox = await this.deleteBox(annotation.target);

        const updateBox: APIHolds = {
          boundingBoxes: [{
            coordinates: deletedBox[0].coordinates,
            type: this.climbingHoldType
          }]
        };

        await this.uploadHold(updateBox);
        this.holds!.boundingBoxes.push(updateBox.boundingBoxes[0]);
      }
    }

    tryDeleteBox(annotation: any) {
      if (this.deleting) {
        this.deleteBox(annotation.node);
      }
    }

    private deleteBox(box: any): any {
      const deletedBox = this.holds!.boundingBoxes.splice(box.id, 1);

      this.deleteHold({ boundingBoxes: [deletedBox[0]] });

      if (box.nextElementSibling !== null &&
        box.nextElementSibling.nodeName === "g") {
        document.getElementById(box.nextElementSibling.id)!.remove();
      }

      return deletedBox;
    }
  }

  drawFinish(element: any) {
    const newHold: APIHolds = {
      boundingBoxes: [
        {
          coordinates: [
            element.node.y.baseVal.value,
            element.node.x.baseVal.value,
            element.node.y.baseVal.value + element.node.height.baseVal.value,
            element.node.x.baseVal.value + element.node.width.baseVal.value
          ],
          type: this.climbingHoldType
        }
      ]
    }

    this.uploadHold(newHold)
    this.holds!.boundingBoxes.push(newHold.boundingBoxes[0])

    document.getElementById(element.node.id)!.remove()
  }

  unselected(element: any) {
    if (
      element.node.nextElementSibling !== null &&
      element.node.nextElementSibling.nodeName === 'g'
    ) {
      document.getElementById(element.node.nextElementSibling.id)!.remove()
    }
  }

  async getHolds(): Promise<APIHolds | null> {
    try {
      const result = await ApiHelper.GetHolds(
        this.competitionId,
        this.roundId,
        this.groupId,
        this.boulderId
      )

      return result.data
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  async holdsInterval() {
    this.annotationLoaded = false
    const holdList = await this.getHolds()
    const timeout = 5000

    if (holdList && holdList.boundingBoxes) {
      this.holds = holdList
      this.annotationLoaded = true
      return
    }

    const intervalId = setInterval(async () => {
      if (this.holds && this.holds.boundingBoxes) {
        this.annotationLoaded = true
        clearInterval(intervalId)
        return
      }
      this.holds = await this.getHolds()
    }, timeout)
  }

  async uploadHold(holds: APIHolds) {
    try {
      await ApiHelper.PostHolds(
        holds,
        this.competitionId,
        this.roundId,
        this.groupId,
        this.boulderId
      )
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  async deleteHold(holds: APIHolds) {
    try {
      await ApiHelper.DeleteHolds(
        holds,
        this.competitionId,
        this.roundId,
        this.groupId,
        this.boulderId
      )
    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err)
      return null
    }
  }

  getColorFromType(type: TypeHolds): string {
    switch (type) {
      case TypeHolds.START:
        return '#23d160'
      case TypeHolds.NORMAL:
        return '#209cee'
      case TypeHolds.ZONE:
        return '#ffdd57'
      case TypeHolds.TOP:
        return '#ff3860'
      default:
        return '#209cee'
    }
  }

  modeDelete(mode: boolean) {
    if (mode) {
      this.drawing = false
      this.noInteract = true
      this.cursor = 'crosshair'
    } else {
      this.drawing = true
      this.noInteract = false
      this.cursor = 'auto'
    }
  }
}
</script>

<style scoped lang="scss">
.annotator {
  touch-action: none;
}

rect {
  stroke-width: 2px;
  fill: rgba(205, 212, 214, 0.01);
  touch-action: none;
}

.progress-wrapper {
  margin: 0 !important;
}
</style>
