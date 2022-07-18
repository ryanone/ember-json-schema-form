import type { FormData } from 'ember-json-schema-form/utils/form-utils';
import type { FormValueType } from 'ember-json-schema-form/utils/types/form';

// export interface WidgetEnum<ValueType> {
//   key: string;
//   selected: boolean;
//   value: ValueType;
// }

export interface WidgetArgs {
  data: FormData;
  description?: string;
  formId: string;
  // enums?: WidgetEnum<ValueType>[];
  name: string;
  onValueChange: (name: string, value: FormValueType) => void;
  required?: boolean;
  title?: string;
  value: FormValueType;
}
