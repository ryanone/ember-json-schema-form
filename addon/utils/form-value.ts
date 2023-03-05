import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { tracked } from '@glimmer/tracking';

export default class FormValue {
  @tracked
  isRequired = false;

  @tracked
  isValid = true;

  @tracked
  name = '';

  @tracked
  maxLength: number | undefined;

  @tracked
  minLength: number | undefined;

  @tracked
  pattern: string | undefined;

  @tracked
  title: string | undefined;

  @tracked
  value: FormValueType;

  @tracked
  errorMessage?: string;
}
