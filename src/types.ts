import CustomError from './CustomError';

import type {
  $BaseErrorKeyEnums,
} from './enums';

export type $BaseErrorKey = $BaseErrorKeyEnums[keyof $BaseErrorKeyEnums];

export type $ErrorLevel = 'error' | 'warning';

export type $CustomErrorContext = {
  data?: Record<string, unknown> | void;
  level?: $ErrorLevel | void;
  name?: string | void;
  status?: number | void;
};

export type $CustomError = CustomError<string, string, $CustomErrorContext>;
