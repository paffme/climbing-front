export class Competition {
  name: string;
  // public startDate: Date
  // public endDate: Date
  // public openStatus: boolean
  // public welcomeDate: Date
  // public type: string
  // public street: string
  // public city: string
  // public postalCode: string
  // public categoriesFemale: string[]
  // public categoriesMale: string[]
  // public description: string
  // public agenda: string

  constructor(name: string,
              public startDate: Date,
              public endDate: Date,
              public openStatus: boolean,
              public welcomeDate: Date,
              public type: string,
              public street: string,
              public city: string,
              public postalCode: string,
              public categoriesFemale: string[],
              public categoriesMale: string[],
              public description: string,
              public agenda: string) {
    this.name = name;
  }

  setDefaultDate() {
    let date: Date = new Date();
    date.setDate(date.getDate() + 1);
    this.welcomeDate = new Date(date.getTime());

    date.setDate(date.getDate() + 1);
    this.startDate = new Date(date.getTime());

    date.setDate(date.getDate() + 1);
    this.endDate = new Date(date.getTime());
  }
}
