// Helpers
import _ from 'lodash';
import CustomError from './CustomError';

// Enums
import {
  BaseErrorKey,
} from './enums';

// Types
import type {
  $CustomErrorContext,
} from './types';

class ResponseError<
  E extends Error,
  M extends string,
  K extends string,
  C extends $CustomErrorContext,
> extends CustomError<M, K, C> {
  key: string;

  data: Record<string, unknown> | void;

  name: string;

  constructor(error: E, ...params) {
    // @ts-ignore
    super(...params);

    const status = _.get(
      error,
      'response.status',
    );

    const responseErrors = {
      s401: {
        key: BaseErrorKey.unauthenticatedError,
        level: 'warning',
        message: 'Unauthenticated',
      },
    };

    const {
      data,
      key,
      level,
      message,
    }: {
      data: Record<string, unknown>,
      key: BaseErrorKey,
      level: 'error' | 'warning',
      message: string,
    } = _.get(
      responseErrors,
      `s${status || ''}`,
      {
        data: {
          responseData: _.get(
            error,
            'response.data.data',
          ),
          responseKey: _.get(
            error,
            'response.data.key',
          ),
          responseStatus: status,
        },
        key: BaseErrorKey.responseError,
        level: 'error',
        message: 'Response error',
      },
    );

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        this.constructor,
      );
    } else {
      this.stack = new Error(message).stack;
    }

    this.name = 'ResponseError';
    this.message = message;

    // Custom debugging information
    this.key = key;
    this.level = level;
    this.data = data;
  }
}

export default ResponseError;
