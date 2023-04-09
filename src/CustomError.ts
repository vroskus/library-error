// Helpers
import _ from 'lodash';

// Types
import type {
  $CustomErrorContext,
  $ErrorLevel,
} from './types';

class CustomError<
  M extends string,
  K extends string,
  C extends $CustomErrorContext,
> extends Error {
  key: string;

  data: Record<string, unknown> | void;

  name: string;

  status: number | void;

  level: $ErrorLevel | void;

  constructor(message: M, key?: K, context?: C, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        this.constructor,
      );
    } else {
      this.stack = new Error(message).stack;
    }

    this.message = message;

    // Custom debugging information
    this.key = key || 'UNKNOWN_ERROR';

    // Contextual data
    this.name = `${this.key}: ${message}`;
    this.data = _.get(
      context,
      'data',
    );
    this.status = _.get(
      context,
      'status',
    );
    this.level = _.get(
      context,
      'level',
      'error',
    );
  }
}

export default CustomError;
