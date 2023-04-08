import BaseFormFieldComponent from 'ember-json-schema-form/components/json-schema-form/form-fields/base-form-field';
import { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';
import type { NullTypeSchema } from 'ember-json-schema-form/utils/types/json-schema';

export default class NullFormFieldComponent extends BaseFormFieldComponent<NullTypeSchema> {
  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    this.dataType = JsonSchemaDataType.Null;
  }
}
