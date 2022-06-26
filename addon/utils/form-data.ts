import JsonSchema, {
  DataType,
  ObjectType,
} from 'ember-dynamic-form/utils/types/json-schema';

interface FormElementOpts {
  name?: string;
}

export interface FormElementData {
  data: Record<string, unknown>;
  dataSchema: JsonSchema;
  formId: string;
  name?: string;
}

export function createFormElementsData(
  data: Record<string, unknown>,
  dataSchema: JsonSchema,
  formId: string,
  formElementOpts?: FormElementOpts
): FormElementData[] {
  const formElementsData = [];
  // TODO: Add support for array types
  if (dataSchema.type === DataType.Object) {
    Object.keys(data).forEach((key) => {
      const objSchema = dataSchema as unknown as ObjectType;
      const objProperties = objSchema.properties;
      formElementsData.push(
        createFormElementsData(
          data[key] as Record<string, unknown>,
          objProperties[key] as JsonSchema,
          formId,
          { name: key }
        )
      );
    });
  } else {
    const formElementData: FormElementData = {
      data,
      dataSchema,
      formId,
    };
    if (formElementOpts?.name) {
      formElementData.name = formElementOpts.name;
    }
    formElementsData.push(formElementData);
  }
  return formElementsData;
}
