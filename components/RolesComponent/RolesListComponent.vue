<template>
  <ul v-if="users">
    <transition-group name="list" tag="li">
      <li v-for="user in users" :key="user.id">
        <div class="panel-block">
          <div>
            <b-icon icon="account" size="is-small"> </b-icon>
            <span>
              {{ user.firstName }} {{ user.lastName }}#{{ user.id }}
            </span>
          </div>
          <b-button
            class="removeButton"
            type="is-danger"
            icon-right="delete"
            size="is-small"
            native-type="button"
            @click="$emit('remove', user)"
          ></b-button>
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { APIUser } from '~/definitions'

@Component
export default class RolesListComponent extends Vue {
  @Prop(Array) users!: APIUser[]
}
</script>

<style scoped>
.panel-block {
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  cursor: default;
}

.panel-block:hover {
  background-color: lightgrey;
}
ul {
  width: 100%;
}
li {
  margin-bottom: 10px;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.list-enter {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
