import {
  FormFieldArgs,
  FormFieldMap,
} from 'ember-json-schema-form/utils/form-utils';
import Component from '@glimmer/component';

export default class JsonSchemaFormCreateFormField extends Component<FormFieldArgs> {
  get formField(): Component<unknown> | undefined {
    const { type } = this.args.dataSchema;
    const component = FormFieldMap[type];
    return component && (component as unknown as Component<unknown>);
  }
}
