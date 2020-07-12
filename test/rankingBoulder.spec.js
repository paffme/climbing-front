import boulderFilter from '~/utils/boulderFilter'
import { RawRankingType } from '~/definitions'

describe('rankingBoulder', () => {
  test('boulderFilter', () => {
    const roundRanking = {
      type: RawRankingType.CIRCUIT,
      data: {
        boulders: [0, 1, 2, 3],
        rankings: [
          {
            tops: [true, false],
            topsInTries: [2, 0],
            zones: [true, false],
            zonesInTries: [2, 0],
            ranking: 1,
            climber: {
              id: 4,
              club: 'FFME',
              firstName: 'Femme',
              lastName: 'Veteran'
            }
          },
          {
            tops: [false, false],
            topsInTries: [0, 0],
            zones: [true, false],
            zonesInTries: [3, 0],
            ranking: 2,
            climber: {
              id: 8,
              club: 'FFME',
              firstName: 'Femme2',
              lastName: 'Senior2'
            }
          }
        ]
      }
    }

    const test = boulderFilter.getGroupsRankings(roundRanking, 0)

    expect(test).toEqual([
      {
        top: true,
        topInTry: 2,
        zone: true,
        type: RawRankingType.CIRCUIT,
        zoneInTry: 2,
        ranking: 1,
        climber: {
          id: 4,
          club: 'FFME',
          firstName: 'Femme',
          lastName: 'Veteran'
        }
      },
      {
        top: false,
        topInTry: 0,
        zone: true,
        type: RawRankingType.CIRCUIT,
        zoneInTry: 3,
        ranking: 2,
        climber: {
          id: 8,
          club: 'FFME',
          firstName: 'Femme2',
          lastName: 'Senior2'
        }
      }
    ])
  })

  test('get Per Bloc', () => {
    // Je souhaite récupéré les résultats du premier bloc
    const roundRanking = {
      type: RawRankingType.CIRCUIT,
      data: [
        {
          tops: [true, false],
          topsInTries: [2, 0],
          zones: [true, false],
          zonesInTries: [2, 0],
          ranking: 1,
          climber: {
            id: 4,
            club: 'FFME',
            firstName: 'Femme',
            lastName: 'Veteran'
          }
        }
      ]
    }
    const blocIndex = 0

    const test = boulderFilter.getPerBloc(roundRanking.data[0], blocIndex)

    expect(test).toEqual({
      top: true,
      topInTry: 2,
      zone: true,
      zoneInTry: 2,
      ranking: 1,
      climber: {
        id: 4,
        club: 'FFME',
        firstName: 'Femme',
        lastName: 'Veteran'
      }
    })
  })

  test('getGeneralRankings', () => {
    const data = {
      veteran: {
        male: [
          {
            ranking: 1,
            climber: {
              id: 8,
              firstName: 'Homme',
              lastName: 'Veteran',
              club: 'FFME'
            }
          }
        ],
        female: [
          {
            ranking: 1,
            climber: {
              id: 8,
              firstName: 'Homme',
              lastName: 'Veteran',
              club: 'FFME'
            }
          }
        ]
      },
      minime: {
        female: [
          {
            ranking: 1,
            climber: {
              id: 8,
              firstName: 'Homme',
              lastName: 'Veteran',
              club: 'FFME'
            }
          }
        ]
      },
      poussin: {
        male: [
          {
            ranking: 1,
            climber: {
              id: 8,
              firstName: 'Homme',
              lastName: 'Veteran',
              club: 'FFME'
            }
          }
        ]
      }
    }

    expect(boulderFilter.getGeneralRankings(data)).toStrictEqual([
      { category: 'veteran', genre: ['female', 'male'] },
      { category: 'minime', genre: ['female'] },
      { category: 'poussin', genre: ['male'] }
    ])
  })
})
