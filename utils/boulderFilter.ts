import {
  APIGroupRanking,
  APIRankingResponse,
  APIRoundRanking,
  CategoriesSelect,
  CategoryName,
  CountedRankings,
  RawCountedRanking,
  RawCountedRankingWithType,
  RawRankingType,
  Sex,
  TempCategoriesSelect
} from '~/definitions'

export default {
  getRound(
    apiRoundRanking: APIRoundRanking,
    secondRound?: boolean
  ): Array<RawCountedRanking | null> {
    return apiRoundRanking.data.map((elem, index) => {
      if (secondRound) index = 1
      const result: RawCountedRanking = {
        top: null,
        topInTry: null,
        zone: null,
        zoneInTry: null,
        ranking: elem.ranking,
        climber: elem.climber
      }

      if (typeof elem.tops[index] === 'boolean') result.top = elem.tops[index]
      if (elem.topsInTries[index] >= 0)
        result.topInTry = elem.topsInTries[index]
      if (typeof elem.zones[index] === 'boolean')
        result.zone = elem.zones[index]
      if (elem.zonesInTries[index] >= 0)
        result.zoneInTry = elem.zonesInTries[index]

      if (!result.top && !result.zone) return null

      return result
    })
  },
  getGeneralRankings(
    apiGroupRanking: APIRankingResponse
  ): Array<CategoriesSelect> {
    if (!apiGroupRanking) return []
    const final = []
    for (const [key, value] of Object.entries(apiGroupRanking)) {
      const haveFemaleCategory =
        value.female && Object.keys(value.female).length !== 0
      const haveMaleCategory =
        value.male && Object.keys(value.male).length !== 0

      if (!haveFemaleCategory && !haveMaleCategory) continue

      const temp: TempCategoriesSelect = {
        category: undefined,
        genre: []
      }

      if (haveFemaleCategory) {
        temp.genre.push('female' as Sex)
      }
      if (haveMaleCategory) {
        temp.genre.push('male' as Sex)
      }

      temp.category = key as CategoryName
      final.push(temp as CategoriesSelect)
    }

    return final
  },
  getGroupsRankings(
    apiGroupRanking: APIGroupRanking,
    blocNumber: number
  ): Array<RawCountedRankingWithType | null> | undefined {
    const type = apiGroupRanking.type
    if (type === RawRankingType.UNLIMITED_CONTEST) {
      console.log('Is Ulimited contest')
    } else {
      if (!apiGroupRanking.data.rankings) return
      return ((apiGroupRanking.data
        .rankings as unknown) as CountedRankings[]).map((ranking) => {
        const result: RawCountedRankingWithType = {
          type,
          top: null,
          topInTry: null,
          zone: null,
          zoneInTry: null,
          ranking: ranking.ranking,
          climber: ranking.climber
        }
        if (typeof ranking.tops[blocNumber] === 'boolean')
          result.top = ranking.tops[blocNumber]
        if (ranking.topsInTries[blocNumber] >= 0)
          result.topInTry = ranking.topsInTries[blocNumber]
        if (typeof ranking.zones[blocNumber] === 'boolean')
          result.zone = ranking.zones[blocNumber]
        if (ranking.zonesInTries[blocNumber] >= 0)
          result.zoneInTry = ranking.zonesInTries[blocNumber]

        console.log('result', result)
        if (typeof result.top !== 'boolean' && typeof result.zone !== 'boolean')
          return null

        return result
      })
    }
  },
  getPerBloc(
    apiRoundRanking: CountedRankings,
    blocIndex: number
  ): RawCountedRanking | undefined {
    if (!apiRoundRanking) return
    return {
      top: apiRoundRanking.tops[blocIndex],
      topInTry: apiRoundRanking.topsInTries[blocIndex],
      zone: apiRoundRanking.zones[blocIndex],
      zoneInTry: apiRoundRanking.zonesInTries[blocIndex],
      ranking: apiRoundRanking.ranking,
      climber: apiRoundRanking.climber
    }
  }
}
