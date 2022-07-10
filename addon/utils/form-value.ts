import { FormValueType } from 'ember-dynamic-form/utils/types/form';
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
}
