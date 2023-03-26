import BaseFormFieldComponent from 'ember-json-schema-form/components/json-schema-form/base-form-field';
import type { BooleanTypeSchema } from 'ember-json-schema-form/utils/types/json-schema';
import type { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class JsonSchemaFormBooleanFormField extends BaseFormFieldComponent<BooleanTypeSchema> {
  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    if (!isEmpty(this.args.data)) {
      this.formValue.value = !!this.args.data;
    } else {
      this.formValue.value = false;
    }
    this.dataType = JsonSchemaDataType.Boolean;
  }

  @action
  onValueChange(name: string, value: FormValueType) {
    this.args.onValueChange(name, !!value);
  }
}
