import {
  DATA,
  DATA_SCHEMA,
  DATA_TYPE_SCHEMA,
  ELEMENT_SCHEMA,
  WIDGETS,
} from 'dummy/utils/states-select-configuration';
import Controller from '@ember/controller';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

interface OnValueChangeArgs {
  name: string;
  value: FormValueType;
}

export default class ApplicationController extends Controller {
  data: Record<string, unknown> = tracked(DATA);
  // data = DATA;

  @tracked
  includePostalCode = false;

  get dataSchema(): Record<string, unknown> {
    return DATA_SCHEMA;
  }

  get dataTypeSchema(): Record<string, unknown> {
    return DATA_TYPE_SCHEMA;
  }

  get elementSchema(): Record<string, unknown> {
    return ELEMENT_SCHEMA;
  }

  get widgets(): Record<string, unknown> {
    return WIDGETS;
  }

  @action
  onFormSubmit(data: Record<string, unknown>) {
    // eslint-disable-next-line no-console
    console.log('onFormSubmit: %o', data);
  }

  @action
  onValueChange(formValue: OnValueChangeArgs) {
    // eslint-disable-next-line no-console
    console.log('onFormValue: %o', formValue);
    // this.includePostalCode =
    //   formValue.name === 'contactDetailCountry' && formValue.value === 'us';
    // if (formValue.name === 'contactDetailCountry') {
    //   this.data['contactDetailCountry'] = formValue.value ?? undefined;
    // }
  }
}
