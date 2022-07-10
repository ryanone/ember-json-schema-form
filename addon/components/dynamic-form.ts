import { TypeSchema, WidgetMap } from 'ember-dynamic-form/utils/types/registry';
import Component from '@glimmer/component';
import { FormData } from 'ember-dynamic-form/utils/form-utils';
import FormState from 'ember-dynamic-form/utils/form-state';
import FormValue from 'ember-dynamic-form/utils/form-value';
import type { FormValueType } from 'ember-dynamic-form/utils/types/form';
import JsonSchema from 'ember-dynamic-form/utils/types/json-schema';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

interface DynamicFormArgs {
  data: FormData;
  dataSchema: JsonSchema;
  onFormSubmit: (data: Record<string, unknown>) => void;
  dataTypeSchema?: TypeSchema;
  widgets?: WidgetMap;
}

export default class DynamicForm extends Component<DynamicFormArgs> {
  formId: string;

  formState: FormState;

  @service('dynamic-form/registry')
  declare registry: RegistryService;

  constructor(owner: unknown, args: DynamicFormArgs) {
    super(owner, args);
    this.formId = guidFor(this);
    this.formState = new FormState();
    this.registry.create({
      id: this.formId,
      typeSchema: this.args.dataTypeSchema,
      widgetOverrides: this.args.widgets,
    });
  }

  @action
  onSubmitClick(e: Event) {
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
