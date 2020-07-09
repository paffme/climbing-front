<template>
  <div class="annotator">
    <v-annotator
      :drawing="true"
      :grid="[5, 5]"
      :width="1024"
      :height="683"
      :min-size="[50, 50]"
      :no-interact="true"
      :no-select="true"
      inertia
    >
      <img
        id="imgBlock"
        :src=" urlImage || 'https://paffme.hdaroit.fr/storage/boulders/16.jpg'"
        draggable="false"
        width="100%"
        height="100%"
      />
      <template v-for="hold in holds.boundingBoxes">
        <polygon slot="annotation" stroke="green" :points="hold.toString()" />
      </template>
    </v-annotator>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import VAnnotator from 'vue-annotator'

  @Component({ components: { VAnnotator } })
  export default class AnnotationComponent extends Vue {
    @Prop(String) urlImage !: string
    holds = {
      boundingBoxes: [
        [155, 382, 175, 395],
        [444, 338, 458, 353],
        [484, 572, 501, 583],
        [529, 557, 544, 575],
        [266, 579, 292, 590],
        [282, 258, 318, 278],
        [306, 464, 358, 498],
        [168, 270, 195, 287],
        [459, 212, 478, 230],
        [330, 532, 351, 544],
        [418, 947, 447, 972],
        [550, 101, 568, 113],
        [196, 519, 216, 533],
        [408, 588, 424, 604],
        [187, 303, 198, 315],
        [340, 440, 402, 503],
        [342, 561, 370, 584],
        [386, 541, 416, 563],
        [302, 298, 317, 311],
        [154, 307, 166, 318],
        [519, 253, 542, 274],
        [257, 304, 271, 316],
        [206, 422, 262, 470],
        [567, 315, 589, 339],
        [550, 587, 572, 604],
        [315, 571, 333, 594],
        [201, 592, 225, 606],
        [519, 82, 536, 104],
        [361, 592, 380, 605],
        [415, 253, 433, 268],
        [475, 341, 486, 355],
        [513, 827, 543, 840],
        [127, 338, 137, 349],
        [556, 51, 572, 67],
        [439, 113, 469, 131],
        [348, 264, 366, 283],
        [517, 938, 548, 962],
        [250, 692, 266, 704],
        [427, 979, 451, 993],
        [383, 343, 414, 369],
        [220, 299, 230, 312]
      ]
    }

    created() {
      this.holds.boundingBoxes.forEach(hold => {
        console.log('hold', hold.toString())
      })
    }
  }
</script>

<style scoped lang="scss">
  // @import '~vue-annotator/style.css';
  .annotator {
    width: 500px;
    height: 500px;
  }
</style>
