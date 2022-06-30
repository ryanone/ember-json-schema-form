import {
  DataType,
  JsonSchemaType,
  ObjectType,
} from 'ember-dynamic-form/utils/types/json-schema';

export type FormData =
  | Record<string, unknown>
  | boolean
  | null
  | number
  | string
  | unknown[];

export interface FormElementOpts {
  name?: string;
}

export interface FormFieldArgs {
  data: FormData;
  dataSchema: JsonSchemaType;
  formId: string;
  elementOpts?: FormElementOpts;
}

export function createFormFieldArgsList(
  data: FormData,
  dataSchema: JsonSchemaType,
  formId: string,
  name?: string
): FormFieldArgs[] {
  const argsList = [];
  // TODO: Add support for array types
  if (dataSchema.type === DataType.Object) {
    const objData = data as Record<string, unknown>;
    Object.keys(objData).forEach((key) => {
      const objSchema = dataSchema as unknown as ObjectType;
      const objProperties = objSchema.properties;
      argsList.push(
        createFormFieldArgsList(
          objData[key] as Record<string, unknown>,
          objProperties[key] as JsonSchemaType,
          formId,
          key
        )
      );
    });
  } else {
    const formFieldArgs: FormFieldArgs = {
      data,
      dataSchema,
      formId,
    };
    if (name) {
      formFieldArgs.elementOpts = { name };
    }
    argsList.push(formFieldArgs);
  }
  return argsList;
}
