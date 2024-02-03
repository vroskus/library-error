// Types
import type {
  Response as $Response,
} from 'express';

// Helpers
import _ from 'lodash';

// Enums
import {
  BaseErrorKey,
} from './enums';

// Types
import type {
  $CustomError,
} from './types';

type $ErrorResponsePayload = {
  data?: object | void;
  key: BaseErrorKey;
  message: string;
  status: number;
};

const errorResponse = (res: $Response, error: $CustomError | Error): $Response => {
  // Defined or 400
  let status = Number(_.get(
    error,
    'status',
    400,
  ));

  let errorResponsePayload: $ErrorResponsePayload = {
    data: undefined,
    key: BaseErrorKey.unknownError,
    message: 'Unknown error',
    status,
  };

  const knownErrors: Record<string, $ErrorResponsePayload> = {
    SyntaxError: {
      key: BaseErrorKey.syntaxError,
      message: error.message,
      status: 400,
    },
  };

  // Change payload if error is defined
  const {
    message,
  } = error;

  const key: BaseErrorKey | void = _.get(
    error,
    'key',
    BaseErrorKey.unknownError,
  );

  // If message and key are both defined
  if (key) {
    errorResponsePayload.message = message;
    errorResponsePayload.key = key;
  }

  // If it is a known error
  const knownError: $ErrorResponsePayload | void = _.get(
    knownErrors,
    error.name,
  );

  if (knownError) {
    errorResponsePayload = knownError;
  }

  // Expose data for error
  if (_.includes(
    [BaseErrorKey.syntaxError, BaseErrorKey.parametersValidationError],
    key,
  )) {
    const data: object | void = _.get(
      error,
      'data',
    );

    errorResponsePayload.data = data;
  }

  status = errorResponsePayload.status;

  const output = _.pick(
    errorResponsePayload,
    ['message', 'key', 'data'],
  );

  return res.status(status).json(output);
};

export default errorResponse;
