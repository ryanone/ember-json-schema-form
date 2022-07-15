import Component from '@glimmer/component';
import type { WidgetArgs } from 'ember-dynamic-form/utils/types/widget';
import { action } from '@ember/object';
import { createDomId } from 'ember-dynamic-form/utils/dom';

export default class DynamicFormWidgetsTextWidget extends Component<WidgetArgs> {
  get inputId() {
    return createDomId(this);
  }

  @action
  onValueChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.args.onValueChange(this.args.name, target.value);
  }
}
