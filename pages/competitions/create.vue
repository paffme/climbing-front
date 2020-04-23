<template>
  <div class="columns">
    <div class="column">
      <div class="page_header">
        <GoBackBtn></GoBackBtn>
        <h1 class="title">Créer une nouvelle compétition</h1>
      </div>

      <div class="custom_section page_content">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-primary">
              <nuxt-link to="/competitions">Compétitions</nuxt-link>
            </li>
            <li class="is-active"><a href="#" aria-current="page">Création</a></li>
          </ul>
        </nav>
        <div class="tile is-ancestor">
          <div class="tile is-3 is-parent">
            <div class="tile is-child notification">
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
                    <nuxt-link to="/competitions/3">Champigny - Homme</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="tile is-9 is-parent">
            <div class="tile is-child notification">
              <p class="subtitle">Créer une nouvelle compétition</p>
              <div>
                <b-steps :has-navigation="false">
                  <b-step-item label="Information" icon="account-key"></b-step-item>
                  <b-step-item label="Confirmation" icon="account-plus"></b-step-item>
                </b-steps>
              </div>
              <form v-on:submit.prevent="registerCompetition()" id="form">
                <b-field horizontal label="Nom compétition">
                  <b-input name="subject" expanded v-model="competition.name"></b-input>
                </b-field>

                <b-field horizontal label="Date">
                  <b-field>
                    <b-datepicker
                      placeholder="Date de début"
                      icon="calendar-today"
                      trap-focus
                      v-model="competition.startDate"
                    >
                    </b-datepicker>
                  </b-field>
                  <b-field>
                    <b-datepicker
                      placeholder="Date de fin"
                      icon="calendar-today"
                      trap-focus
                      v-model="competition.endDate"
                    >
                    </b-datepicker>
                  </b-field>
                </b-field>

                <b-field horizontal label="Type">
                  <b-select placeholder="Selectionner type de compétition" v-model="competition.type">
                    <option v-for="type in typeCompetition" :value="type">{{ type }}</option>
                  </b-select>
                </b-field>

                <b-field horizontal grouped label="Adresse">
                  <b-field>
                    <b-input placeholder="Adresse" v-model="competition.address"></b-input>
                  </b-field>
                  <b-field expanded>
                    <b-input placeholder="Ville" v-model="competition.city"></b-input>
                  </b-field>
                  <b-field expanded>
                    <b-input placeholder="Code postal" v-model="competition.postalCode"></b-input>
                  </b-field>
                </b-field>

                <b-field id="category" horizontal label="Categories" grouped>
                  <FormCompetitionCategories v-for="(competition, index) in competition.categories"
                                             :default-value="competition" v-on:category-value="addCategory" v-on:delete="removeCategory(index)" :can-be-delete="true" :key="index"></FormCompetitionCategories>
                </b-field>

                {{ competition.categories }}

                <b-button type="is-primary" tag="button" v-on:click="registerCompetition">Créer compétition</b-button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import GoBackBtn from "~/components/GoBackBtn.vue";
  import { CategoryName, Competition, Sex, TypeCompetition } from "~/definitions";
  import FormCompetitionCategories from "~/components/Form/FormCompetitionCategories.vue";

  @Component({
    components: { GoBackBtn, FormCompetitionCategories },
    data: function() {
      return {
        typeCompetition: TypeCompetition
      }
    }
  })
  export default class Competitions extends Vue {
    competition: Competition = {
      name: null,
      type: null,
      startDate: null,
      endDate: null,
      address: null,
      city: null,
      postalCode: null,
      categories: [{
        sex: Sex.Male,
        name: CategoryName.Benjamin
      }]
    };

    registerCompetition() {
      console.log('this.competition', this.competition)
    }

    addCategory(data: any) {
      console.log('this.competition.categories', this.competition.categories)
      this.competition.categories.push(data)
    }

    removeCategory(index: number) {
      console.log('(Before)this.competition.categories', index)
      this.competition.categories.splice(index, 1)
      console.log('(After)this.competition.categories', this.competition.categories)

    }
  }
</script>

<style scoped>
  #content_notification, title_notification {
    margin: 5px 0;
  }
</style>
