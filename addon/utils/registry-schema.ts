import {
  TypeRegistry,
  TypeSchema,
  WidgetMap,
} from 'ember-json-schema-form/utils/types/registry';
import AutocompleteWidget from 'ember-json-schema-form/components/json-schema-form/widgets/autocomplete-widget';
import CheckboxWidget from  'ember-json-schema-form/components/json-schema-form/widgets/checkbox-widget';
import Component from '@glimmer/component';
import HiddenInputWidget from 'ember-json-schema-form/components/json-schema-form/widgets/hidden-input-widget';
import { DataType as JsonSchemaDataType } from 'ember-json-schema-form/utils/types/json-schema';
import SelectWidget from 'ember-json-schema-form/components/json-schema-form/widgets/select-widget';
import TextWidget from 'ember-json-schema-form/components/json-schema-form/widgets/text-widget';
import type { TypeFormatToWidgetIdMap } from 'ember-json-schema-form/utils/types/registry';

export const DEFAULT_FORMAT = 'default';
export const HIDDEN_FORMAT = 'hidden';
export const SELECT_FORMAT = 'select';
const AUTOCOMPLETE_WIDGET_ID = 'Autocomplete';
const CHECKBOX_WIDGET_ID = 'Checkbox';
const HIDDEN_INPUT_WIDGET_ID = 'HiddenInput';
const SELECT_WIDGET_ID = 'Select';
const TEXT_INPUT_WIDGET_ID = 'TextInput';

const DEFAULT_TYPE_SCHEMA: TypeSchema = {
  [JsonSchemaDataType.Boolean]: {
    [DEFAULT_FORMAT]: CHECKBOX_WIDGET_ID,
  },
  [JsonSchemaDataType.Integer]: {
    [DEFAULT_FORMAT]: TEXT_INPUT_WIDGET_ID,
    [HIDDEN_FORMAT]: HIDDEN_INPUT_WIDGET_ID,
  },
  [JsonSchemaDataType.Number]: {
    [DEFAULT_FORMAT]: TEXT_INPUT_WIDGET_ID,
    [HIDDEN_FORMAT]: HIDDEN_INPUT_WIDGET_ID,
  },
  [JsonSchemaDataType.String]: {
    [DEFAULT_FORMAT]: TEXT_INPUT_WIDGET_ID,
    [HIDDEN_FORMAT]: HIDDEN_INPUT_WIDGET_ID,
    [SELECT_FORMAT]: SELECT_WIDGET_ID,
  },
};

const DEFAULT_WIDGET_MAP: WidgetMap = {
  [AUTOCOMPLETE_WIDGET_ID]: AutocompleteWidget,
  [CHECKBOX_WIDGET_ID]: CheckboxWidget,
  [HIDDEN_INPUT_WIDGET_ID]: HiddenInputWidget,
  [SELECT_WIDGET_ID]: SelectWidget,
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
    const mergedTypeSchema: TypeSchema = { ...DEFAULT_TYPE_SCHEMA };
    if (typeSchema) {
      Object.keys(typeSchema).forEach((key) => {
        const typeSchemaKey = key as JsonSchemaDataType;
        const currTypeSchema =
          mergedTypeSchema[typeSchemaKey] ??
          (mergedTypeSchema[typeSchemaKey] as TypeFormatToWidgetIdMap);
        mergedTypeSchema[typeSchemaKey] = {
          ...currTypeSchema,
          ...typeSchema[typeSchemaKey],
        };
      });
    }
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
