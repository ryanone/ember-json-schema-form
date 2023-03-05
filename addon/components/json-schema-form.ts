import {
  TypeSchema,
  WidgetMap,
} from 'ember-json-schema-form/utils/types/registry';
import Component from '@glimmer/component';
import { DefaultErrorMessages } from 'ember-json-schema-form/utils/errors';
import { FormData } from 'ember-json-schema-form/utils/form-utils';
import type { FormElementSchema } from 'ember-json-schema-form/utils/form-utils';
import FormState from 'ember-json-schema-form/utils/form-state';
import FormValue from 'ember-json-schema-form/utils/form-value';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import JsonSchema from 'ember-json-schema-form/utils/types/json-schema';
import RegistryService from 'ember-json-schema-form/services/json-schema-form/registry';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

interface OnValueChangeArgs {
  name: string;
  value: FormValueType;
}

interface JsonSchemaFormArgs {
  data: FormData;
  dataSchema: JsonSchema;
  onFormSubmit: (data: Record<string, unknown>) => void;
  onValueChange?: (formValue: OnValueChangeArgs) => void;
  dataTypeSchema?: TypeSchema;
  elementSchema?: FormElementSchema;
  widgets?: WidgetMap;
}

export default class JsonSchemaForm extends Component<JsonSchemaFormArgs> {
  formId: string;

  formState: FormState;

  errorMessages = DefaultErrorMessages;

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
    const result = this.formState.validate(this.errorMessages);
    if (result) {
      const serialized = this.formState.serialize();
      this.args.onFormSubmit(serialized);
    }
  }

  @action
  onValueChange(name: string, value: FormValueType) {
    const formValue = this.formState.get(name);
    if (formValue) {
      formValue.value = value;
      if (this.args.onValueChange) {
        this.args.onValueChange({
          name: formValue.name,
          value: formValue.value,
        });
      }
    }
  }

  @action
  onValueInitialized(formValue: FormValue) {
    this.formState.set(formValue.name, formValue);
  }
}
