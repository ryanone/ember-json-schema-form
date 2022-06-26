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

export default interface JsonSchema extends BaseJsonSchemaType {
  $id: string;
  $schema: SchemaVersion;
}

interface BaseJsonSchemaType {
  type: DataType;
}

// Reference: http://json-schema.org/understanding-json-schema/reference/array.html
export interface ArrayType extends BaseJsonSchemaType {
  type: DataType.Array;
  items: {
    type: DataType;
  };
}

export interface BooleanType extends BaseJsonSchemaType {
  type: DataType.Boolean;
}

export interface IntegerType extends BaseJsonSchemaType {
  type: DataType.Integer;
}

// Reference: http://json-schema.org/understanding-json-schema/reference/object.html
export interface ObjectType extends BaseJsonSchemaType {
  type: DataType.Object;
  properties: Record<string, JsonSchemaType>;
  required?: string[];
}

export interface NullType extends BaseJsonSchemaType {
  type: DataType.Null;
}

export interface NumberType extends BaseJsonSchemaType {
  type: DataType.Number;
}

// Reference: http://json-schema.org/understanding-json-schema/reference/string.html
export interface StringType extends BaseJsonSchemaType {
  type: DataType.String;
  format?: StringFormat;
}

type JsonSchemaType =
  | ArrayType
  | BooleanType
  | IntegerType
  | ObjectType
  | NullType
  | NumberType
  | StringType;
