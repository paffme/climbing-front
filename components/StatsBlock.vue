<template>
  <div class="tile is-child notification" :class="type">
    <p class="title">
      {{ number }}
    </p>
    <p class="subtitle">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class StatsBlock extends Vue {
  @Prop(Number) readonly number?: number
  @Prop(String) readonly description?: string
  @Prop(String) readonly type?: string
}
</script>

<style scoped></style>
