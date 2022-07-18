import Component from '@glimmer/component';
import type { WidgetArgs } from 'ember-json-schema-form/utils/types/widget';
import { createDomId } from 'ember-json-schema-form/utils/dom';

export default class JsonSchemaFormWidgetsHiddenInputWidget extends Component<WidgetArgs> {
  get inputId() {
    return createDomId(this);
  }
}
