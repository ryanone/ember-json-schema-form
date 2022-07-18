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

interface JsonSchemaFormArgs {
  data: FormData;
  dataSchema: JsonSchema;
  onFormSubmit: (data: Record<string, unknown>) => void;
  dataTypeSchema?: TypeSchema;
  elementSchema?: FormElementSchema;
  widgets?: WidgetMap;
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
    return 'Submit';
  }

  @action
  onFormSubmit(e: Event) {
    e.preventDefault();
    if (this.formState.isValid) {
      this.args.onFormSubmit(this.formState.serialize());
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
