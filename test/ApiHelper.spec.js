import { API_URL, ApiHelper } from "~/utils/apiHelper";
import axios from 'axios';

jest.mock('axios');

describe('ApiHelper', () => {
  describe('API_URL', () => {
    test('Should return a correct URL', () => {
      expect(API_URL.registerOrRemoveUserInCompetition(1, 2)).toEqual('/competitions/1/registrations/2')
      expect(API_URL.getRegistrations(1, 2)).toEqual('/competitions/1/registrations')
      expect(API_URL.getJuryPresidents(1, 2)).toEqual('/competitions/1/jury-presidents')
      expect(API_URL.addOrRemoveJuryPresident(1, 2)).toEqual('/competitions/1/jury-presidents/2')
      expect(API_URL.getJudges(1)).toEqual('/competitions/1/judges')
      expect(API_URL.addOrRemoveJudge(1, 2)).toEqual('/competitions/1/judges/2')
      expect(API_URL.getChiefRouteSetters(1)).toEqual('/competitions/1/chief-route-setters')
      expect(API_URL.addOrRemoveChiefRouteSetters(1, 2)).toEqual('​/competitions​/1​/chief-route-setters​/2')
      expect(API_URL.getRouteSetters(1)).toEqual('/competitions/1/route-setters')
      expect(API_URL.addOrRemoveRouteSetters(2, 1)).toEqual('​/competitions​/2​/route-setters​/1')
      expect(API_URL.getTechnicalDelegates(1)).toEqual('/competitions/1/technical-delegates')
      expect(API_URL.addOrRemoveTechnicalDelegates(2, 1)).toEqual('​/competitions​/2​/technical-delegates/1')
      expect(API_URL.getOrganizers(1)).toEqual('/competitions/1/organizers')
      expect(API_URL.addOrRemoveOrganizers(2, 1)).toEqual('​/competitions​/2​/organizers/1')
      expect(API_URL.addRound(2)).toEqual('/competitions/2/bouldering-rounds')
      expect(API_URL.addBoulderingResult(2, 2, 3)).toEqual('/competitions/2/bouldering-rounds/2/boulders/3/results')
    })
  })

  describe('ApiHelper Function', () => {
    describe('registerUserInCompetition', () => {
      test('Should call with right args', async () => {
        const spy = jest.spyOn(API_URL, 'registerOrRemoveUserInCompetition');
        axios.get.mockResolvedValue('success');

        const result = await ApiHelper.RegisterUserInCompetition(1, 2)
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

        const result = await ApiHelper.GetRegistrations(1)
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
  })
})
