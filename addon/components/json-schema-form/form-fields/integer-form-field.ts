import BaseFormFieldComponent from 'ember-json-schema-form/components/json-schema-form/form-fields/base-form-field';
import type { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import type { IntegerTypeSchema } from 'ember-json-schema-form/utils/types/json-schema';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';
import type { WidgetEnum } from 'ember-json-schema-form/utils/types/widget';
import { action } from '@ember/object';
import { createEnums } from 'ember-json-schema-form/utils/form-utils';
import { isEmpty } from '@ember/utils';

export default class JsonSchemaFormIntegerFormField extends BaseFormFieldComponent<IntegerTypeSchema> {
  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    if (!isEmpty(this.args.data)) {
      const value = Number.parseInt(this.args.data as string);
      if (!Number.isInteger(value)) {
        throw new Error(`value is not an integer: ${this.args.data}`);
      }
      this.formValue.value = value;
    }
    const dataSchema = this.args.dataSchema as IntegerTypeSchema;
    this.formValue.maximum = dataSchema.maximum;
    this.formValue.minimum = dataSchema.minimum;
    this.dataType = JsonSchemaDataType.Integer;
  }

  get enums(): WidgetEnum<FormValueType>[] | undefined {
    return createEnums<IntegerTypeSchema>(this.args.dataSchema);
  }

  @action
  onValueChange(name: string, value: FormValueType) {
    const valueParsed = isEmpty(value)
      ? value
      : Number.parseInt(value as string);
    this.args.onValueChange(name, valueParsed);
  }
}
