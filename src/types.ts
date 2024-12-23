import CustomError from './CustomError';

/* eslint-disable perfectionist/sort-modules */
export type $ErrorLevel = 'error' | 'warning';

export type $CustomErrorContext = {
  data?: Record<string, unknown> | void;
  level?: $ErrorLevel | void;
  name?: string | void;
  status?: number | void;
};

export type $CustomError = CustomError<string, string, $CustomErrorContext>;
