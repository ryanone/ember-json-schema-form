import Component from '@glimmer/component';
import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';
import { inject as service } from '@ember/service';

interface DynamicFormFormElementArgs {
  formId: string;
}

export default class DynamicFormFormElement extends Component<DynamicFormFormElementArgs> {
  @service declare registry: RegistryService;
}
