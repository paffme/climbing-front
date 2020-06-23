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
        <div v-if="isConnected && userCredentials" class="text">
          Connecté en tant que : {{ userCredentials.firstName }}
          {{ userCredentials.lastName }}
        </div>
        <template v-if="isConnected">
          <nuxt-link :to="{ name: 'user' }">
            <b-icon icon="account" type="is-white" class="end-icon-link" />
          </nuxt-link>
          <b-icon
            icon="logout"
            type="is-white"
            class="end-icon-link"
            @click.native="disconnect"
          />
        </template>
        <template v-else>
          <b-button
            type="is-primary"
            icon-left="login"
            tag="nuxt-link"
            :to="{ name: 'login' }"
          >
            Se connecter
          </b-button>
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
  isConnected: boolean
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
.text {
  margin-right: 15px;
}
.end-icon-link {
  margin: 0 15px;
  color: black;
  cursor: pointer;
}
</style>
