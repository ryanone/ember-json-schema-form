import JsonSchemaFormWidgetsTextWidget from 'ember-json-schema-form/components/json-schema-form/widgets/text-widget';
import templateOnly from '@ember/component/template-only';

export interface JsonSchemaFormWidgetsWidgetMetadataArgs {
  description?: string;
  title?: string;
}

export default templateOnly<JsonSchemaFormWidgetsTextWidget>();
