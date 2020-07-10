<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="notification content is-warning">
        <p>Gestion de l'apercu du bloc</p>
        <ol>
          <li>Uploader la photo</li>
          <li>Une fois uploader la photo les blocs seront reconnus par l'IA</li>
        </ol>
      </div>
    </div>
    <div class="column is-offset-3 is-6 upload">
      <div class="image" v-if="boulderId && picture !== null">
        <AnnotationComponent :dimImg="{height: picture.height, width: picture.width}" :urlImage="picture.url"/>
        <b-loading
            :active.sync="isLoading"
            :can-cancel="true"
            :is-full-page="false"
        ></b-loading>
      </div>
      <div class="tags" v-if="dropFile !== null">
        <span class="tag is-primary">
          {{ dropFile.name }}
          <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile()"
          ></button>
        </span>
      </div>
      <div>
        <b-field>
          <b-upload accept="image/*" drag-drop expanded type="file" v-model="dropFile">
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"/>
                </p>
                <p>Ajouter une image ici</p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <b-button
            @click="uploadPhoto(competition.id, roundId, groupId, boulderId)"
            type="is-info"
            icon-left="upload"
            expanded
            v-show="dropFile !== null"
        >
          Uploader
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import {
    APIBoulderingRounds, APIBoulderPicture,
    APICompetition,
    APIUserCompetitionRoles
  } from "~/definitions";
  import { ApiHelper } from "~/utils/api_helper/apiHelper";
import { AxiosHelper } from '~/utils/axiosHelper'
import AnnotationComponent from "~/components/AnnotationComponent.vue";

@Component({
  components: { AnnotationComponent },
  middleware: ['isAuth', 'setHeader']
})
export default class ImagePage extends Vue {
  @Prop(Object) competition!: APICompetition
  @Prop(Object) role!: APIUserCompetitionRoles
  @Prop(Object) rounds!: APIBoulderingRounds;

  picture: APIBoulderPicture | null = null;

  roundId: number | null = null;
  boulderId: number | null = null;
  groupId: number | null = null;

  hasUploadedPhoto = false;

  dropFile = null;
  isLoading = true;

  created() {
    this.isLoading = true;
    this.roundId = parseInt(this.$route.query.roundId as string, 10);
    this.boulderId = parseInt(this.$route.query.boulderId as string, 10);
    this.groupId = parseInt(this.$route.query.groupId as string, 10);

    if (this.competition.id && this.roundId && this.boulderId && this.groupId)
      this.getPhoto(
          this.competition.id,
          this.roundId,
          this.groupId,
          this.boulderId
      );
  }

  async getPhoto(
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number
  ) {
    try {
      const photo = await ApiHelper.GetBoulderPhoto(
          competitionId,
          roundId,
          groupId,
          boulderId
      );
      this.picture = photo.data;
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      console.log("err", err);
      if (err.response?.data?.code === 'BOULDER_HAS_NO_PHOTO') {
        return
      }
      AxiosHelper.HandleAxiosError(this, err)
    }
  }

  async uploadPhoto(
    competitionId: number,
    roundId: number,
    groupId: number,
    boulderId: number
  ) {
    try {
      const formData = new FormData()
      formData.append("photo", this.dropFile!);

      await ApiHelper.UpdateBoulderPhoto(
          formData,
          competitionId,
          roundId,
          groupId,
          boulderId
      );
      this.hasUploadedPhoto = true;
      this.$buefy.toast.open({
        type: "is-success",
        message: "Photo upload succes"
      });

      if (this.competition.id && this.roundId && this.boulderId && this.groupId)
        await this.getPhoto(
            competitionId,
            roundId,
            groupId,
            boulderId
        );

    } catch (err) {
      AxiosHelper.HandleAxiosError(this, err);
    }
  }

  deleteDropFile() {
    this.dropFile = null;
  }
}
</script>

<style scoped>
.upload {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
