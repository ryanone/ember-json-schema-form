import Component from '@glimmer/component';
import type { WidgetArgs } from 'ember-dynamic-form/utils/types/widget';
import { createDomId } from 'ember-dynamic-form/utils/dom';

export default class DynamicFormWidgetsHiddenInputWidget extends Component<WidgetArgs> {
  get inputId() {
    return createDomId(this);
  }
}
