import templateOnly from '@ember/component/template-only';
import DynamicFormWidgetsTextWidget from 'ember-dynamic-form/components/dynamic-form/widgets/text-widget';

export interface DynamicFormWidgetsWidgetMetadataArgs {
  description?: string;
  title?: string;
}

export default templateOnly<DynamicFormWidgetsTextWidget>();
