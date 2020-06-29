<template>
	<img :src="img" :srcset="this.img" alt=""/>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { vGallery } from "plugin";

  @Component({ components: { vGallery } })
  export default class BouldersPicture extends Vue {
    @Prop(String) readonly pictureFile !: string;

    img = this.pictureFile;
  }
</script>

<style scoped>

</style>
