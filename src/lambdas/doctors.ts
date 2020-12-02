import {APIGatewayEvent, APIGatewayProxyResult, Callback, Context} from "aws-lambda";
import {container} from "../config/inversify";
import {HTTP_METHODS, MESSAGES, Types} from "../config/types";
import {badRequestResponse} from "../utils/response";
import {auth} from "../utils/auth";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import responseSerializer from "@middy/http-response-serializer";
import {DoctorsController} from "../controller/doctorsController";

/**
 * Returns API gateway proxy result
 *
 * @remarks
 * This is a proxy method that executes HTTP requests by calling respective controllers.
 *
 * @param {APIGatewayEvent} event
 * @returns {Promise<APIGatewayProxyResult>}
 */
const executeHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    const doctorsController = container.get<DoctorsController>(Types.DoctorsController);
    switch (event.httpMethod) {
      case HTTP_METHODS.GET:
        return (id) ? doctorsController.getDoctorById(event) : doctorsController.getAllDoctors(event);
        break;
      case HTTP_METHODS.POST:
        return doctorsController.saveDoctors(event);
        break;
      default:
        return badRequestResponse(MESSAGES.API_NOT_FOUND);
    }
  } catch (e) {
    throw e;
  }
  return badRequestResponse(MESSAGES.API_NOT_FOUND);
}

/**
 * This is the main doctors handler that is configured in serverless.yml.
 * Uses middy middleware for input parsing, output serialization and error handling
 * Uses auth wrapper to authorize incoming requests
 *
 * @type {middy.Middy<EventType<(event: APIGatewayEvent) => Promise<APIGatewayProxyResult>, Context>, HandlerReturnType<(event: APIGatewayEvent) => Promise<APIGatewayProxyResult>, Context>, Context>}
 */
export const handler: (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => Promise<APIGatewayProxyResult> | void = middy(
  (auth(executeHandler) as unknown) as (event: APIGatewayEvent) => Promise<APIGatewayProxyResult>
)
  .use(jsonBodyParser())
  .use(responseSerializer({
    serializers: [{
      regex: /^application\/json$/,
      serializer: ({ body }) => {
        const data = JSON.parse(body);
        if(data.statusCode) return data;
        return body;
      }
    }],
    default: 'application/json'
  }))
  .use(httpErrorHandler());