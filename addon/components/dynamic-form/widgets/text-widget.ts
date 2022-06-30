import Component from '@glimmer/component';
import { DynamicFormWidgetsWidgetMetadataArgs } from 'ember-dynamic-form/components/dynamic-form/widgets/widget-metadata';
import { createDomId } from 'ember-dynamic-form/utils/dom';

export interface DynamicFormWidgetsTextWidgetArgs
  extends DynamicFormWidgetsWidgetMetadataArgs {
  value: string;
}

export default class DynamicFormWidgetsTextWidget extends Component<DynamicFormWidgetsTextWidgetArgs> {
  get inputId() {
    return createDomId(this);
  }
}
