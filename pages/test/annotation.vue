<template>
	<div class="annotator">
		<AnnotationComponent :dimImg="{'height': 444, 'width': 840}"/>
	</div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import AnnotationComponent from "~/components/AnnotationComponent.vue";

  @Component({ components: { AnnotationComponent } })
  export default class annotation extends Vue {
  }
</script>

<style scoped lang="scss">
	.annotator {
		width: 100%;
		height: 100%;
	}
</style>
