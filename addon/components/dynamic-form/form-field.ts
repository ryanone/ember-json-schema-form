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

const FORM_ELEMENTS_MAP: Map<DataType, typeof Component> = new Map();
FORM_ELEMENTS_MAP.set(DataType.String, StringFormElement);

export default class DynamicFormFormField extends Component<DynamicFormFormFieldArgs> {
  get formElement(): Component<unknown> | undefined {
    const { type } = this.args.dataSchema;
    const component = FORM_ELEMENTS_MAP.get(type);
    return component && (component as unknown as Component<unknown>);
  }
}
