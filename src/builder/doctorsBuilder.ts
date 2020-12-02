import {DoctorsDetails} from "../schema/doctorsDetails";
import {Doctor} from "../entity/doctor";
import {inject, injectable} from "inversify";
import {Types} from "../config/types";
import {DoctorsRepository} from "../repository/doctorsRepository";
import {Result} from "../entity/result";

export interface DoctorsBuilder {

  prepareSlug(name: string): DoctorsBuilder;
  prepare(doctorDetails: DoctorsDetails): DoctorsBuilder;
  save(): Promise<Result>;

}

/**
 * Doctors builder helps in saving doctor into db by preparing slug,
 * preparing doctor object and passing it on to repository
 */
@injectable()
export class DoctorsBuilderImpl implements DoctorsBuilder {

  constructor(
    @inject(Types.DoctorsRepository) private doctorsRepository: DoctorsRepository
  ) {}

  private slug: string = '';
  private isExist: boolean = false;
  private doctor: Doctor = {} as Doctor;

  /**
   * Receives doctor's name and prepares the slug by replacing space with '-'
   * @param {string} name
   * @returns {DoctorsBuilder}
   */
  public prepareSlug(name: string): DoctorsBuilder {
    const regExp = /\ /gi;
    this.slug = name.toLowerCase().replace(regExp, '-');
    return this;
  }

  /**
   * Receives validated doctor payload and prepares doctor object
   * @param {DoctorsDetails} doctorsDetails
   * @returns {DoctorsBuilder}
   */
  public prepare(doctorsDetails: DoctorsDetails): DoctorsBuilder {
    if(this.isExist)
      return this;

    this.doctor = new Doctor(doctorsDetails.name, doctorsDetails.city, doctorsDetails.country, doctorsDetails.avatarUrl,
      doctorsDetails.qunoScoreNumber, doctorsDetails.ratingsAverage, doctorsDetails.treatmentsLastYear, doctorsDetails.yearsExperience,
      doctorsDetails.basePrice, this.slug);
    return this;
  }

  /**
   * Pass the doctor object on to the repository and returns the saved Result object
   * @returns {Promise<Result>}
   */
  public async save(): Promise<Result> {
    let savedDoctor;
    try {
      savedDoctor = await this.doctorsRepository.saveDoctor(this.doctor);
    } catch (e) {
      throw e;
    }
    return savedDoctor;
  }

}