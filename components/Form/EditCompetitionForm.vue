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
        <b-input v-model="internalCompetition.name"
                 name="subject"
                 expanded
                 class="name"
        />
      </b-field>

      <b-field horizontal label="Date">
        <b-field>
          <b-datepicker
            editable
            v-model="internalCompetition.startDate"
            placeholder="Date de début"
            icon="calendar-today"
            trap-focus
            class="date-start"
          />
        </b-field>
        <b-field>
          <b-datepicker
            editable
            v-model="internalCompetition.endDate"
            placeholder="Date de fin"
            icon="calendar-today"
            trap-focus
            class="date-end"
          />
        </b-field>
      </b-field>

      <b-field horizontal label="Compétition open">
        <b-switch v-model="internalCompetition.open" class="status"/>
      </b-field>
      <b-field horizontal label="Date d'accueil">
        <b-datetimepicker
          v-model="internalCompetition.welcomingDate"
          placeholder="Date d'accueil"
          icon="calendar-today"
          trap-focus
          class="date-welcome"
        />
      </b-field>

      <b-field horizontal label="Type">
        <b-select
          v-model="internalCompetition.type"
          placeholder="Selectionner type de compétition"
          class="type"
        >
          <option
            v-for="(type, key) in typeCompetition"
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
            class="street"
          />
        </b-field>
        <b-field expanded>
          <b-input v-model="internalCompetition.city" placeholder="Ville" class="city" />
        </b-field>
        <b-field expanded>
          <b-input
            v-model="internalCompetition.postalCode"
            placeholder="Code postal"
            class="postal-num"
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

      <b-field
        v-if="
          internalCompetition.categories &&
          Array.isArray(internalCompetition.categories).length > 0
        "
      >
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
        <b-input v-model="internalCompetition.description" type="textarea" class="description" />
      </b-field>

      <b-field horizontal label="Agenda">
        <b-input v-model="internalCompetition.agenda" type="textarea" class="agenda" />
      </b-field>

      <div class="is-pulled-right">
        <b-button
          type="is-primary"
          tag="button"
          native-type="submit"
          :loading="isLoading"
          class="update-competition"
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
  typeCompetition = TypeCompetition
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
    const competitionCategories = Array.isArray(
      this.internalCompetition?.categories
    )
      ? this.internalCompetition.categories
      : undefined
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

    let competitionCategories = Array.isArray(
      this.internalCompetition?.categories
    )
      ? this.internalCompetition.categories
      : undefined

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
