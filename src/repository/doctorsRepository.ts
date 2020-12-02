import {injectable} from "inversify";
import {Doctor} from "../entity/doctor";
import {findAll, findById, checkAndInsert} from "../client/postgres";
import {mapDoctors} from "../utils/helpers";
import {TABLE_NAMES} from "../config/types";
import {Result} from "../entity/result";
import {DoctorsQuery} from "../schema/doctorsQuery";

export interface DoctorsRepository {

  getAllDoctors(doctorsQuery: DoctorsQuery): Promise<Doctor[]>;
  getDoctorById(id: number): Promise<Doctor>;
  saveDoctor(doctor: Doctor): Promise<Result>;

}

/**
 * Doctors repository class helps to save and get doctor's data
 */
@injectable()
export class DoctorsRepositoryImpl implements DoctorsRepository {

  /**
   * Receives query parameters, gets doctors based on query parameters,
   * maps the returned value from postgres client on to the doctor's object and
   * returns the doctors array
   * @param {DoctorsQuery} doctorsQuery
   * @returns {Promise<Doctor[]>}
   */
  public async getAllDoctors(doctorsQuery: DoctorsQuery): Promise<Doctor[]> {
    let doctors: Doctor[] = [];
    try {
      doctors = mapDoctors(await findAll(TABLE_NAMES.DOCTORS, doctorsQuery));
    } catch (e) {
      throw e;
    }
    return doctors;
  }

  /**
   * Receives id parameter, gets the doctor by id from postgres client,
   * maps the data on to doctor's object and returns the object
   * @param {number} id
   * @returns {Promise<Doctor>}
   */
  public async getDoctorById(id: number): Promise<Doctor> {
    let result;
    try {
      result = mapDoctors(await findById(TABLE_NAMES.DOCTORS, id))[0];
    } catch (e) {
      throw e;
    }
    return result;
  }

  /**
   * Receives doctor's object and pass the object into postgres client
   * to store the data. Gets the stored data, maps that into object
   * and returns the same
   * @param {Doctor} doctor
   * @returns {Promise<Result>}
   */
  public async saveDoctor(doctor: Doctor): Promise<Result> {
    let result;
    try {
      result = await checkAndInsert(TABLE_NAMES.DOCTORS, doctor);
      result.obj = result.obj ? mapDoctors(result.obj) : result.obj;
    } catch (e) {
      throw e;
    }
    return result;
  }

}
