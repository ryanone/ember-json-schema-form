import {
  DataType as JsonSchemaDataType,
  StringTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-json-schema-form/utils/registry-schema';
import { FormFieldArgs } from 'ember-json-schema-form/utils/form-utils';
import FormValue from 'ember-json-schema-form/utils/form-value';
import RegistryService from 'ember-json-schema-form/services/json-schema-form/registry';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class JsonSchemaFormStringFormField extends Component<FormFieldArgs> {
  @service('json-schema-form/registry')
  declare registry: RegistryService;

  @tracked
  formElementName: string;

  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    const formElementName = this.args.elementSchema?.['widget:name'];
    const value = this.args.data as string;
    const formValue = new FormValue();
    formValue.value = value;
    if (!formElementName) {
      throw new Error('No name specified for this form field');
    }
    this.formElementName = formElementName as string;
    formValue.name = this.formElementName;
    this.args.onValueInitialized(formValue);
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
