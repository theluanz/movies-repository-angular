import { GenericField } from './generic-field';

export interface ConfigParams {
  page: number;
  numberOfPosts: number;
  textSearch?: string;
  field?: GenericField;
}
