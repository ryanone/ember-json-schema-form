import {
  DataType as JsonSchemaDataType,
  JsonSchemaType,
  StringType,
} from 'ember-dynamic-form/utils/types/json-schema';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-dynamic-form/utils/registry-schema';
import { FormElementArgs } from 'ember-dynamic-form/utils/form-data';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { inject as service } from '@ember/service';

interface DynamicFormStringFormElementArgs {
  data: FormData;
  dataSchema: JsonSchemaType;
  formId: string;
  opts?: FormElementArgs;
}

export default class DynamicFormStringFormElement extends Component<DynamicFormStringFormElementArgs> {
  @service('dynamic-form/registry')
  declare registry: RegistryService;

  get widgetData() {
    const { dataSchema } = this.args;
    return {
      description: dataSchema.description,
      title: dataSchema.title,
    };
  }

  get widget(): Component<unknown> {
    const stringSchema = this.args.dataSchema as StringType;
    const stringFormat = stringSchema.format ?? DEFAULT_FORMAT;
    const component = this.registry.getWidget({
      formId: this.args.formId,
      format: stringFormat,
      type: JsonSchemaDataType.String,
    });
    if (!component) {
      throw new Error(
        `component not defined for string format: ${stringFormat}`
      );
    }
    return component;
  }
}
