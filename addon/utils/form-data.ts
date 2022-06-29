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

export interface FormElementArgs {
  data: FormData;
  dataSchema: JsonSchemaType;
  name?: string;
}

export function createFormElementsData(
  data: FormData,
  dataSchema: JsonSchemaType,
  formId: string,
  formElementOpts?: FormElementOpts
): FormElementArgs[] {
  const formElementsArgs = [];
  // TODO: Add support for array types
  if (dataSchema.type === DataType.Object) {
    const objData = data as Record<string, unknown>;
    Object.keys(objData).forEach((key) => {
      const objSchema = dataSchema as unknown as ObjectType;
      const objProperties = objSchema.properties;
      formElementsArgs.push(
        createFormElementsData(
          objData[key] as Record<string, unknown>,
          objProperties[key] as JsonSchemaType,
          formId,
          { name: key }
        )
      );
    });
  } else {
    const formElementArgs: FormElementArgs = {
      data,
      dataSchema,
    };
    if (formElementOpts?.name) {
      formElementArgs.name = formElementOpts.name;
    }
    formElementsArgs.push(formElementArgs);
  }
  return formElementsArgs;
}
