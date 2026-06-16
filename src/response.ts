// Global Types
import type {
  Response as $Response,
} from 'express';

// Helpers
import _ from 'lodash';
import axios from 'axios';
import CustomError from './CustomError';

// Enums
import {
  BaseErrorKey,
} from './enums';

// Types
import type {
  $CustomError,
} from './types';

type $ErrorResponsePayload = {
  data?: Record<string, unknown>;
  key: string;
  message: string;
};

const statusCode: Record<string, number> = {
  error: 400,
  forbidden: 403,
  unauthenticated: 401,
};

const responseHandler = (res: $Response, error: $CustomError | Error): $Response => {
  // Defined or 400
  const status: number = Number(_.get(
    error,
    'status',
    statusCode.error,
  ));

  const errorResponsePayload: $ErrorResponsePayload = {
    data: undefined,
    key: BaseErrorKey.unknownError,
    message: 'Unknown error',
  };

  // Change payload if error is defined
  if (error) {
    const {
      message,
    } = error;

    const key: string = _.get(
      error,
      'key',
      BaseErrorKey.unknownError,
    );

    // If message and key are both defined
    if (!_.includes(
      [
        message,
        key,
      ],
      undefined,
    )) {
      errorResponsePayload.message = message;
      errorResponsePayload.key = key;
    }

    // Expose data for error
    if (_.includes(
      [
        BaseErrorKey.noPermissionError,
        BaseErrorKey.requestValidationError,
        BaseErrorKey.syntaxError,
        BaseErrorKey.requestError,
      ],
      key,
    )) {
      const data = _.get(
        error,
        'data',
      ) as Record<string, unknown> | undefined;

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
    AxiosError: new CustomError(
      'Request error',
      BaseErrorKey.requestError,
      {
        data: _.get(
          error,
          'response.data',
        ),
        level: 'error',
        status: statusCode.error,
      },
    ),
    NoPermissionError: new CustomError(
      error.message || 'No permission',
      BaseErrorKey.noPermissionError,
      {
        level: 'warning',
        status: statusCode.forbidden,
      },
    ),
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
        status: statusCode.unauthenticated,
      },
    ),
  };

  let output: $CustomError | Error = error;

  if (Object.keys(errors).includes(error.name)) {
    output = errors[error.name];
  }

  if (axios.isAxiosError(error)) {
    output = errors.AxiosError;
  }

  return responseHandler(
    res,
    output,
  );
};

export default errorResponse;
