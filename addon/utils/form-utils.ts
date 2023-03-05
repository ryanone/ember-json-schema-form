import {
  DataType,
  JsonTypeSchema,
  ObjectTypeSchema,
} from 'ember-json-schema-form/utils/types/json-schema';
import FormValue from 'ember-json-schema-form/utils/form-value';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';

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
  // TODO: Add support for array types
  if (dataSchema.type === DataType.Object) {
    const objSchema = dataSchema as unknown as ObjectTypeSchema;
    const objProperties = objSchema.properties;
    const objData = data && (data as Record<string, FormData>);
    const requiredProperties: string[] = objSchema.required ?? [];
    Object.keys(objProperties).forEach((key) => {
      const propertyElementSchema: FormElementSchema =
        elementSchema && elementSchema[key]
          ? (elementSchema[key] as FormElementSchema)
          : { 'widget:name': key };
      const formFieldArgs: FormFieldArgs = {
        data: objData && (objData[key] as FormData),
        dataSchema: objProperties && (objProperties[key] as JsonTypeSchema),
        formId,
        elementSchema: propertyElementSchema,
        onValueChange,
        onValueInitialized,
        isRequired: requiredProperties.includes(key),
      };
      argsList.push(formFieldArgs);
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
