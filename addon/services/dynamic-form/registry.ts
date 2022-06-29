import { TypeSchema, WidgetMap } from 'ember-dynamic-form/utils/types/registry';
import { DataType as JsonSchemaDataType } from 'ember-dynamic-form/utils/types/json-schema';
import Component from '@glimmer/component';
import RegistrySchema from 'ember-dynamic-form/utils/registry-schema';
import Service from '@ember/service';

type CreateOpts = {
  id: string;
  typeSchema?: TypeSchema;
  widgetOverrides?: WidgetMap;
};

type GetWidgetOpts = {
  formId: string;
  format?: string;
  type: JsonSchemaDataType;
};

export default class EmberDynamicFormRegistry extends Service {
  #registrySchemas: Record<string, RegistrySchema> = {};

  /**
   * @param opts
   * @returns
   */
  create(opts: CreateOpts) {
    const registrySchema = new RegistrySchema(
      opts.typeSchema,
      opts.widgetOverrides
    );
    this.#registrySchemas[opts.id] = registrySchema;
    return registrySchema;
  }

  getWidget(opts: GetWidgetOpts): Component<unknown> | undefined {
    const registrySchema = this.#registrySchemas[opts.formId];
    if (registrySchema) {
      return registrySchema.getWidget(opts);
    }
    return undefined;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'dynamic-form/registry': EmberDynamicFormRegistry;
  }
}
