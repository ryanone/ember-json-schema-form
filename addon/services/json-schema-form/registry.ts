import {
  TypeSchema,
  WidgetMap,
} from 'ember-json-schema-form/utils/types/registry';
import Component from '@glimmer/component';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';
import RegistrySchema from 'ember-json-schema-form/utils/registry-schema';
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

export default class JsonSchemaFormRegistry extends Service {
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
    'json-schema-form/registry': JsonSchemaFormRegistry;
  }
}
