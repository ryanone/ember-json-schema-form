import {
  TypeRegistry,
  TypeSchema,
  WidgetMap,
} from 'ember-json-schema-form/utils/types/registry';
import Component from '@glimmer/component';
import HiddenInputWidget from 'ember-json-schema-form/components/json-schema-form/widgets/hidden-input-widget';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';
import TextWidget from 'ember-json-schema-form/components/json-schema-form/widgets/text-widget';

/*
type registry
{
  "string": {
    "default": TextWidget,
    "email": TextWidget
  }
}

type schema

{
  [type: string]: {
    [format: string]: [widgetId: string]
  }
}

{
  "string": {
    "default": "TextInput",
    "email": "TextInput",
    "date-time": "DateTimeInput"
  },
  "object": {
    "default": "ObjectInput",
    "credit-card": "CreditCardIframeInput"
  }
}

widget map

{
  [widgetId: string]:
}

{
  "IframeInput": CreditCardIframeWidget
  "ObjectInput"
}

*/

export const DEFAULT_FORMAT = 'default';
export const HIDDEN_FORMAT = 'hidden';
const TEXT_INPUT_WIDGET_ID = 'TextInput';
const HIDDEN_INPUT_WIDGET_ID = 'HiddenInput';

const DEFAULT_TYPE_SCHEMA: TypeSchema = {
  [JsonSchemaDataType.String]: {
    [DEFAULT_FORMAT]: TEXT_INPUT_WIDGET_ID,
    [HIDDEN_FORMAT]: HIDDEN_INPUT_WIDGET_ID,
  },
};

const DEFAULT_WIDGET_MAP: WidgetMap = {
  [HIDDEN_INPUT_WIDGET_ID]: HiddenInputWidget,
  [TEXT_INPUT_WIDGET_ID]: TextWidget,
};

type GetWidgetOpts = {
  type: JsonSchemaDataType;
  format?: string;
};

export default class RegistrySchema {
  typeRegistry: TypeRegistry = {};

  constructor(
    typeSchema: Readonly<TypeSchema> | undefined,
    widgetMap: Readonly<WidgetMap> | undefined
  ) {
    const mergedWidgetMap: WidgetMap = widgetMap
      ? {
          ...DEFAULT_WIDGET_MAP,
          ...widgetMap,
        }
      : DEFAULT_WIDGET_MAP;
    const mergedTypeSchema: TypeSchema = typeSchema
      ? {
          ...DEFAULT_TYPE_SCHEMA,
          ...typeSchema,
        }
      : DEFAULT_TYPE_SCHEMA;
    Object.keys(mergedTypeSchema).forEach((type) => {
      const dataType = type as JsonSchemaDataType;
      const formatWidgetIdMap = mergedTypeSchema[dataType];
      if (formatWidgetIdMap) {
        const formatWidgetMap = {} as WidgetMap;
        Object.keys(formatWidgetIdMap).forEach((format) => {
          const widgetId = formatWidgetIdMap[format];
          if (widgetId) {
            formatWidgetMap[format] = mergedWidgetMap[widgetId];
          }
        });
        this.typeRegistry[dataType] = formatWidgetMap;
      }
    });
  }

  getWidget(opts: Readonly<GetWidgetOpts>): Component<unknown> | undefined {
    const formatWidgetMap = this.typeRegistry[opts.type];
    if (formatWidgetMap) {
      const format = opts.format ?? DEFAULT_FORMAT;
      const component = formatWidgetMap[format];
      if (component) {
        return component as Component;
      }
    }
    return undefined;
  }
}
