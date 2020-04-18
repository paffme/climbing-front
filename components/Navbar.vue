<template>
  <!--<nav
    class="navbar header has-shadow is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item"
        href="/"
      >
        <img
          src="~assets/buefy.png"
          alt="Buefy"
          height="28"
        >
      </a>

      <div class="navbar-burger">
        <span/>
        <span/>
        <span/>
      </div>
    </div>
  </nav>-->
    <b-navbar type="is-light">
      <template slot="start">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
        <b-navbar-item href="#">
          Documentation
        </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";

  @Component
  export default class Navbar extends Vue {
  }
</script>

<style scoped>

</style>
