import FormValue from 'ember-json-schema-form/utils/form-value';
import { set } from 'lodash-es';

export default class FormState {
  #values: Map<string, FormValue> = new Map<string, FormValue>();

  get(key: string): FormValue | undefined {
    return this.#values.get(key);
  }

  getValues() {
    return Array.from(this.#values.values());
  }

  get isValid() {
    return this.getValues().reduce(
      (previousValue, currentValue) => currentValue.isValid && previousValue,
      true
    );
  }

  serialize() {
    const serialized = {};
    this.getValues().forEach((formValue) => {
      set(serialized, formValue.name as string, formValue.value);
    });
    return serialized;
  }

  set(key: string, value: FormValue) {
    this.#values.set(key, value);
  }
}
