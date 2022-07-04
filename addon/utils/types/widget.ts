// export interface WidgetEnum<ValueType> {
//   key: string;
//   selected: boolean;
//   value: ValueType;
// }

export interface WidgetArgs<ValueType> {
  description?: string;
  formId: string;
  // enums?: WidgetEnum<ValueType>[];
  name?: string;
  onValueChange: (value: ValueType) => void;
  required?: boolean;
  title?: string;
  value: ValueType;
}
