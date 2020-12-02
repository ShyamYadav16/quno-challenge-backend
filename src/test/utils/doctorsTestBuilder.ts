import {Doctor} from "../../entity/doctor";
import {DoctorsBuilder, DoctorsBuilderImpl} from "../../builder/doctorsBuilder";
import {DoctorsRepository} from "../../repository/doctorsRepository";
import {DoctorsService} from "../../service/doctorsService";
import {Result} from "../../entity/result";

export default class DoctorsTestBuilder {

  private doctor: Doctor = new Doctor('', '', '', '',
    0, 0, 0, 0, 0, '');

  public static newDoctor() {
    return new DoctorsTestBuilder();
  }

  public withName(name: string) {
    this.doctor.name = name;
    return this;
  }

  public withCity(city: string) {
    this.doctor.city = city;
    return this;
  }

  public withCountry(country: string) {
    this.doctor.country = country;
    return this;
  }

  public withAvatarUrl(avatarUrl: string) {
    this.doctor.avatarUrl = avatarUrl;
    return this;
  }

  public withQunoScoreNumber(qunoScoreNumber: number) {
    this.doctor.qunoScoreNumber = qunoScoreNumber;
    return this;
  }

  public withRatingsAvergae(ratingsAverage: number) {
    this.doctor.ratingsAverage = ratingsAverage;
    return this;
  }

  public withTreatmentsLastYear(treatmentsLastYear: number) {
    this.doctor.treatmentsLastYear = treatmentsLastYear;
    return this;
  }

  public withYearsExperience(yearsExperience: number) {
    this.doctor.yearsExperience = yearsExperience;
    return this;
  }

  public withBasePrice(basePrice: number) {
    this.doctor.basePrice = basePrice;
    return this;
  }

  public withSlug(slug: string) {
    this.doctor.slug = slug;
    return this;
  }

  public withDefaulValues(name: string, city: string, country: string, avatarUrl: string, qunoScoreNumber: number,
                          ratingsAverage: number, treatmentsLastYear: number, yearsExperience: number, basePrice: number,
                          slug: string) {
    return this.withName(name).withCity(city).withCountry(country).withAvatarUrl(avatarUrl)
      .withQunoScoreNumber(qunoScoreNumber).withRatingsAvergae(ratingsAverage).withTreatmentsLastYear(treatmentsLastYear)
      .withYearsExperience(yearsExperience).withBasePrice(basePrice).withSlug(slug);
  }

  public build(): Doctor {
    return this.doctor;
  }

  public static createDoctor() {
    return DoctorsTestBuilder.newDoctor().withDefaulValues('Dr. Abc Xyz', 'Berlin', 'Germany', 'http://skhfbs.com',
      9, 4, 2000, 15, 1000, 'dr.-abc-xyz');
  }

  public static getMockService(result: Result) {
    const Mock = jest.fn<DoctorsService, []>(() => ({
      getAllDoctors: jest.fn().mockReturnValue([this.createDoctor()]),
      getDoctorById: jest.fn().mockReturnValue(this.createDoctor()),
      saveDoctorsDetails: jest.fn().mockReturnValue(result)
    }));
    return new Mock();
  }

  public static getMockRepo() {
    const Mock = jest.fn<DoctorsRepository, []>(() => ({
      getAllDoctors: jest.fn().mockReturnValue([this.createDoctor()]),
      getDoctorById: jest.fn().mockReturnValue(this.createDoctor()),
      saveDoctor: jest.fn().mockReturnValue(this.createDoctor())
    }));
    return new Mock();
  }

  public static getMockBuilder() {
    const Mock = jest.fn<DoctorsBuilder, []>(() => ({
      prepareSlug: jest.fn().mockReturnValue(new DoctorsBuilderImpl(this.getMockRepo())),
      prepare: jest.fn().mockReturnValue(new DoctorsBuilderImpl(this.getMockRepo())),
      save: jest.fn().mockReturnValue(new DoctorsBuilderImpl(this.getMockRepo()))
    }));

    return new Mock();
  }

}