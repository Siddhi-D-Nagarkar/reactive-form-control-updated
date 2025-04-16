export interface FormConfig {
  type: string;
  label: string;
  name: string;
  value: string;
  validations: Validation[];
}

export interface Validation {
  name: string;
  validator: string;
  message: string;
}
