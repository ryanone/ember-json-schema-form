import Component from '@glimmer/component';
import type { WidgetArgs } from 'ember-json-schema-form/utils/types/widget';
import { action } from '@ember/object';
import { createDomId } from 'ember-json-schema-form/utils/dom';

export default class JsonSchemaFormWidgetsTextWidget extends Component<WidgetArgs> {
  get formElementId() {
    return createDomId(this);
  }

  @action
  onValueChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.args.onValueChange(this.args.name, target.value);
  }
}
