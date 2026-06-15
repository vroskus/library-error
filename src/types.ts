import CustomError from './CustomError';

export type $ErrorLevel = 'error' | 'warning';

export type $CustomErrorContext = {
  data?: Record<string, unknown>;
  level?: $ErrorLevel;
  name?: string;
  status?: number;
};

export type $CustomError = CustomError<string, string, $CustomErrorContext>;
