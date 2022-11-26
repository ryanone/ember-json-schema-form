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
  value: FormValueType;

  @tracked
  errorMessage?: string;
}
