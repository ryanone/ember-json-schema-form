import Component from '@glimmer/component';
import {
  DataType,
  JsonSchemaType,
} from 'ember-dynamic-form/utils/types/json-schema';
import { FormData, FormElementArgs } from 'ember-dynamic-form/utils/form-data';
import StringFormElement from 'ember-dynamic-form/components/dynamic-form/string-form-element';

interface DynamicFormFormFieldArgs {
  data: FormData;
  dataSchema: JsonSchemaType;
  formId: string;
  opts?: FormElementArgs;
}

export default class DynamicFormFormField extends Component<DynamicFormFormFieldArgs> {
  get formElement(): Component | undefined {
    const { dataSchema } = this.args;
    const { type } = dataSchema;
    // TODO: Add support for other data types.
    if (type === DataType.String) {
      return StringFormElement as unknown as Component;
    }
    return undefined;
  }

  // get widget(): Component<unknown> | undefined {
  //   const dataSchema = this.args.dataSchema;
  //   const { type } = dataSchema;
  //   const format =
  //     type === DataType.String ? (dataSchema as StringType).format : 'default';
  //   return this.registry.getWidget({
  //     formId: this.args.formId,
  //     format,
  //     type,
  //   });
  // }
}
