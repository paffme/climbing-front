<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="page_header">
            <h1 class="title">Créer une nouvelle compétition</h1>
          </div>

          <div class="custom_section page_content">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li class="is-primary"><nuxt-link to="/competitions">Compétitions</nuxt-link></li>
                <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
              </ul>
            </nav>
            <div class="tile is-ancestor">
              <div class="tile is-3 is-parent">
                <div class="tile is-child notification ">
                  <div id="title_notification">
                    <b-icon
                      icon="license"
                      type="is-primary"
                    ></b-icon>
                    <span>Compétitions en cours </span>
                  </div>
                  <div id="content_notification">
                    <ul>
                      <li>
                        <nuxt-link to="/competition/3">Champigny - Homme </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tile is-9 is-parent">
                <div class="tile is-child notification ">
                  <p class="subtitle">Créer une nouvelle compétition</p>
                  <div>
                    <b-steps :has-navigation="false">
                      <b-step-item label="Account" icon="account-key"></b-step-item>
                      <b-step-item label="Profile" icon="account"></b-step-item>
                      <b-step-item label="Social" icon="account-plus"></b-step-item>
                    </b-steps>
                  </div>
                  <div>
                    <b-field horizontal label="Subject" type="is-danger" message="Please enter a subject">
                      <b-input name="subject" expanded></b-input>
                    </b-field>

                    <b-field horizontal label="From">
                      <b-input name="name" placeholder="Name" expanded></b-input>
                      <b-input name="email" type="email" placeholder="nobody@nowhere.com" expanded></b-input>
                    </b-field>

                    <b-field horizontal label="Topic">
                      <b-select placeholder="Select a topic">
                        <option value="1">Bulma</option>
                        <option value="2">Vue.js</option>
                        <option value="3">Buefy</option>
                      </b-select>
                    </b-field>

                    <b-field horizontal label="Message">
                      <b-input type="textarea"></b-input>
                    </b-field>

                    <b-field horizontal><!-- Label left empty for spacing -->
                      <p class="control">
                        <button class="button is-primary">
                          Send message
                        </button>
                      </p>
                    </b-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";

  @Component
  export default class Competitions extends Vue {
  }
</script>

<style scoped>
#content_notification, title_notification {
  margin: 5px 0;
}
</style>
