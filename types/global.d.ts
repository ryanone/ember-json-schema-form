// Types for compiled templates
declare module 'ember-json-schema-form/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
