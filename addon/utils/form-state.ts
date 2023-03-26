import { isObject, set } from 'lodash-es';
import type { ErrorMessagesMap } from 'ember-json-schema-form/utils/errors';
import { ErrorType } from 'ember-json-schema-form/utils/errors';
import FormValue from 'ember-json-schema-form/utils/form-value';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class FormState {
  #values: Map<string, FormValue> = new Map<string, FormValue>();

  get(key: string): FormValue | undefined {
    return this.#values.get(key);
  }

  getValues() {
    return Array.from(this.#values.values());
  }

  serialize(): Record<string, unknown> {
    const serialized = {};
    this.getValues().forEach((formValue) => {
      const formValueName = formValue.name as string;
      const currValue = get(serialized, formValueName);
      if (isObject(currValue) && isObject(formValue)) {
        const merged = Object.assign(
          currValue as object,
          formValue.value as object
        );
        set(serialized, formValueName, merged);
      } else {
        set(serialized, formValueName, formValue.value);
      }
    });
    return serialized;
  }

  set(key: string, value: FormValue) {
    this.#values.set(key, value);
  }

  validate(errorMessages: ErrorMessagesMap): boolean {
    return this.getValues().reduce((accumulator, formValue) => {
      if (formValue.isRequired) {
        if (isEmpty(formValue.value)) {
          const errorMessageFn = errorMessages[ErrorType.Required];
          if (errorMessageFn) {
            formValue.errorMessage = errorMessageFn({
              length,
              title: formValue.title,
            });
          }
          return accumulator && false;
        }
      }

      if (!isEmpty(formValue.maxLength)) {
        const length = formValue.maxLength as number;
        if (
          !isEmpty(formValue.value) &&
          (formValue.value as string).length > length
        ) {
          const errorMessageFn = errorMessages[ErrorType.MaxLength];
          if (errorMessageFn) {
            formValue.errorMessage = errorMessageFn({
              length,
              title: formValue.title,
              value: formValue.value,
            });
          }
          return accumulator && false;
        }
      }

      if (!isEmpty(formValue.minLength)) {
        const length = formValue.minLength as number;
        if (
          isEmpty(formValue.value) ||
          (formValue.value as string).length < length
        ) {
          const errorMessageFn = errorMessages[ErrorType.MinLength];
          if (errorMessageFn) {
            formValue.errorMessage = errorMessageFn({
              length,
              title: formValue.title,
              value: formValue.value,
            });
          }
          return accumulator && false;
        }
      }

      if (!isEmpty(formValue.pattern)) {
        const pattern = new RegExp(formValue.pattern as string);
        const value = formValue.value as string;
        if (!pattern.test(value)) {
          const errorMessageFn = errorMessages[ErrorType.Pattern];
          if (errorMessageFn) {
            formValue.errorMessage = errorMessageFn({
              length,
              title: formValue.title,
              value,
            });
          }
          return accumulator && false;
        }
      }

      formValue.errorMessage = undefined;
      return accumulator && true;
    }, true);
  }
}
