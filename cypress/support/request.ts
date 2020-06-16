import axios from "axios";


const BASE_URL = "https://paffme.hdaroit.fr/api/v1";

export class RequestPaffme {
  private static createUser: string = `${BASE_URL}/users`;
  private static logUser: string = `${BASE_URL}/users/token`;
  private static createCompetition: string = `${BASE_URL}/competitions`;

  public static async createUserReq(user: any) {
    return await axios.post(this.createUser, {
      email: user.email,
      password: user.password,
      lastName: user.lastName,
      firstName: user.firstName,
      sex: user.sex,
      club: user.club,
      birthYear: user.birthYear
    });
  }

  public static async logUserReq(user: any) {
    return await axios.post(this.logUser, {
      email: user.email,
      password: user.password
    });
  }

  public static async rmUserReq(userId: number, token: any) {
    return await axios.delete(this.deleteUser(userId), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  public static async logAndRmUserReq(user: any) {
    const login: any = await this.logUserReq(user);
    const rm: any = await this.rmUserReq(login.data.userId, login.data.token);
    return rm;
  }

  private static deleteUser = (id: number) => {
    return `${BASE_URL}/users/${id}`;
  };
}
