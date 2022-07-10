import Component from '@glimmer/component';
import { DynamicFormWidgetsWidgetMetadataArgs } from 'ember-dynamic-form/components/dynamic-form/widgets/widget-metadata';
import { action } from '@ember/object';
import { createDomId } from 'ember-dynamic-form/utils/dom';
import { FormValueType } from 'ember-dynamic-form/utils/types/form';

export interface DynamicFormWidgetsTextWidgetArgs
  extends DynamicFormWidgetsWidgetMetadataArgs {
  data: string;
  name: string;
  onValueChange: (name: string, value: FormValueType) => void;
}

export default class DynamicFormWidgetsTextWidget extends Component<DynamicFormWidgetsTextWidgetArgs> {
  get inputId() {
    return createDomId(this);
  }

  @action
  onValueChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.args.onValueChange(this.args.name, target.value);
  }
}
