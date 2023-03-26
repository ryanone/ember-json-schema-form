import BaseFormFieldComponent from 'ember-json-schema-form/components/json-schema-form/form-fields/base-form-field';
import type { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';
import type { StringTypeSchema } from 'ember-json-schema-form/utils/types/json-schema';
import type { WidgetEnum } from 'ember-json-schema-form/utils/types/widget';
import { createEnums } from 'ember-json-schema-form/utils/form-utils';

export default class JsonSchemaFormStringFormField extends BaseFormFieldComponent<StringTypeSchema> {
  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    const dataSchema = this.args.dataSchema as StringTypeSchema;
    this.formValue.maxLength = dataSchema.maxLength;
    this.formValue.minLength = dataSchema.minLength;
    this.formValue.pattern = dataSchema.pattern;
    this.dataType = JsonSchemaDataType.String;
  }

  get enums(): WidgetEnum<FormValueType>[] | undefined {
    return createEnums<StringTypeSchema>(this.args.dataSchema);
  }
}
