<template>
  <h1>Dashboard</h1>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { authUser } from "~/store";

@Component({
  middleware: 'isAuth'
})
export default class HomePage extends Vue {
  // Properties

  // Component Data
  message: string = 'This is a message'

  // Computed properties
}
</script>
