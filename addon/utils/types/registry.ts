import type { DataType as JsonSchemaDataType } from 'ember-dynamic-form/utils/types/json-schema';

/**
 * Ex.
 * {
 *   "default": "TextInput",
 *   "email": "EmailInput",
 * }
 */
export type TypeFormatToWidgetIdMap = Record<string, string>;

export type TypeSchema = {
  [key in JsonSchemaDataType]?: TypeFormatToWidgetIdMap;
};

// NOTE: Instead of unknown, the actual type is Component
export type WidgetMap = Record<string, unknown>;

export type TypeRegistry = {
  [key in JsonSchemaDataType]?: WidgetMap;
};
