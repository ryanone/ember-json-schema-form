import {
  FormFieldArgs,
  createFormFieldArgsList,
} from 'ember-dynamic-form/utils/form-utils';
import Component from '@glimmer/component';
import { DEFAULT_FORMAT } from 'ember-dynamic-form/utils/registry-schema';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

export default class DynamicFormObjectFormElement extends Component<FormFieldArgs> {
  @service('dynamic-form/registry')
  declare registry: RegistryService;

  get formFieldArgsList(): FormFieldArgs[] {
    return createFormFieldArgsList(
      this.args.data,
      this.args.dataSchema,
      this.args.formId
    );
  }

  get isDefaultFormat(): boolean {
    const { format } = this.args.dataSchema;
    return isNone(format) || format === DEFAULT_FORMAT;
  }
}
