import {
  DataType as JsonSchemaDataType,
  ObjectTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import {
  FormFieldArgs,
  ValidateFn,
  createFormFieldArgsList,
} from 'ember-json-schema-form/utils/form-utils';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-json-schema-form/utils/registry-schema';
import FormValue from 'ember-json-schema-form/utils/form-value';
import RegistryService from 'ember-json-schema-form/services/json-schema-form/registry';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

export default class JsonSchemaFormObjectFormField extends Component<FormFieldArgs> {
  @service('json-schema-form/registry')
  declare registry: RegistryService;

  formValue: FormValue | undefined;

  constructor(owner: unknown, args: FormFieldArgs) {
    super(owner, args);
    if (!this.isDefaultFormat) {
      // TODO: Refactor similar code in string-form-field component
      const value = this.args.data as string;
      const formValue = new FormValue();
      formValue.value = value;
      const formElementName = this.args.elementSchema?.['widget:name'];
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

  get isDefaultFormat(): boolean {
    const { format } = this.args.dataSchema;
    return isNone(format) || format === DEFAULT_FORMAT;
  }

  get widget(): Component<unknown> | undefined {
    if (!this.isDefaultFormat) {
      const dataSchema = this.args.dataSchema as ObjectTypeSchema;
      const format = dataSchema.format;
      const component = this.registry.getWidget({
        formId: this.args.formId,
        format,
        type: JsonSchemaDataType.Object,
      });
      if (!component) {
        throw new Error(`component not defined for object format: ${format}`);
      }
      return component;
    }
    return undefined;
  }
}
