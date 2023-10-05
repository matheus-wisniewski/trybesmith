type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorType, 
  data: { message: string }
};

type ServiceResponseSuccessType = 'SUCCESSFUL' | 'CREATED';

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSuccessType, 
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;