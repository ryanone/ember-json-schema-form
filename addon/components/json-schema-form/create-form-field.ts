import BooleanFormField from 'ember-json-schema-form/components/json-schema-form/boolean-form-field';
import Component from '@glimmer/component';
import { DataType } from 'ember-json-schema-form/utils/types/json-schema';
import { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import IntegerFormField from 'ember-json-schema-form/components/json-schema-form/integer-form-field';
import NumberFormField from 'ember-json-schema-form/components/json-schema-form/number-form-field';
import ObjectFormField from 'ember-json-schema-form/components/json-schema-form/object-form-field';
import StringFormField from 'ember-json-schema-form/components/json-schema-form/string-form-field';

const FORM_FIELD_MAP: Map<DataType, typeof Component> = new Map();
FORM_FIELD_MAP.set(DataType.Boolean, BooleanFormField);
FORM_FIELD_MAP.set(DataType.Integer, IntegerFormField);
FORM_FIELD_MAP.set(DataType.Number, NumberFormField);
FORM_FIELD_MAP.set(DataType.Object, ObjectFormField);
FORM_FIELD_MAP.set(DataType.String, StringFormField);

export default class JsonSchemaFormCreateFormField extends Component<FormFieldArgs> {
  get formField(): Component<unknown> | undefined {
    const { type } = this.args.dataSchema;
    const component = FORM_FIELD_MAP.get(type);
    return component && (component as unknown as Component<unknown>);
  }
}
