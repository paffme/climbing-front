<template>
  <div>
    <div class="block">
      <span class="subtitle">Configuration des membres du tournois</span>
    </div>
    <b-tabs v-model="activeTab">
      <template v-for="(role, index) in roles">
        <b-tab-item :key="index" :label="role">
          <TabUserSelector :role="role" />
        </b-tab-item>
      </template>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TabUserSelector from '~/components/TabUserSelector.vue'

@Component({
  components: { TabUserSelector }
})
export default class UserGestion extends Vue {
  activeTab = 0
  roles = [
    'Juges',
    'Président',
    'Chef routes setters',
    'Routes setters',
    'Délégués techniques',
    'Organisateur'
  ]

  competitionId?: number
}
</script>

<style scoped></style>
