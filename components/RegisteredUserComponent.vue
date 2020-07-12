<template>
  <div id="registered">
    <p class="subtitle is-size-4">
      Liste des grimpeurs déjà inscrits
    </p>
    <div
      v-if="climbers && Array.isArray(climbers) && climbers.length > 0"
      class="columns is-multiline"
    >
      <div
        v-for="(climber, index) in climbers"
        :key="index"
        class="registered-user column is-1"
      >
        <figure class="image is-64x64">
          <img
            src="https://bulma.io/images/placeholders/64x64.png"
            class="is-rounded"
          />
        </figure>
        <span class="name">{{
          `${climber.user.firstName} ${climber.user.lastName}`
        }}</span>
      </div>
    </div>
    <div v-else>
      <p class="content subtitle">
        Aucun grimpeur inscrit
        <b-icon icon="emoticon-sad-outline"> </b-icon>
      </p>
      <div>
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIUser } from '~/definitions'

@Component
export default class RegisteredUserComponent extends Vue {
  @Prop(Array) climbers!: APIUser[]
}
</script>

<style scoped>
#registered {
  display: flex;
  flex-direction: column;
}

#registered .name {
  font-size: 11px;
}

#registered .registered-user {
  text-align: center;
}

#registered .registered-user:hover {
  color: cornflowerblue;
}

#registered .subtitle {
  align-self: flex-start;
}
</style>
