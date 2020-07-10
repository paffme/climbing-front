<template>
	<div>
		<div class="field">

			<section>
				<div class="block">
					<b-radio v-model="climbingHoldType" name="name" native-value="start" type="is-success" :disabled="!drawing">
						Début
					</b-radio>
					<b-radio v-model="climbingHoldType" name="name" native-value="other" type="is-info" :disabled="!drawing">
						Autre
					</b-radio>
					<b-radio v-model="climbingHoldType" name="name" native-value="zone" type="is-warning" :disabled="!drawing">
						Zone
					</b-radio>
					<b-radio v-model="climbingHoldType" name="name" native-value="top" type="is-danger" :disabled="!drawing">
						Top
					</b-radio>
					<b-switch :value="false" @input="modeDelete" type="is-danger" v-model="deleting">
						Mode Suppression
					</b-switch>
				</div>
			</section>
		</div>
		<div class="annotator">
			<v-annotator
					:drawing="drawing"
					:grid="[0, 0]"
					:height="dimImg.height"
					:min-size="[5, 5]"
					:no-interact="noInteract"
					:no-select="false"
					:width="dimImg.width"
					@draw-end="drawFinish"
					@select="deleteBox"
					@unselect="unselected"
			>
				<img :src="urlImage"
				     v-if="urlImage !== null"
				     draggable="false"
				     height="100%"
				     id="imgBlock"
				     width="100%"
				/>
				<template v-for="(hold,i) in holds.boundingBoxes">
					<rect :height="Math.abs(hold[2] - hold[0])" :id="i" :key="i"
					      :width="Math.abs(hold[3] - hold[1])" :x="hold[1]"
					      :y="hold[0]" fill="none"
					      slot="annotation"
					      :style="{'cursor': cursor, 'stroke': getColorFromType(holds.type[i])}">
					</rect>
				</template>
				<rect slot="drawing" :stroke="getColorFromType(climbingHoldType)"></rect>
			</v-annotator>
		</div>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import VAnnotator from "vue-annotator";

  @Component({ components: { VAnnotator } })
  export default class AnnotationComponent extends Vue {
    @Prop(String) urlImage !: string;
    @Prop(Object) dimImg !: {height: number, width: number};

    climbingHoldType = 'start'

    deleting = false;
    drawing = true;
    noInteract = false;

	  cursor = "auto"

    holds = {
      type: ["other", "other", "other", "other"],
      boundingBoxes: [
        [338, 293, 347, 309],
        [240, 626, 255, 653],
        [340, 789, 356, 810],
        [89, 724, 113, 744]
      ]
    };

    getColorFromType(type: string): string {
      switch (type.toUpperCase()) {
        case "START":
          return "#23d160"
        case "OTHER":
          return "#209cee"
        case "ZONE":
          return "#ffdd57"
        case "TOP":
          return "#ff3860"
	      default:
	        return "#209cee"
      }
    }

    modeDelete(mode: boolean) {
      if (mode) {
        this.drawing = false;
        this.noInteract = true;
        this.cursor = "crosshair";
      } else {
        this.drawing = true;
        this.noInteract = false;
        this.cursor = "auto";
      }
    }

    deleteBox(obj: any) {
      if (this.deleting) {
        this.holds.boundingBoxes.splice(obj.node.id, 1);
        this.holds.type.splice(obj.node.id, 1);

        if(obj.node.nextElementSibling !== null &&
            obj.node.nextElementSibling.nodeName === "g") {
          document.getElementById(obj.node.nextElementSibling.id)!.remove()
        }
      }
    }

    drawFinish(element: any) {
      this.holds.boundingBoxes.push([
        element.node.y.baseVal.value,
        element.node.x.baseVal.value,
        element.node.y.baseVal.value + element.node.height.baseVal.value,
        element.node.x.baseVal.value + element.node.width.baseVal.value
      ]);
      this.holds.type.push(this.climbingHoldType)
      document.getElementById(element.node.id)!.remove();
    }

    unselected(element: any) {
      if(element.node.nextElementSibling !== null &&
        element.node.nextElementSibling.nodeName === "g") {
        document.getElementById(element.node.nextElementSibling.id)!.remove()
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
</style>
