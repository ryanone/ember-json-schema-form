import type {
  DataType as JsonSchemaDataType,
  JsonTypeSchema,
  StringTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import type { FormData } from 'ember-json-schema-form/utils/form-utils';

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

export type ErrorMessageEntry = (
  data: FormData,
  dataSchema: JsonTypeSchema
) => string;

export type ErrorMessageMaxLengthEntry = (
  data: FormData,
  dataSchema: StringTypeSchema
) => string;
