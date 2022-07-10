import {
  DataType,
  JsonTypeSchema,
  ObjectTypeSchema,
} from 'ember-dynamic-form/utils/types/json-schema';
import FormValue from 'ember-dynamic-form/utils/form-value';
import type { FormValueType } from 'ember-dynamic-form/utils/types/form';

export type FormData =
  | Record<string, unknown>
  | boolean
  | null
  | number
  | string
  | unknown[];

// export interface FormElementSchema {
// }
export type FormElementSchema = Record<string, unknown>;

export interface FormFieldArgs {
  data: FormData;
  dataSchema: JsonTypeSchema;
  formId: string;
  elementSchema?: FormElementSchema;
  onValueChange: (name: string, value: FormValueType) => void,
  onValueInitialized: (formValue: FormValue) => void;
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
  // TODO: Add support for array types
  if (dataSchema.type === DataType.Object) {
    const objSchema = dataSchema as unknown as ObjectTypeSchema;
    const objProperties = objSchema.properties;
    const objData = data && (data as Record<string, unknown>);
    Object.keys(objProperties).forEach((key) => {
      let propertyFormElementSchema: FormElementSchema;
      if (elementSchema && elementSchema[key]) {
        propertyFormElementSchema = elementSchema[key] as FormElementSchema;
      } else {
        propertyFormElementSchema = {
          'widget:name': key,
        };
      }
      if (
        !propertyFormElementSchema ||
        !propertyFormElementSchema['widget:name']
      ) {
        propertyFormElementSchema['widget:name'] = key;
      }

      argsList.push(
        ...createFormFieldArgsList(
          objData && (objData[key] as Record<string, unknown>),
          objProperties[key] as JsonTypeSchema,
          formId,
          onValueChange,
          onValueInitialized,
          propertyFormElementSchema
        )
      );
    });
  } else {
    const formFieldArgs: FormFieldArgs = {
      data,
      dataSchema,
      formId,
      onValueChange,
      onValueInitialized,
    };
    if (elementSchema) {
      formFieldArgs.elementSchema = elementSchema;
    }
    argsList.push(formFieldArgs);
  }
  return argsList;
}
