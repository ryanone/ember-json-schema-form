import {
  DataType as JsonSchemaDataType,
  StringType,
} from 'ember-dynamic-form/utils/types/json-schema';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-dynamic-form/utils/registry-schema';
import { FormFieldArgs } from 'ember-dynamic-form/utils/form-utils';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { inject as service } from '@ember/service';

interface DynamicFormStringFormElementArgs extends FormFieldArgs {
  formId: string;
}

export default class DynamicFormStringFormElement extends Component<DynamicFormStringFormElementArgs> {
  @service('dynamic-form/registry')
  declare registry: RegistryService;

  get description() {
    return this.args.dataSchema.description;
  }

  get title() {
    return this.args.dataSchema.title;
  }

  get value() {
    return this.args.data;
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
