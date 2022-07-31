import {
  TypeSchema,
  WidgetMap,
} from 'ember-json-schema-form/utils/types/registry';
import Component from '@glimmer/component';
import { FormData } from 'ember-json-schema-form/utils/form-utils';
import FormState from 'ember-json-schema-form/utils/form-state';
import FormValue from 'ember-json-schema-form/utils/form-value';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import type { FormElementSchema } from 'ember-json-schema-form/utils/form-utils';
import JsonSchema from 'ember-json-schema-form/utils/types/json-schema';
import RegistryService from 'ember-json-schema-form/services/json-schema-form/registry';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

interface JsonSchemaFormArgs {
  data: FormData;
  dataSchema: JsonSchema;
  onFormSubmit: (data: Record<string, unknown>) => void;
  dataTypeSchema?: TypeSchema;
  elementSchema?: FormElementSchema;
  widgets?: WidgetMap;
  validate?: (
    path: string,
    value: FormValueType,
    formData: Record<string, unknown> | FormValueType
  ) => string | undefined;
}

export default class JsonSchemaForm extends Component<JsonSchemaFormArgs> {
  formId: string;

  formState: FormState;

  @service('json-schema-form/registry')
  declare registry: RegistryService;

  constructor(owner: unknown, args: JsonSchemaFormArgs) {
    super(owner, args);
    this.formId = guidFor(this);
    this.formState = new FormState();
    this.registry.create({
      id: this.formId,
      typeSchema: this.args.dataTypeSchema,
      widgetOverrides: this.args.widgets,
    });
  }

  get submitButtonText(): string {
    const submitButtonOpts = this.args.elementSchema?.['form:submitButton'];
    if (submitButtonOpts) {
      return (submitButtonOpts as Record<string, string>)['text'] as string;
    }
    // TODO: Support this being an argument
    return 'Submit';
  }

  @action
  onFormSubmit(e: Event) {
    e.preventDefault();
    const serialized = this.formState.serialize();
    const formValues = this.formState.getValues();
    const isValid = formValues.reduce((prevIsValid, formValue) => {
      if (formValue.validateFn) {
        const errorMessage = formValue.validateFn(formValue?.value, serialized);
        formValue.errorMessage = errorMessage;
        return prevIsValid && isNone(errorMessage);
      }
      return prevIsValid && true;
    }, true);
    if (isValid) {
      this.args.onFormSubmit(serialized);
    }
  }

  @action
  onValueChange(name: string, value: FormValueType) {
    const formValue = this.formState.get(name);
    if (formValue) {
      formValue.value = value;
    }
  }

  @action
  onValueInitialized(formValue: FormValue) {
    this.formState.set(formValue.name, formValue);
  }
}
