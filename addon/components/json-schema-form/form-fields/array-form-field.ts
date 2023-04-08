import {
  FormFieldArgs,
  createFormFieldArgsList,
} from 'ember-json-schema-form/utils/form-utils';
import type { ArrayTypeSchema } from 'ember-json-schema-form/utils/types/json-schema';
import BaseFormFieldComponent from 'ember-json-schema-form/components/json-schema-form/form-fields/base-form-field';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';

export default class JsonSchemaFormArrayFormFieldComponent extends BaseFormFieldComponent<ArrayTypeSchema> {
  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    this.dataType = JsonSchemaDataType.Array;
  }

  get formFieldArgsList(): FormFieldArgs[] {
    return createFormFieldArgsList(
      this.args.data,
      this.args.dataSchema,
      this.args.formId,
      this.args.onValueChange,
      this.args.onValueInitialized,
      this.args.elementSchema
    );
  }
}
