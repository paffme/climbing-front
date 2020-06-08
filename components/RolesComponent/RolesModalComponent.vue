<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Ajouter un nouveau role
      </p>
    </header>
    <div class="card-content">
      <span class="description-text"
        >Trouver un utilisateur via son <b>nom</b></span
      >
      <div class="custom-field">
        <SearchUser
          :suggested-users="suggestedUsers"
          @select="onSelect"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SearchUser from '~/components/Form/SearchUser.vue'

@Component({
  components: { SearchUser }
})
export default class RolesModalComponent extends Vue {
  @Prop(Array) suggestedUsers!: Array<{ name: string; id: number }>

  onSelect(user: { name: string; id: number }) {
    console.log('user', user)
    this.$emit('select', user)
  }

  onInput() {}
}
</script>

<style scoped>
.description-text {
  margin: 20px 0;
}
.custom-field {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
