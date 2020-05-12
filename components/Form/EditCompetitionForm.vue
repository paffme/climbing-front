<template>
  <div>
    <div class="block">
      <span class="subtitle">Configuration de la compétition</span>
    </div>
    <form
      v-if="internalCompetition"
      class="form"
      @submit.prevent="updateCompetition(internalCompetition)"
    >
      <b-field horizontal label="Nom compétition">
        <b-input v-model="internalCompetition.name" name="subject" expanded />
      </b-field>

      <b-field horizontal label="Date">
        <b-field>
          <b-datepicker
            v-model="internalCompetition.startDate"
            placeholder="Date de début"
            icon="calendar-today"
            trap-focus
          />
        </b-field>
        <b-field>
          <b-datepicker
            v-model="internalCompetition.endDate"
            placeholder="Date de fin"
            icon="calendar-today"
            trap-focus
          />
        </b-field>
      </b-field>

      <b-field horizontal label="Compétition open">
        <b-switch v-model="internalCompetition.open" />
      </b-field>
      <b-field horizontal label="Date d'accueil">
        <b-datetimepicker
          v-model="internalCompetition.welcomingDate"
          placeholder="Date d'accueil"
          icon="calendar-today"
          trap-focus
        />
      </b-field>

      <b-field horizontal label="Type">
        <b-select
          v-model="internalCompetition.type"
          placeholder="Selectionner type de compétition"
        >
          <option
            v-for="(type, key) in typeCompetiton"
            :key="key"
            :value="type"
          >
            {{ type }}
          </option>
        </b-select>
      </b-field>

      <b-field horizontal grouped label="Adresse">
        <b-field>
          <b-input
            v-model="internalCompetition.address"
            placeholder="Adresse"
          />
        </b-field>
        <b-field expanded>
          <b-input v-model="internalCompetition.city" placeholder="Ville" />
        </b-field>
        <b-field expanded>
          <b-input
            v-model="internalCompetition.postalCode"
            placeholder="Code postal"
          />
        </b-field>
      </b-field>

      <b-field id="category" horizontal label="Categories" grouped>
        <FormCompetitionCategories
          :default-value="internalCompetition"
          :can-be-delete="true"
          @category-value="addCategory"
          @delete="removeCategory(index)"
        />
      </b-field>

      <b-field v-if="internalCompetition.categories.length > 0">
        <b-select v-model="selectedOptions" multiple>
          <option
            v-for="(categorie, index) in internalCompetition.categories"
            :key="index"
            @click="categoryIndex = index"
          >
            <span>{{ categorie.sex }} - {{ categorie.name }}</span>
          </option>
        </b-select>
        <b-button
          v-if="selectedOptions.length > 0"
          icon-right="delete"
          type="is-danger"
          @click="removeCategory"
        />
      </b-field>

      <b-field horizontal label="Description">
        <b-input v-model="internalCompetition.description" type="textarea" />
      </b-field>

      <b-field horizontal label="Agenda">
        <b-input v-model="internalCompetition.agenda" type="textarea" />
      </b-field>

      <div class="is-pulled-right">
        <b-button
          type="is-primary"
          tag="button"
          native-type="submit"
          :loading="isLoading"
        >
          Valider compétition
        </b-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import { Competition, TypeCompetition } from '~/definitions'
import FormCompetitionCategories from '~/components/Form/FormCompetitionCategories.vue'
import { ApiHelper } from '~/utils/api_helper/apiHelper'

@Component({
  components: { FormCompetitionCategories }
})
export default class EditCompetitionForm extends Vue {
  @Prop({ default: Object }) readonly internalCompetition!: Competition
  categoryIndex: number | null = null
  selectedOptions = []
  typeCompetiton = TypeCompetition
  isLoading = false

  async updateCompetition(competitionData: Competition) {
    competitionData.id = this.internalCompetition?.id
    console.log('competitionData', competitionData)
    try {
      await ApiHelper.UpdateCompetition(competitionData)
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Compétition mise à jours'
      })
    } catch (err) {
      console.log('err', err)
      this.$buefy.toast.open({
        type: 'is-danger',
        message: "Une erreur s'est produite"
      })
    }
  }

  addCategory(result: any) {
    const competitionCategories =
      this.internalCompetition && this.internalCompetition.categories
    if (!competitionCategories) {
      return
    }
    let alreadyExist = false
    if (competitionCategories.length === 0) {
      alreadyExist = false
    } else {
      competitionCategories.forEach((category) => {
        if (_.isEqual(category, result)) {
          alreadyExist = true
        }
      })
    }
    if (!alreadyExist) {
      competitionCategories.push(result)
    } else {
      this.$buefy.toast.open({
        type: 'is-info',
        message: 'Cette catégorie existe déjà'
      })
    }
  }

  removeCategory() {
    if (this.categoryIndex === null) {
      return
    }

    let competitionCategories =
      this.internalCompetition && this.internalCompetition.categories

    if (!competitionCategories) {
      return
    }

    if (this.categoryIndex === 0 && competitionCategories.length === 1) {
      competitionCategories = []
      return
    }
    competitionCategories.splice(this.categoryIndex, 1)
  }
}
</script>

<style scoped></style>
