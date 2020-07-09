<template>
  <b-button
    :loading="isLoading"
    rounded
    icon-left="download"
    @click="downloadPdf"
  >
    Télécharger le PDF
  </b-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ApiHelper } from '~/utils/api_helper/apiHelper'
import { AxiosHelper } from '~/utils/axiosHelper'

@Component
export default class BtnDownloadPdf extends Vue {
  @Prop(String) typeCompetition!: 'general' | 'rounds' | 'groups'
  @Prop(Number) competitionId!: number
  @Prop(Number) roundId!: number
  @Prop(Number) groupId!: number

  isLoading = false

  async downloadPdf() {
    this.isLoading = true
    try {
      let response: any = null
      if (this.typeCompetition === 'general' && this.competitionId) {
        response = await ApiHelper.GetGeneralRankingPdf(this.competitionId)
        console.log('t', response)
      }
      if (
        this.typeCompetition === 'rounds' &&
        this.competitionId &&
        this.roundId
      ) {
        response = await ApiHelper.GetRoundRankingPdf(
          this.competitionId,
          this.roundId
        )
        console.log('t', response)
      }
      if (
        this.typeCompetition === 'groups' &&
        this.competitionId &&
        this.roundId &&
        this.groupId
      ) {
        response = await ApiHelper.GetGroupRankingPdf(
          this.competitionId,
          this.roundId,
          this.groupId
        )
        console.log('t', response)
      }

      if (!response) return

      this.isLoading = false

      const fileURL = window.URL.createObjectURL(new Blob([response.data]))

      console.log('fileUrl', fileURL)

      const fileLink = document.createElement('a')

      fileLink.href = fileURL

      fileLink.setAttribute(
        'download',
        `rankings_${this.competitionId}_${Date.now()}.pdf`
      )

      document.body.appendChild(fileLink)

      fileLink.click()
    } catch (err) {
      this.isLoading = false
      AxiosHelper.HandleAxiosError(this, err)
    }
  }
}
</script>

<style scoped></style>
