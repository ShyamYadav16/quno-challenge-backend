import {APIGatewayEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {API_KEY} from "../config/types";
import {unauthorizeResponse} from "./response";

/**
 * This is a wrapper function for the handler to authorize requests coming to the handler,
 * If the request header is not having 'x-api-key' set or if the 'x-api-key' is having wrong value
 * then it return Unauthorized error.
 * @param {(event: APIGatewayEvent, context: Context) => Promise<object>} handler
 * @returns {(event: APIGatewayEvent, context: Context) => Promise<APIGatewayProxyResult>}
 */
export function auth<Event>(
  handler: (event: APIGatewayEvent, context: Context) => Promise<object>
): (event: APIGatewayEvent, context: Context) => Promise<APIGatewayProxyResult> {
  return async (event: APIGatewayEvent, context: Context) => {
    try {
      if(event.headers['x-api-key'] && event.headers['x-api-key'] !== API_KEY)
        return unauthorizeResponse('Unauthorized: Please use the correct api key');
    } catch (e) {
      throw e;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(await handler(event, context)),
    };
  };
}