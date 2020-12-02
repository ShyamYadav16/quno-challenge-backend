import httpStatus from 'http-status';

/**
 * Helps to prepare the response object
 * @param {number} code
 * @param {boolean} success
 * @param {string} data
 * @returns {{code: number; success: boolean; data: string}}
 */
function data(code: number, success: boolean, data: string) {
  return {
    code,
    success,
    data
  };
}

/**
 * Returns the success response with status code 200
 * @param result
 * @returns {{statusCode: number; body: any}}
 */
export function dataResponse(result: any) {
  return { statusCode: httpStatus.OK, body: JSON.stringify(data(httpStatus.OK, true, result)) };
}

/**
 * Returns 404 Not Found response
 * @param {string} message
 * @returns {{statusCode: number; body: any}}
 */
export function notFoundResponse(message: string) {
  return { statusCode: httpStatus.NOT_FOUND, body: JSON.stringify(data(httpStatus.NOT_FOUND, false, message)) };
}

/**
 * Returns 400 bad request response
 * @param message
 * @returns {{statusCode: number; body: any}}
 */
export function badRequestResponse(message: any) {
  return { statusCode: httpStatus.BAD_REQUEST, body: JSON.stringify(data(httpStatus.BAD_REQUEST, false, message)) };
}

/**
 * Returns unauthorized response
 * @param message
 * @returns {{statusCode: number; body: any}}
 */
export function unauthorizeResponse(message: any) {
  return { statusCode: httpStatus.UNAUTHORIZED, body: JSON.stringify(data(httpStatus.UNAUTHORIZED, false, message)) };
}