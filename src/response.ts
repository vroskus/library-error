// Global Types
import type {
  Response as $Response,
} from 'express';

// Helpers
import _ from 'lodash';
import CustomError from './CustomError';

// Enums
import {
  baseErrorKey,
} from './enums';

// Types
import type {
  $BaseErrorKey,
  $CustomError,
} from './types';

export const responseHandler = (res: $Response, error?: Error | $CustomError): $Response => {
  // Defined or 400
  const status = Number(_.get(
    error,
    'status',
    400,
  ));

  const errorResponsePayload = {
    data: undefined,
    key: baseErrorKey.unknownError,
    message: 'Unknown error',
  };

  // Change payload if error is defined
  if (error) {
    const {
      message,
    } = error;

    const key: $BaseErrorKey = _.get(
      error,
      'key',
      baseErrorKey.unknownError,
    );

    // If message and key are both defined
    if (!_.includes(
      [message, key],
      undefined,
    )) {
      errorResponsePayload.message = message;
      errorResponsePayload.key = key;
    }

    // Expose data for error
    if (_.includes(
      [baseErrorKey.syntaxError, baseErrorKey.parametersValidationError],
      key,
    )) {
      const data: unknown | void = _.get(
        error,
        'data',
      );

      errorResponsePayload.data = data;
    }
  }

  return res.status(status).json(errorResponsePayload);
};

/**
 * Prepare an error object for sending and send it via res
 * @param {$CustomError | Error} err - native or custom error object.
 * @param {Response} res - response object used to send the prepared error.
 */
const errorResponse = (res: $Response, error: Error | $CustomError): $Response => {
  const errors = {
    SyntaxError: new CustomError(
      error.message,
      baseErrorKey.syntaxError,
      {
        level: 'warning',
      },
    ),
    UnauthorizedError: new CustomError(
      'Unauthenticated',
      baseErrorKey.unauthenticatedError,
      {
        level: 'warning',
        status: 401,
      },
    ),
  };

  const output: Error | $CustomError = _.get(
    errors,
    error.name,
    error,
  );

  return responseHandler(
    res,
    output,
  );
};

export default errorResponse;
