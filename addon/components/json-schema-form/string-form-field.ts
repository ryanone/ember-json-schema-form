import {
  DataType as JsonSchemaDataType,
  StringTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-json-schema-form/utils/registry-schema';
import { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import FormValue from 'ember-json-schema-form/utils/form-value';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';
import RegistryService from 'ember-json-schema-form/services/json-schema-form/registry';
import { WidgetEnum } from 'ember-json-schema-form/utils/types/widget';
import { inject as service } from '@ember/service';

export default class JsonSchemaFormStringFormField extends Component<FormFieldArgs> {
  @service('json-schema-form/registry')
  declare registry: RegistryService;

  formValue: FormValue;

  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    const formElementName = this.args.elementSchema?.['widget:name'];
    const value = this.args.data as string;
    const formValue = new FormValue();
    formValue.value = value;
    const dataSchema = this.args.dataSchema as StringTypeSchema;
    formValue.maxLength = dataSchema.maxLength;
    formValue.minLength = dataSchema.minLength;
    formValue.pattern = dataSchema.pattern;
    if (!formElementName) {
      throw new Error('No name specified for this form field');
    }
    formValue.name = formElementName as string;
    formValue.title = dataSchema.title || formValue.name;
    this.formValue = formValue;
    this.args.onValueInitialized(formValue);
  }

  get enums(): WidgetEnum<FormValueType>[] | undefined {
    const dataSchema = this.args.dataSchema as StringTypeSchema;
    if (dataSchema.enum) {
      return dataSchema.enum.map((e) => ({ value: e }));
    } else if (dataSchema.anyOf) {
      return dataSchema.anyOf.map((s) => {
        const schema = s as StringTypeSchema;
        return {
          label: schema.title,
          value: schema.enum?.[0] ?? '',
        };
      });
    }
    return undefined;
  }

  get widget(): Component<unknown> {
    const dataSchema = this.args.dataSchema as StringTypeSchema;
    const format = dataSchema.format ?? DEFAULT_FORMAT;
    const component = this.registry.getWidget({
      formId: this.args.formId,
      format,
      type: JsonSchemaDataType.String,
    });
    if (!component) {
      throw new Error(`component not defined for string format: ${format}`);
    }
    return component;
  }
}
