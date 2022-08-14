import type { FormData } from 'ember-json-schema-form/utils/form-utils';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';

export interface WidgetEnum<ValueType> {
  label?: string;
  value: ValueType;
}

export interface WidgetArgs {
  data: FormData;
  description?: string;
  formId: string;
  name: string;
  onValueChange: (name: string, value: FormValueType) => void;
  required?: boolean;
  title?: string;
  value: FormValueType;
}

export interface EnumWidgetArgs extends WidgetArgs {
  enums: WidgetEnum<Exclude<FormValueType, Array<unknown>>>[];
}
