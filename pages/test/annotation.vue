<template>
	<v-annotator :drawing=true
	             :grid="[5, 5]"
	             :height="img.height"
	             :minSize="[50, 50]"
	             :noInteract=true
	             :noSelect=true
	             :width="img.width"
	             inertia
	>
		<img :src="require('~/assets/ffme_logo.png')" draggable="false" id="imgBlock"/>
		<rect slot="drawing" stroke="red"/>

	</v-annotator>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import VAnnotator from "vue-annotator";

  @Component({ components: { VAnnotator } })
  export default class annotation extends Vue {
    img = new Image();

    created() {
      this.img.src = require("~/assets/ffme_logo.png");
    }
  }
</script>

<style scoped>
	/*@import '~vue-annotator/style.css';*/

</style>
