import { ERROR_MAP } from './error-map.const';

export const ERROR_DESCRIPTION: Record<keyof typeof ERROR_MAP, string> = {
  INVALID_CREDENTIALS: 'Wrong email or password.',
  INVALID_ACCESS_TOKEN: 'Your session is invalid. Please sign in again.',
  INVALID_REFRESH_TOKEN: 'Your session has expired. Please sign in again.',
  INVALID_RESET_TOKEN: 'This password reset link has expired or has already been used.',
  INVALID_TOKEN_TYPE: 'Invalid token type. Please sign in again.',
  ACCESS_TOKEN_EXPIRED: 'Your session has expired. Please sign in again.',
  ACCESS_TOKEN_REVOKED: 'Your session was revoked. Please sign in again.',
  ACCESS_TOKEN_REUSE: 'Suspicious activity detected. Please sign in again.',
  REFRESH_TOKEN_REUSE:
    'Your session was terminated because your account was accessed from another location.',
  NO_ACCESS_TOKEN: 'You must be signed in to perform this action.',
  ACCESS_DENIED: 'You do not have permission to perform this action.',
  ACCESS_DENIED_NO_REFRESH_TOKEN: 'Access denied. Please sign in again.',
  NOT_ENOUGH_PERMISSIONS: 'You do not have enough permissions to perform this action.',
  NOT_ENOUGH_PERMISSIONS_OPERATION: 'You do not have enough permissions for this operation.',
  SIGN_UP_CONFLICT: 'An account with this email address already exists.',
  PASSWORD_RESET_TOKEN_EXPIRED: 'This password reset link has expired. Please request a new one.',
  PASS_DOES_NOT_MATCH: 'Passwords do not match.',
  SELF_DELETION_NOT_ALLOWED: 'You cannot delete your own account.',

  VALIDATION_ERROR: 'Some fields contain invalid values. Please review your input.',
  INVALID_ID: 'The provided ID is invalid.',
  INVALID_EMAIL: 'The provided email address is invalid.',

  GENERIC_NOT_FOUND_EXCEPTION: 'The requested resource was not found.',
  GENERIC_CONFLICT_EXCEPTION: 'This action conflicts with existing data.',
  USER_DOES_NO_EXIST: 'This user does not exist.',
  NEWS_DOES_NO_EXIST: 'This news article does not exist.',
  IMAGE_DOES_NO_EXIST: 'This image does not exist.',
  NO_CONTENT: 'No content available.',

  VERSION_MISMATCH:
    'Someone else saved changes while you were editing. Please refresh and try again.',
  VERSION_NOT_FOUND: 'Could not verify the record version. Please refresh and try again.',

  INCORRECT_IMAGE_PAYLOAD: 'The image data is invalid.',
  IMAGE_WITHOUT_WIDTH: 'Image width is required.',
  IMAGE_MINIMUM_WIDTH: 'Image does not meet the minimum width requirement.',
  IMAGE_NO_DOTS: 'Image filename must not contain dots.',

  ALCOHOL_PERCENTAGE_WRONG_DECIMAL_PLACES: 'Alcohol percentage has too many decimal places.',
  ALCOHOL_PERCENTAGE_NON_NEGATIVE: 'Alcohol percentage must be a non-negative value.',
  ALCOHOL_PERCENTAGE_NO_EXCEED: 'Alcohol percentage must not exceed 100%.',

  S3_READ_FAILED: 'Failed to read the file. Please try again.',
  S3_UPLOAD_FAILED: 'Failed to upload the file. Please try again.',

  OPERATION_ERROR: 'An error occurred during this operation. Please try again.',
  TOO_MANY_REQUESTS: 'Too many requests. Please wait a moment before trying again.',
  INTERNAL_ERROR: 'An unexpected server error occurred. Please try again later.',

  PG_UNIQUE_VIOLATION: 'This record already exists.',
  DB_UNIQUE_VIOLATION: 'This record already exists.',
  DB_FOREIGN_KEY_VIOLATION: 'This action references a record that does not exist.',
  DB_NOT_NULL_VIOLATION: 'A required field is missing.',
  DB_SERIALIZATION_FAILURE: 'The operation failed due to a conflict. Please try again.',
  DB_DEADLOCK_DETECTED: 'The operation failed due to a conflict. Please try again.',
  DB_INVALID_INPUT: 'One or more values are invalid.',
  DB_VALUE_TOO_LONG: 'One or more values exceed the allowed length.',
  DB_CHECK_VIOLATION: 'One or more values fail the allowed constraints.',
  DB_LOCK_NOT_AVAILABLE: 'The record is currently locked by another operation. Please try again.',
  DB_TIMEOUT: 'The operation timed out. Please try again.',
  DB_UNAVAILABLE: 'The database is currently unavailable. Please try again later.',
  DB_GENERIC_ERROR: 'A database error occurred. Please try again.',
};
