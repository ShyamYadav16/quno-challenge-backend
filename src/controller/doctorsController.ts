import {APIGatewayProxyResult} from "aws-lambda";
import {inject, injectable} from "inversify";
import {MESSAGES, Types} from "../config/types";
import {DoctorsService} from "../service/doctorsService";
import {DoctorsQuery} from "../schema/doctorsQuery";
import {getOnlyConstraints} from "../utils/helpers";
import {badRequestResponse, dataResponse, notFoundResponse} from "../utils/response";
import {validate} from "class-validator";
import {DoctorsDetails} from "../schema/doctorsDetails";
import {Doctor} from "../entity/doctor";

export interface DoctorsController {

  getAllDoctors(event: any): Promise<APIGatewayProxyResult>;
  getDoctorById(event: any): Promise<APIGatewayProxyResult>;
  saveDoctors(event: any): Promise<APIGatewayProxyResult>;

}

/**
 * DoctorsController is a controller class which helps in receiving the requests from proxy,
 * validating input parameters and returning the response to the request
 */
@injectable()
export class DoctorsControllerImpl implements DoctorsController {

  constructor(
    @inject(Types.DoctorsService) private doctorsService: DoctorsService
  ) {}

  /**
   * Receives query parameters like limit, offset, orderBy and isAsc
   * and gets the doctor based on the query parameters
   *
   * @param event - APIGatewayEvent
   * @returns {Promise<APIGatewayProxyResult>}
   */
  public async getAllDoctors(event: any): Promise<APIGatewayProxyResult> {
    try {
      const params = event.queryStringParameters;
      if (params) {
        const doctorsQuery: DoctorsQuery = new DoctorsQuery(parseInt(params.limit), parseInt(params.offset),
          params.orderBy, parseInt(params.isAsc));
        const v = await validate(doctorsQuery);
        if(v.length > 0)
          return badRequestResponse(getOnlyConstraints(v));

        if(!Object.keys(new Doctor('', '', '', '',
          0,0,0,0,
          0, '')).includes(doctorsQuery.orderBy))
          return badRequestResponse(`Order by key ${doctorsQuery.orderBy} doesn't exist!`);

        const result = await this.doctorsService.getAllDoctors(doctorsQuery);
        return result.length > 0 ? dataResponse(result) : notFoundResponse(MESSAGES.NOT_FOUND);
      }
    } catch (e) {
      throw e;
    }
    return badRequestResponse(MESSAGES.QUERY_PARAMS_ARE_REQUIRED);
  }

  /**
   * Received {id} in path parameter and returns doctor by id
   *
   * @param event - APIGatewayEvent
   * @returns {Promise<APIGatewayProxyResult>}
   */
  public async getDoctorById(event: any): Promise<APIGatewayProxyResult> {
    try {
      const id = event.pathParameters?.id || '';
      if (isNaN(id)) return badRequestResponse(MESSAGES.ID_MUST_BE_NUMBER);
      const result = await this.doctorsService.getDoctorById(id);
      return result ? dataResponse(result) : notFoundResponse(MESSAGES.NOT_FOUND);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Receives the doctor payload in event body, validates the payload,
   * inserts the doctor into db and returns inserted doctor on success
   *
   * @param event - APIGatewayEvent
   * @returns {Promise<APIGatewayProxyResult>}
   */
  public async saveDoctors(event: any): Promise<APIGatewayProxyResult> {
    try {
      if (!event.body) return badRequestResponse(MESSAGES.PAYLOAD_MISSING);
      const body = event.body;
      const doctorsDetails = new DoctorsDetails(body.name, body.city, body.country, body.avatarUrl,
        body.qunoScoreNumber, body.ratingsAverage, body.treatmentsLastYear, body.yearsExperience,
        body.basePrice);
      const v = await validate(doctorsDetails);
      if (v.length > 0)
        return badRequestResponse(getOnlyConstraints(v));

      const res = await this.doctorsService.saveDoctorsDetails(doctorsDetails);
      return (res.message === 'success') ? dataResponse(res.obj) : badRequestResponse(res.message);
    } catch (e) {
      throw e;
    }
  }

}