import { TypeSchema, WidgetMap } from 'ember-dynamic-form/utils/types/registry';
import Component from '@glimmer/component';
import JsonSchema from 'ember-dynamic-form/utils/types/json-schema';
import {
  FormElementData,
  createFormElementsData,
} from 'ember-dynamic-form/utils/form-data';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

interface DynamicFormArgs {
  data: Record<string, unknown>;
  dataSchema: JsonSchema;
  dataTypeSchema?: TypeSchema;
  widgets?: WidgetMap;
}

export default class DynamicForm extends Component<DynamicFormArgs> {
  formId: string;

  @service declare registry: RegistryService;

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
  get formElementsData(): FormElementData[] {
    // const jsonSchema: JsonSchemaDataType = this.args.dataSchema;
    // return createFormElementsData(
    //   this.args.data,
    //   this.args.dataSchema,
    //   this.formId
    // );
    return [];
  }
}
