<template>
  <div class="panel-block">
    <p>
      Aucun
      <i>
        {{ roleName.toLowerCase() }}
      </i>
      n'est défini
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class RolesEmptyComponent extends Vue {
  @Prop(String) roleName!: string
}
</script>

<style scoped></style>
