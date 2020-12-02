export const Types = {
  DoctorsController: Symbol('DoctorsController'),
  DoctorsService: Symbol('DoctorsService'),
  DoctorsRepository: Symbol('DoctorsRepository'),
  DoctorsBuilder: Symbol('DoctorsBuilder'),
  Database: Symbol('Database')
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const MESSAGES = {
  API_NOT_FOUND: 'API not found',
  NOT_FOUND: 'Not found',
  PAYLOAD_MISSING: 'Payload missing',
  QUERY_PARAMS_ARE_REQUIRED: 'limit, offset, orderBy, isAsc query parameters are required!',
  ID_MUST_BE_NUMBER: '{id} must be a number!'
};

export const TABLE_NAMES = {
  DOCTORS: 'doctors'
};

export const QUNO_SCORE_TEXT = {
  NINE_TO_TEN: 'Excellent',
  EIGHT_TO_NINE: 'Very Good',
  SEVEN_TO_EIGHT: 'Good',
  SIX_TO_SEVEN: 'Regular',
  ZERO_TO_SIX: 'Bad'
};

export const API_KEY = '210121af-3f36-4191-bfbd-e82a563aa385';