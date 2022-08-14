export enum DataType {
  Array = 'array',
  Boolean = 'boolean',
  Integer = 'integer',
  Object = 'object',
  Null = 'null',
  Number = 'number',
  String = 'string',
}

enum SchemaVersion {
  Draft4 = 'http://json-schema.org/draft-04/schema#',
  Draft6 = 'http://json-schema.org/draft-06/schema#',
  Draft7 = 'http://json-schema.org/draft-07/schema#',
  Draft2019_09 = 'https://json-schema.org/draft/2019-09/schema',
}

// See http://json-schema.org/understanding-json-schema/reference/string.html#built-in-formats
// for comprehensive list.
enum StringFormat {
  Date = 'date',
  DateTime = 'date-time',
  Duration = 'duration',
  Email = 'email',
  IdnEmail = 'idn-email',
  Time = 'time',
}

export default interface RootJsonSchema {
  $id: string;
  $schema: SchemaVersion;
}

interface BaseDataTypeSchema {
  description?: string;
  title?: string;
  format?: string;
}

// Reference: http://json-schema.org/understanding-json-schema/reference/array.html
export interface ArrayTypeSchema extends BaseDataTypeSchema {
  type: DataType.Array;
  items: {
    type: DataType;
  };
}

export interface BooleanTypeSchema extends BaseDataTypeSchema {
  type: DataType.Boolean;
  anyOf?: BooleanTypeSchema[];
  enum?: boolean[];
}

export interface IntegerTypeSchema extends BaseDataTypeSchema {
  type: DataType.Integer;
  anyOf?: NumberTypeSchema[];
  enum?: number[];
}

// Reference: http://json-schema.org/understanding-json-schema/reference/object.html
export interface ObjectTypeSchema extends BaseDataTypeSchema {
  type: DataType.Object;
  properties: Record<string, JsonTypeSchema>;
  required?: string[];
}

export interface NullTypeSchema extends BaseDataTypeSchema {
  type: DataType.Null;
}

export interface NumberTypeSchema extends BaseDataTypeSchema {
  type: DataType.Number;
  anyOf?: NumberTypeSchema[];
  enum?: number[];
}

// Reference: http://json-schema.org/understanding-json-schema/reference/string.html
export interface StringTypeSchema extends BaseDataTypeSchema {
  type: DataType.String;
  format?: StringFormat;
  anyOf?: StringTypeSchema[];
  enum?: string[];
}

export type JsonTypeSchema =
  | ArrayTypeSchema
  | BooleanTypeSchema
  | IntegerTypeSchema
  | ObjectTypeSchema
  | NullTypeSchema
  | NumberTypeSchema
  | StringTypeSchema;

interface RootArrayTypeSchema extends RootJsonSchema, ArrayTypeSchema {}
interface RootBooleanTypeSchema extends RootJsonSchema, BooleanTypeSchema {}
interface RootIntegerTypeSchema extends RootJsonSchema, IntegerTypeSchema {}
interface RootObjectTypeSchema extends RootJsonSchema, ObjectTypeSchema {}
interface RootNullTypeSchema extends RootJsonSchema, NullTypeSchema {}
interface RootNumberTypeSchema extends RootJsonSchema, NumberTypeSchema {}
interface RootStringTypeSchema extends RootJsonSchema, StringTypeSchema {}

export type JsonSchema =
  | RootArrayTypeSchema
  | RootBooleanTypeSchema
  | RootIntegerTypeSchema
  | RootObjectTypeSchema
  | RootNullTypeSchema
  | RootNumberTypeSchema
  | RootStringTypeSchema;
