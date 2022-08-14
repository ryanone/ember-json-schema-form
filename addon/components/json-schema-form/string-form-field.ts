import {
  DataType as JsonSchemaDataType,
  StringTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import {
  FormFieldArgs,
  ValidateFn,
} from 'ember-json-schema-form/utils/form-utils';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-json-schema-form/utils/registry-schema';
import FormValue from 'ember-json-schema-form/utils/form-value';
import RegistryService from 'ember-json-schema-form/services/json-schema-form/registry';
import { WidgetEnum } from 'ember-json-schema-form/utils/types/widget';
import { inject as service } from '@ember/service';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';

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
    if (!formElementName) {
      throw new Error('No name specified for this form field');
    }
    formValue.name = formElementName as string;
    if (this.args.elementSchema?.['widget:validate']) {
      const validateFn: ValidateFn = this.args.elementSchema[
        'widget:validate'
      ] as ValidateFn;
      formValue.validateFn = validateFn;
    }
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
