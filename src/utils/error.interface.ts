export type TValidationErrorDetails = {
  message: string;
  name: string;
  properties: {
    message: string;
    type: string;
    min?: number;
    [key: string]: any;
  };
  kind: string;
  path: string;
  value: any;
};

export type TError = {
  message: string;
  status: boolean;
  error: {
    name: string;
    errors: {
      [field: string]: TValidationErrorDetails;
    };
  };
  stack?: string;
};
