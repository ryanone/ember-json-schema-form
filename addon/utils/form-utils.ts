import {
  ArrayTypeSchema,
  BooleanTypeSchema,
  DataType,
  IntegerTypeSchema,
  JsonTypeSchema,
  NumberTypeSchema,
  ObjectTypeSchema,
  StringTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import ArrayFormField from 'ember-json-schema-form/components/json-schema-form/form-fields/array-form-field';
import BooleanFormField from 'ember-json-schema-form/components/json-schema-form/form-fields/boolean-form-field';
import Component from '@glimmer/component';
import FormValue from 'ember-json-schema-form/utils/form-value';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';
import IntegerFormField from 'ember-json-schema-form/components/json-schema-form/form-fields/integer-form-field';
import NullFormField from 'ember-json-schema-form/components/json-schema-form/form-fields/null-form-field';
import NumberFormField from 'ember-json-schema-form/components/json-schema-form/form-fields/number-form-field';
import ObjectFormField from 'ember-json-schema-form/components/json-schema-form/form-fields/object-form-field';
import StringFormField from 'ember-json-schema-form/components/json-schema-form/form-fields/string-form-field';
import { WidgetEnum } from 'ember-json-schema-form/utils/types/widget';

export const FormFieldMap: Record<DataType, typeof Component> = {
  [DataType.Array]: ArrayFormField,
  [DataType.Boolean]: BooleanFormField,
  [DataType.Integer]: IntegerFormField,
  [DataType.Number]: NumberFormField,
  [DataType.Null]: NullFormField,
  [DataType.Object]: ObjectFormField,
  [DataType.String]: StringFormField,
};

export type FormData =
  | Record<string, unknown>
  | boolean
  | null
  | number
  | string
  | unknown[];

export type FormElementSchema = Record<string, unknown>;

export interface FormFieldArgs {
  data: FormData;
  dataSchema: JsonTypeSchema;
  formId: string;
  elementSchema?: FormElementSchema;
  errorMessage?: string;
  placeholder?: string;
  onValueChange: (name: string, value: FormValueType) => void;
  onValueInitialized: (formValue: FormValue) => void;
  isRequired: boolean;
}

export function createFormFieldArgsList(
  data: FormData,
  dataSchema: JsonTypeSchema,
  formId: string,
  onValueChange: (name: string, value: FormValueType) => void,
  onValueInitialized: (formValue: FormValue) => void,
  elementSchema?: FormElementSchema
): FormFieldArgs[] {
  const argsList = [];
  if (dataSchema.type === DataType.Object) {
    const objSchema = dataSchema as ObjectTypeSchema;
    const objProperties = objSchema.properties;
    const objData = data && (data as Record<string, FormData>);
    const requiredProperties: string[] = objSchema.required ?? [];
    const keys =
      (elementSchema && (elementSchema['widget:order'] as string[])) ??
      Object.keys(objProperties);
    keys.forEach((key) => {
      const propertyElementSchema: FormElementSchema =
        elementSchema && elementSchema[key]
          ? (elementSchema[key] as FormElementSchema)
          : { 'widget:name': key };
      argsList.push({
        data: objData && (objData[key] as FormData),
        dataSchema: objProperties && (objProperties[key] as JsonTypeSchema),
        formId,
        elementSchema: propertyElementSchema,
        onValueChange,
        onValueInitialized,
        isRequired: requiredProperties.includes(key),
      });
    });
  } else if (dataSchema.type === DataType.Array) {
    const arrSchema = dataSchema as ArrayTypeSchema;
    const arrData = data as [];
    return arrData.map((data) => {
      const formFieldArgs: FormFieldArgs = {
        data,
        dataSchema: arrSchema.items,
        formId,
        onValueChange,
        onValueInitialized,
        isRequired: false,
      };
      if (elementSchema) {
        formFieldArgs.elementSchema = elementSchema;
      }
      return formFieldArgs;
    });
  } else {
    const formFieldArgs: FormFieldArgs = {
      data,
      dataSchema,
      formId,
      onValueChange,
      onValueInitialized,
      isRequired: false,
    };
    if (elementSchema) {
      formFieldArgs.elementSchema = elementSchema;
    }
    argsList.push(formFieldArgs);
  }
  return argsList;
}

type SchemaTypeWithEnum =
  | BooleanTypeSchema
  | IntegerTypeSchema
  | NumberTypeSchema
  | StringTypeSchema;

export function createEnums<SchemaType extends SchemaTypeWithEnum>(
  dataSchema: JsonTypeSchema
): WidgetEnum<FormValueType>[] | undefined {
  const dataSchemaCast = dataSchema as SchemaType;
  if (dataSchemaCast.enum) {
    return dataSchemaCast.enum.map((e) => ({ value: e }));
  } else if (dataSchemaCast.anyOf) {
    return dataSchemaCast.anyOf.map((s) => {
      const schema = s as StringTypeSchema;
      return {
        label: schema.title,
        value: schema.enum?.[0] ?? '',
      };
    });
  }
  return undefined;
}
