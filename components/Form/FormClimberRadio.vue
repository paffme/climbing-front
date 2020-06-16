<template>
  <div>
    <p class="subtitle">
      {{ title }}
    </p>
    <div class="content">
      <b-field>
        <b-radio-button
          v-model="data"
          :native-value="false"
          type="is-danger"
          @input="$emit('onSelect', false)"
        >
          <b-icon icon="close"></b-icon>
        </b-radio-button>
        <b-radio-button
          v-model="data"
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
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FormClimberRadio extends Vue {
  @Prop(String) title!: string
  data: boolean = false
}
</script>

<style scoped></style>
