import {
  DataType,
  JsonTypeSchema,
  ObjectTypeSchema,
} from 'ember-dynamic-form/utils/types/json-schema';

export type FormData =
  | Record<string, unknown>
  | boolean
  | null
  | number
  | string
  | unknown[];

export interface FormElementSchema {
  name?: string;
}

export interface FormFieldArgs {
  data: FormData;
  dataSchema: JsonTypeSchema;
  formId: string;
  elementSchema?: FormElementSchema;
}

export function createFormFieldArgsList(
  data: FormData,
  dataSchema: JsonTypeSchema,
  formId: string,
  elementSchema?: FormElementSchema
): FormFieldArgs[] {
  const argsList = [];
  // TODO: Add support for array types
  if (dataSchema.type === DataType.Object) {
    const objSchema = dataSchema as unknown as ObjectTypeSchema;
    const objProperties = objSchema.properties;
    const objData = data && (data as Record<string, unknown>);
    Object.keys(objProperties).forEach((key) => {
      argsList.push(
        ...createFormFieldArgsList(
          objData && (objData[key] as Record<string, unknown>),
          objProperties[key] as JsonTypeSchema,
          formId,
          { name: key }
        )
      );
    });
  } else {
    const formFieldArgs: FormFieldArgs = {
      data,
      dataSchema,
      formId,
    };
    if (elementSchema) {
      formFieldArgs.elementSchema = elementSchema;
    }
    argsList.push(formFieldArgs);
  }
  return argsList;
}
