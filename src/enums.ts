/* eslint-disable import/prefer-default-export */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      BaseError:
 *        type: object
 *        properties:
 *          message:
 *            description: Message describing an error
 *            type: string
 *          key:
 *            description: Error code
 *            type: string
 *            enum:
 *              - ALREADY_ASSOCIATED_RECORDS_ERROR
 *              - ASSOCIATION_ACTION_METHOD_NOT_FOUND_ERROR
 *              - CONFIG_NOT_FOUND
 *              - DATA_VALIDATION_ERROR
 *              - DUPLICATE_KEY_FOUND_ERROR
 *              - ENTITY_NOT_FOUND_ERROR
 *              - FACEBOOK_ERROR
 *              - FILE_TOO_BIG
 *              - GOOGLE_ERROR
 *              - INVALID_MODEL_NAME_ERROR
 *              - MULTIPLE_RECORDS_FOUND_ERROR
 *              - NOT_ASSOCIATED_RECORDS_ERROR
 *              - PARAMETERS_VALIDATION_ERROR
 *              - PAYMENT_ERROR
 *              - RESPONSE_ERROR
 *              - SENSORS_DATA_NOT_PROVIDED_ERROR
 *              - SYNTAX_ERROR
 *              - UNAUTHENTICATED_ERROR
 *              - UNKNOWN_ERROR
 *              - UNSET_CONFIG_PARAMS_ERROR
 */
export enum BaseErrorKey {
  alreadyAssociatedRecordsError = 'ALREADY_ASSOCIATED_RECORDS_ERROR',
  associationActionMethodNotFoundError = 'ASSOCIATION_ACTION_METHOD_NOT_FOUND_ERROR',
  configNotFound = 'CONFIG_NOT_FOUND',
  dataValidationError = 'DATA_VALIDATION_ERROR',
  duplicateKeyError = 'DUPLICATE_KEY_FOUND_ERROR',
  entityNotFoundError = 'ENTITY_NOT_FOUND_ERROR',
  facebookError = 'FACEBOOK_ERROR',
  fileTooBig = 'FILE_TOO_BIG',
  googleError = 'GOOGLE_ERROR',
  invalidModelNameError = 'INVALID_MODEL_NAME_ERROR',
  multipleRecordsFoundError = 'MULTIPLE_RECORDS_FOUND_ERROR',
  notAssociatedRecordsError = 'NOT_ASSOCIATED_RECORDS_ERROR',
  parametersValidationError = 'PARAMETERS_VALIDATION_ERROR',
  paymentError = 'PAYMENT_ERROR',
  responseError = 'RESPONSE_ERROR',
  syntaxError = 'SYNTAX_ERROR',
  unauthenticatedError = 'UNAUTHENTICATED_ERROR',
  unknownError = 'UNKNOWN_ERROR',
  unsetConfigParamsError = 'UNSET_CONFIG_PARAMS_ERROR',
}
