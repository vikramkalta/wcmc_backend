const STATUSES = {
  ok: 'OK',
  created: 'Created',
  accepted: 'Accepted',
  noContent: 'No Content',
  badRequest: 'Bad request',
  unauthorized: 'Unauthorized',
  paymentRequired: 'Payment required',
  forbidden: 'Forbidden',
  notFound: 'Not found',
  methodNotAllowed: 'Method not allowed',
  requestTimeout: 'Request Timeout',
  duplicateResource: 'Resource already exists',
  payloadTooLarge: 'Payload too large',
  unsupportedMediaType: 'Unsupported media type',
  unprocessableEntity: 'Unprocessable entity',
  tooManyRequests: 'Too many requests',
  internalServerError: 'Internal server error',
  badGateway: 'Bad gateway',
  serviceUnavailable: 'Service unavailable',
  gatewayTimeout: 'Gateway timeout'
};

const STATUS_CODES = {
  [STATUSES.ok]: 200,
  [STATUSES.created]: 201,
  [STATUSES.accepted]: 202,
  [STATUSES.noContent]: 202,
  [STATUSES.badRequest]: 400,
  [STATUSES.unauthorized]: 401,
  [STATUSES.paymentRequired]: 402,
  [STATUSES.forbidden]: 403,
  [STATUSES.notFound]: 404,
  [STATUSES.methodNotAllowed]: 405,
  [STATUSES.requestTimeout]: 408,
  [STATUSES.duplicateResource]: 409,
  [STATUSES.payloadTooLarge]: 413,
  [STATUSES.unsupportedMediaType]: 415,
  [STATUSES.unprocessableEntity]: 422,
  [STATUSES.tooManyRequests]: 429,
  [STATUSES.internalServerError]: 500,
  [STATUSES.badGateway]: 502,
  [STATUSES.serviceUnavailable]: 503,
  [STATUSES.gatewayTimeout]: 504
};

const COLLECTIONS = {
  COUNTRY_DATA: 'country_data',
};

export {
  STATUSES,
  STATUS_CODES,
  COLLECTIONS,
};