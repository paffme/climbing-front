<template>
    <b-navbar type="is-primary" fixed-top>
      <template slot="brand">
        <b-navbar-item tag="div">
          <nuxt-link to="/dashboard">
            <h1 class="subtitle has-text-white">{{ APP_TITLE }}</h1>
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <template v-for="item of itemNavbars">
            <nuxt-link :to="item.linkTo" class="end-icon-link">
              <b-icon
                :icon="item.icon">
              </b-icon>
            </nuxt-link>
          </template>
        </b-navbar-item>
      </template>
    </b-navbar>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";

  type NavbarItem = {
    linkTo: string
    icon: string
  }

  @Component
  export default class Navbar extends Vue {
    @Prop({type: Array, required: true}) readonly navbarItems: NavbarItem[] | undefined
    itemNavbars?: NavbarItem[] = []
    data() {
      return {
        APP_TITLE: process.env.NUXT_ENV_APP_TITLE || 'PAFFME'
      }
    }

    mounted() {
      this.itemNavbars = this.navbarItems ? this.fillNavbarItems() : []
    }

    /**
     * Utiliser pour créer la barre d'item
     * @param items
     */
    public fillNavbarItems(): NavbarItem[] {
      return this.navbarItems?.filter((data) => (data.linkTo && data.icon)) || []
    }
  }
</script>

<style scoped>
  .end-icon-link {
    margin: 0 15px;
  }
</style>