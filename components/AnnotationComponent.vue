<template>
	<div>
		<div class="field">
			<b-switch :value="false" @input="modeDelete" type="is-danger" v-model="deleting">
				Suppresion au click
			</b-switch>
		</div>
		<div class="annotator">
			<v-annotator
					:drawing="drawing"
					:grid="[0, 0]"
					:height="444"
					:inertia="true"
					:min-size="[5, 5]"
					:no-interact="noInteract"
					:no-select="false"
					:width="840"
					@draw-end="drawFinish"
					@select="deleteBox"
			>
				<img
						:src="urlImage || require('~/assets/NL_135_ESCALADE.jpg')"
						draggable="false"
						height="100%"
						id="imgBlock"
						width="100%"
				/>
				<template v-for="(hold,i) in holds.boundingBoxes">
					<rect :height="Math.abs(hold[2] - hold[0])" :id="i" :style="{'cursor': cursor}"
					      :width="Math.abs(hold[3] - hold[1])" :x="hold[1]"
					      :y="hold[0]" fill="none"
					      slot="annotation"/>
				</template>
				<rect slot="drawing" stroke="red"/>
			</v-annotator>
		</div>
	</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import VAnnotator from "vue-annotator";

  @Component({ components: { VAnnotator } })
  export default class AnnotationComponent extends Vue {
    @Prop(String) urlImage !: string;

    deleting = false;
    drawing = true;
    noInteract = false;
    cursor = "auto";
    holds = {
      boundingBoxes: [
        [338, 293, 347, 309],
        [240, 626, 255, 653],
        [340, 789, 356, 810],
        [89, 724, 113, 744],
        [3, 210, 33, 232],
        [147, 163, 166, 182],
        [142, 673, 166, 704],
        [242, 293, 272, 319],
        [234, 205, 257, 228],
        [291, 295, 302, 306],
        [143, 341, 160, 360],
        [223, 726, 255, 756],
        [233, 780, 263, 820],
        [43, 771, 64, 793],
        [93, 342, 114, 359],
        [384, 293, 394, 308],
        [53, 344, 77, 368],
        [287, 75, 300, 92],
        [104, 34, 117, 60],
        [335, 243, 353, 265],
        [18, 81, 37, 104],
        [275, 536, 306, 558],
        [379, 512, 389, 523],
        [387, 388, 397, 399],
        [91, 597, 110, 610],
        [0, 769, 15, 791],
        [313, 748, 332, 763],
        [46, 822, 59, 838],
        [336, 112, 347, 131]
      ]
    };

    modeDelete(mode: boolean) {
      console.log(mode);
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
      }
    }

    drawFinish(element: any) {
      this.holds.boundingBoxes.push([
        element.node.y.baseVal.value,
        element.node.x.baseVal.value,
        element.node.y.baseVal.value + element.node.height.baseVal.value,
        element.node.x.baseVal.value + element.node.width.baseVal.value
      ]);
      if (element != null && element.node != null)
        document.getElementById(element.node.id).remove();
    }

    created() {
    }
  }
</script>

<style scoped lang="scss">
	.annotator {
		width: 500px;
		height: 500px;
	}

	rect {
		stroke: #ff0000;
		stroke-width: 2px;
		fill: rgba(205, 212, 214, 0.01);
		touch-action: none;
	}
</style>
