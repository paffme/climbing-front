<template>
  <b-navbar type="is-primary" fixed-top>
    <template slot="brand">
      <b-navbar-item tag="div">
        <nuxt-link to="/">
          <img src="../assets/ffme_logo.png" alt="" />
        </nuxt-link>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div v-if="isConnected && userCredentials">
          Connecté en tant que : {{ userCredentials.firstName }}
          {{ userCredentials.lastName }}
        </div>
        <template v-for="(item, key) of itemNavbars">
          <template v-if="item.linkTo === 'logout'">
            <b-button :key="key" :icon-left="item.icon" @click="disconnect" />
          </template>
          <template v-else>
            <nuxt-link :key="key" :to="item.linkTo" class="end-icon-link">
              <b-icon :key="key" :icon="item.icon" />
            </nuxt-link>
          </template>
        </template>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { authUser } from '~/utils/store-accessor'
import AuthUser from '~/store/authUser'

type NavbarItem = {
  linkTo: string
  icon: string
}

@Component
export default class Navbar extends Vue {
  @Prop({ type: Array, required: true }) readonly navbarItems!: NavbarItem[]
  // @ts-ignore
  isConnected = AuthUser.getters?.['Authenticated']() || false
  // @ts-ignore
  userCredentials = AuthUser.getters?.['Credentials']() || undefined

  itemNavbars?: NavbarItem[] = []
  data() {
    return {
      APP_TITLE: process.env.NUXT_ENV_APP_TITLE || 'PAFFME'
    }
  }

  disconnect() {
    authUser.disconnectUser()
    this.$router.push({ name: 'login' })
  }

  mounted() {
    this.itemNavbars = this.navbarItems ? this.fillNavbarItems() : []
  }

  /**
   * Utiliser pour créer la barre d'item
   * @param items
   */
  public fillNavbarItems(): NavbarItem[] {
    return this.navbarItems?.filter((data) => data.linkTo && data.icon) || []
  }
}
</script>

<style scoped>
.end-icon-link {
  margin: 0 15px;
}
</style>
