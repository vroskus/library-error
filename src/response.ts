// Global Types
import type {
  Response as $Response,
} from 'express';

// Helpers
import _ from 'lodash';
import CustomError from './CustomError';

// Enums
import {
  BaseErrorKey,
} from './enums';

// Types
import type {
  $CustomError,
} from './types';

export const responseHandler = (res: $Response, error?: $CustomError | Error): $Response => {
  // Defined or 400
  const status = Number(_.get(
    error,
    'status',
    400,
  ));

  const errorResponsePayload = {
    data: undefined,
    key: BaseErrorKey.unknownError,
    message: 'Unknown error',
  };

  // Change payload if error is defined
  if (error) {
    const {
      message,
    } = error;

    const key: BaseErrorKey = _.get(
      error,
      'key',
      BaseErrorKey.unknownError,
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
      [BaseErrorKey.syntaxError, BaseErrorKey.parametersValidationError],
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
const errorResponse = (res: $Response, error: $CustomError | Error): $Response => {
  const errors = {
    SyntaxError: new CustomError(
      error.message,
      BaseErrorKey.syntaxError,
      {
        level: 'warning',
      },
    ),
    UnauthorizedError: new CustomError(
      'Unauthenticated',
      BaseErrorKey.unauthenticatedError,
      {
        level: 'warning',
        status: 401,
      },
    ),
  };

  const output: $CustomError | Error = _.get(
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
