// import {
//   DataType as JsonSchemaDataType,
//   ObjectTypeSchema,
// } from 'ember-dynamic-form/utils/types/json-schema';
import {
  FormFieldArgs,
  createFormFieldArgsList,
} from 'ember-dynamic-form/utils/form-utils';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-dynamic-form/utils/registry-schema';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

export default class DynamicFormObjectFormField extends Component<FormFieldArgs> {
  @service('dynamic-form/registry')
  declare registry: RegistryService;

  get formFieldArgsList(): FormFieldArgs[] {
    return createFormFieldArgsList(
      this.args.data,
      this.args.dataSchema,
      this.args.formId
    );
  }

  get isDefaultFormat(): boolean {
    const { format } = this.args.dataSchema;
    return isNone(format) || format === DEFAULT_FORMAT;
  }

  // get widget(): Component<unknown> | undefined {
  //   if (!this.isDefaultFormat) {
  //     const dataSchema = this.args.dataSchema as ObjectTypeSchema;
  //     const format = dataSchema.format;
  //     const component = this.registry.getWidget({
  //       formId: this.args.formId,
  //       format,
  //       type: JsonSchemaDataType.Object,
  //     });
  //     if (!component) {
  //       throw new Error(`component not defined for object format: ${format}`);
  //     }
  //     return component;
  //   }
  //   return undefined;
  // }
}
