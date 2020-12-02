import {inject, injectable} from "inversify";
import {Doctor} from "../entity/doctor";
import {Types} from "../config/types";
import {DoctorsRepository} from "../repository/doctorsRepository";
import {DoctorsDetails} from "../schema/doctorsDetails";
import {DoctorsBuilder} from "../builder/doctorsBuilder";
import {Result} from "../entity/result";
import {DoctorsQuery} from "../schema/doctorsQuery";

export interface DoctorsService {

  getAllDoctors(doctorsQuery: DoctorsQuery): Promise<Doctor[]>;
  getDoctorById(id: number): Promise<Doctor>;
  saveDoctorsDetails(doctorsDetails: DoctorsDetails): Promise<Result>;

}

/**
 * DoctorsService provides logic on the data sent to and from the controller and repository
 */
@injectable()
export class DoctorsServiceImpl implements DoctorsService {

  constructor(
    @inject(Types.DoctorsRepository) private doctorsRepository: DoctorsRepository,
    @inject(Types.DoctorsBuilder) private doctorsBuilder: DoctorsBuilder
  ) {}

  /**
   * Receives query parameters and gets all the doctors.
   *
   * @param {DoctorsQuery} doctorsQuery
   * @returns {Promise<Doctor[]>}
   */
  public async getAllDoctors(doctorsQuery: DoctorsQuery): Promise<Doctor[]> {
    return await this.doctorsRepository.getAllDoctors(doctorsQuery);
  }

  /**
   * Receives id returns doctor by id
   * @param {string} id
   * @returns {Promise<Doctor>}
   */
  public async getDoctorById(id: number): Promise<Doctor> {
    return await this.doctorsRepository.getDoctorById(id);
  }

  /**
   * Saves the doctor using doctors builder and returns the saved doctor
   * @param {DoctorsDetails} doctorsDetails
   * @returns {Promise<Result>}
   */
  public async saveDoctorsDetails(doctorsDetails: DoctorsDetails): Promise<Result> {
    this.doctorsBuilder.prepareSlug(doctorsDetails.name);
    this.doctorsBuilder.prepare(doctorsDetails);
    return await this.doctorsBuilder.save();
  }

}