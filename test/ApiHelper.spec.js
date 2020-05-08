import { ApiHelper } from "~/utils/api_helper/apiHelper";
import API_URL   from "~/utils/api_helper/apiUrl";
import axios from 'axios'

jest.mock('axios');

describe('ApiHelper', () => {
  describe('ApiHelper Function', () => {
    describe('registerUserInCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'registerOrRemoveUserInCompetition');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.AddUserInCompetition(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('RemoveUserFromCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'registerOrRemoveUserInCompetition');
        axios.delete.mockResolvedValue('success');

        const result = await ApiHelper.RemoveUserFromCompetition(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('GetRegistrations', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getRegistrations');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetRegistrationsForACompetition(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('GetJuryPresidents', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getJuryPresidents');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetJuryPresidents(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('AddJuryPresident', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJuryPresident');
        axios.put.mockResolvedValue('success');

        const result = await ApiHelper.AddJuryPresident(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('removeJuryPresident', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJuryPresident');
        axios.delete.mockResolvedValue('success');

        const result = await ApiHelper.RemoveJuryPresident(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('GetJudges', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getJudges');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetJudges(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('AddJudge', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJudge');
        axios.put.mockResolvedValue('success');

        const result = await ApiHelper.AddJudge(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('RemoveJudge', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveJudge');
        axios.delete.mockResolvedValue('success');

        const result = await ApiHelper.RemoveJudge(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('GetChiefRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getChiefRouteSetters');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetChiefRouteSetters(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('AddChiefRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveChiefRouteSetters');
        axios.put.mockResolvedValue('success');

        const result = await ApiHelper.AddChiefRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('RemoveChiefRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveChiefRouteSetters');
        axios.delete.mockResolvedValue('success');

        const result = await ApiHelper.RemoveChiefRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('GetRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getRouteSetters');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetRouteSetters(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('AddRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveRouteSetters');
        axios.put.mockResolvedValue('success');

        const result = await ApiHelper.AddRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('RemoveRouteSetters', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveRouteSetters');
        axios.delete.mockResolvedValue('success');

        const result = await ApiHelper.RemoveRouteSetters(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('GetTechnicalDelegates', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getTechnicalDelegates');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetTechnicalDelegates(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('AddTechnicalDelegates', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveTechnicalDelegates');
        axios.put.mockResolvedValue('success');

        const result = await ApiHelper.AddTechnicalDelegates(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('RemoveTechnicalDelegates', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveTechnicalDelegates');
        axios.delete.mockResolvedValue('success');

        const result = await ApiHelper.RemoveTechnicalDelegates(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('GetOrganizers', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getOrganizers');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetOrganizers(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('AddOrganizers', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveOrganizers');
        axios.put.mockResolvedValue('success');

        const result = await ApiHelper.AddOrganizers(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('RemoveOrganizers', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addOrRemoveOrganizers');
        axios.delete.mockResolvedValue('success');

        const result = await ApiHelper.RemoveOrganizers(1, 2)
        expect(spy).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual('success')
      })
    })

    describe('AddRound', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addRound');
        axios.post.mockResolvedValue('success');

        const result = await ApiHelper.AddRound(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('AddBoulderingResult', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'addBoulderingResult');
        axios.post.mockResolvedValue('success');

        const result = await ApiHelper.AddBoulderingResult({}, 1, 2, 3)
        expect(spy).toHaveBeenCalledWith(1, 2, 3);
        expect(result).toEqual('success')
      })
    })

    describe('CreateCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'createOrGetCompetitions');
        axios.post.mockResolvedValue('success');
        const bodyExample = {
          name: 'Chalais Savoyard',
          type: 'Speed',
          startDate: new Date(),
          endDate: new Date(),
          address: '19 Avenue Villejuif',
          city: 'Choisy',
          postalCode: '944320',
          categories: [
            {sex: 'female', name: 'minime'}
          ]
        }

        const result = await ApiHelper.CreateCompetition(bodyExample)
        expect(spy).toHaveBeenCalled();
        expect(result).toEqual('success')
      })
    })

    describe('GetCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'updateOrGetCompetition');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetCompetition(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('GetCompetitionRankings', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getCompetitionRankings');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetCompetitionRankings(1)
        expect(spy).toHaveBeenCalledWith(1);
        expect(result).toEqual('success')
      })
    })

    describe('getCompetitions', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'createOrGetCompetitions');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetCompetitions()
        expect(spy).toHaveBeenCalled();
        expect(result).toEqual('success')
      })

      test('Should call with query args', async () => {
        const spy = jest.spyOn(API_URL, 'createOrGetCompetitions');
        axios.get.mockResolvedValue('success');
        const fakeQuery = '{"startDate":{"$gte":"2020-05-07T22:00:00.000Z"}}'

        const result = await ApiHelper.GetCompetitions(fakeQuery)
        expect(spy).toHaveBeenCalledWith(fakeQuery);
        expect(result).toEqual('success')
      })
    })

    describe('GetUserCount', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getUserCount');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetUserCount()
        expect(spy).toHaveBeenCalled();
        expect(result).toEqual('success')
      })
    })

    describe('getUserCompetitionRoles', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'getUserCompetitionRoles');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.GetUserCompetitionRoles(3, 4)
        expect(spy).toBeCalledWith(3, 4);
        expect(result).toEqual('success')
      })
    })
  })
})
