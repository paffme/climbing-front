<template>
  <div>
    <div class="content">
      <b-field>
        <b-radio-button
          v-model="syncedName"
          :native-value="false"
          type="is-danger"
          @input="$emit('onSelect', false)"
        >
          <b-icon icon="close"></b-icon>
        </b-radio-button>
        <b-radio-button
          v-model="syncedName"
          :native-value="true"
          type="is-success"
          @input="$emit('onSelect', true)"
        >
          <b-icon icon="check"></b-icon>
        </b-radio-button>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component
export default class FormClimberRadio extends Vue {
  @PropSync('data', { type: Boolean }) syncedName!: string
}
</script>

<style scoped></style>
