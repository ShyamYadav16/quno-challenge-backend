export class Doctor {

  constructor(name: string, city: string, country: string, avatarUrl: string, qunoScoreNumber: number,
              ratingsAverage: number, treatmentsLastYear: number, yearsExperience: number, basePrice: number,
              slug: string, qunoscoreText?: string, id?: number) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.avatarUrl = avatarUrl;
    this.qunoScoreNumber = qunoScoreNumber;
    this.ratingsAverage = ratingsAverage;
    this.treatmentsLastYear = treatmentsLastYear;
    this.yearsExperience = yearsExperience;
    this.basePrice = basePrice;
    this.slug = slug;
    this.qunoscoreText = qunoscoreText;
  }

  id?: number;

  name: string;

  city: string;

  country: string;

  avatarUrl: string;

  qunoScoreNumber: number;

  qunoscoreText?: string;

  ratingsAverage: number;

  treatmentsLastYear: number;

  yearsExperience: number;

  basePrice: number;

  slug: string;

}