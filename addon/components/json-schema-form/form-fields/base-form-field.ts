import {
  BaseDataTypeSchema,
  DataType as JsonSchemaDataType,
  JsonTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-json-schema-form/utils/registry-schema';
import type { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import FormValue from 'ember-json-schema-form/utils/form-value';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import type RegistryService from 'ember-json-schema-form/services/json-schema-form/registry';
import type { WidgetEnum } from 'ember-json-schema-form/utils/types/widget';
import { inject as service } from '@ember/service';

export default class JsonSchemaFormBaseFormFieldComponent<
  TypeSchema extends JsonTypeSchema
> extends Component<FormFieldArgs> {
  @service('json-schema-form/registry')
  declare registry: RegistryService;

  formValue: FormValue;

  dataType: JsonSchemaDataType;

  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    this.dataType = JsonSchemaDataType.Null;
    const value = this.args.data as string;
    const formElementName = this.args.elementSchema?.['widget:name'];
    if (!formElementName) {
      throw new Error('No name specified for this form field');
    }
    const formValue = new FormValue();
    formValue.value = value;
    formValue.name = formElementName as string;
    const dataSchema = this.args.dataSchema as BaseDataTypeSchema;
    formValue.title = dataSchema.title || formValue.name;
    this.formValue = formValue;
    this.args.onValueInitialized(formValue);
  }

  get enums(): WidgetEnum<FormValueType>[] | undefined {
    return undefined;
  }

  get placeholder(): string | undefined {
    return this.args.elementSchema?.['widget:placeholder'] as string;
  }

  get widget(): Component<unknown> {
    const dataSchema = this.args.dataSchema as TypeSchema;
    const format = dataSchema.format ?? DEFAULT_FORMAT;
    const component = this.registry.getWidget({
      formId: this.args.formId,
      format,
      type: this.dataType,
    });
    if (!component) {
      throw new Error(`component not defined for string format: ${format}`);
    }
    return component;
  }
}
