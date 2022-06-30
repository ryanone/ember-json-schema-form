import {
  FormData,
  FormFieldArgs,
  createFormFieldArgsList,
} from 'ember-dynamic-form/utils/form-utils';
import JsonSchema, {
  JsonSchemaType,
} from 'ember-dynamic-form/utils/types/json-schema';
import { TypeSchema, WidgetMap } from 'ember-dynamic-form/utils/types/registry';
import Component from '@glimmer/component';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

interface DynamicFormArgs {
  data: FormData;
  dataSchema: JsonSchema;
  dataTypeSchema?: TypeSchema;
  widgets?: WidgetMap;
}

export default class DynamicForm extends Component<DynamicFormArgs> {
  formId: string;

  @service('dynamic-form/registry')
  declare registry: RegistryService;

  constructor(owner: unknown, args: DynamicFormArgs) {
    super(owner, args);
    this.formId = guidFor(this);
    this.registry.create({
      id: this.formId,
      typeSchema: this.args.dataTypeSchema,
      widgetOverrides: this.args.widgets,
    });
  }

  /**
   * This function should return a list of objects.
   * Each object should contain the data necessary to invoke the dynamic-form/form-element component
   * - data - The value(s) to be displayed
   * - dataSchema - WidgetMap for the given
   * - elementSchema -
   * - formId
   */
  get formFieldArgsList(): FormFieldArgs[] {
    return createFormFieldArgsList(
      this.args.data,
      this.args.dataSchema as unknown as JsonSchemaType,
      this.formId
    );
  }
}
