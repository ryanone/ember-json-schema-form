import { TypeSchema, WidgetMap } from 'ember-dynamic-form/utils/types/registry';
import RegistrySchema from 'ember-dynamic-form/utils/registry-schema';
import Service from '@ember/service';

type CreateOpts = {
  id: string;
  typeSchema?: TypeSchema;
  widgetOverrides?: WidgetMap;
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
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'ember-dynamic-form/registry': EmberDynamicFormRegistry;
  }
}
