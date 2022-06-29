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

interface BaseJsonDataType {
  description?: string;
  title?: string;
}

// Reference: http://json-schema.org/understanding-json-schema/reference/array.html
export interface ArrayType extends BaseJsonDataType {
  type: DataType.Array;
  items: {
    type: DataType;
  };
}

export interface BooleanType extends BaseJsonDataType {
  type: DataType.Boolean;
}

export interface IntegerType extends BaseJsonDataType {
  type: DataType.Integer;
}

// Reference: http://json-schema.org/understanding-json-schema/reference/object.html
export interface ObjectType extends BaseJsonDataType {
  type: DataType.Object;
  properties: Record<string, JsonSchemaType>;
  required?: string[];
}

export interface NullType extends BaseJsonDataType {
  type: DataType.Null;
}

export interface NumberType extends BaseJsonDataType {
  type: DataType.Number;
}

// Reference: http://json-schema.org/understanding-json-schema/reference/string.html
export interface StringType extends BaseJsonDataType {
  type: DataType.String;
  format?: StringFormat;
}

export type JsonSchemaType =
  | ArrayType
  | BooleanType
  | IntegerType
  | ObjectType
  | NullType
  | NumberType
  | StringType;

interface RootArrayType extends RootJsonSchema, ArrayType {}
interface RootBooleanType extends RootJsonSchema, BooleanType {}
interface RootIntegerType extends RootJsonSchema, IntegerType {}
interface RootObjectType extends RootJsonSchema, ObjectType {}
interface RootNullType extends RootJsonSchema, NullType {}
interface RootNumberType extends RootJsonSchema, NumberType {}
interface RootStringType extends RootJsonSchema, StringType {}

export type JsonSchema =
  | RootArrayType
  | RootBooleanType
  | RootIntegerType
  | RootObjectType
  | RootNullType
  | RootNumberType
  | RootStringType;
