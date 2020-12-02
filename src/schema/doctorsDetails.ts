import {IsNotEmpty, IsNumber} from "class-validator";

export class DoctorsDetails {

  constructor(name: string, city: string, country: string, avatarUrl: string, qunoScoreNumber: number,
              ratingsAverage: number, treatmentsLastYear: number, yearsExperience: number, basePrice: number) {
    this.name = name;
    this.city = city;
    this.country = country;
    this.avatarUrl = avatarUrl;
    this.qunoScoreNumber = qunoScoreNumber;
    this.ratingsAverage = ratingsAverage;
    this.treatmentsLastYear = treatmentsLastYear;
    this.yearsExperience = yearsExperience;
    this.basePrice = basePrice;
  }

  @IsNotEmpty({
    message: 'name is required'
  })
  name: string;

  @IsNotEmpty({
    message: 'city is required'
  })
  city: string;

  @IsNotEmpty({
    message: 'country is required'
  })
  country: string;

  @IsNotEmpty({
    message: 'avatar_url is required'
  })
  avatarUrl: string;

  @IsNotEmpty({
    message: 'quno_score_number is required'
  })
  @IsNumber({}, {
    message: 'quno_score_number must be a number'
  })
  qunoScoreNumber: number;

  @IsNotEmpty({
    message: 'ratings_average is required'
  })
  @IsNumber({}, {
    message: 'ratings_average must be a number'
  })
  ratingsAverage: number;

  @IsNotEmpty({
    message: 'treatments_last_year is required'
  })
  @IsNumber({}, {
    message: 'treatments_last_year must be a number'
  })
  treatmentsLastYear: number;

  @IsNotEmpty({
    message: 'years_experience is required'
  })
  @IsNumber({}, {
    message: 'years_experience must be a number'
  })
  yearsExperience: number;

  @IsNotEmpty({
    message: 'base_price is required'
  })
  @IsNumber({}, {
    message: 'base_price must be a number'
  })
  basePrice: number;

}