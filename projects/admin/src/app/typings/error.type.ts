import { ERROR_MAP } from '../core/constants/error-map.const';

export type GenericHttpError = {
  domain: 'admin';
  statusCode: number;
  errorCode: keyof typeof ERROR_MAP;
  timestamp: string;
  path: string;
  message: string;
  validationMessages?: Record<string, string[]>;
  cause?: 'validation' | 'db';
};
