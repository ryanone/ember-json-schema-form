import Component from '@glimmer/component';
import { DataType } from 'ember-dynamic-form/utils/types/json-schema';
import { FormFieldArgs } from 'ember-dynamic-form/utils/form-utils';
import ObjectFormElement from 'ember-dynamic-form/components/dynamic-form/object-form-element';
import StringFormElement from 'ember-dynamic-form/components/dynamic-form/string-form-element';

const FORM_ELEMENTS_MAP: Map<DataType, typeof Component> = new Map();
FORM_ELEMENTS_MAP.set(DataType.Object, ObjectFormElement);
FORM_ELEMENTS_MAP.set(DataType.String, StringFormElement);

export default class DynamicFormFormField extends Component<FormFieldArgs> {
  get formElement(): Component<unknown> | undefined {
    const { type } = this.args.dataSchema;
    const component = FORM_ELEMENTS_MAP.get(type);
    return component && (component as unknown as Component<unknown>);
  }
}
