import Component from '@glimmer/component';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';
import type { EnumWidgetArgs } from 'ember-json-schema-form/utils/types/widget';
import { action } from '@ember/object';
import { createDomId } from 'ember-json-schema-form/utils/dom';

interface SelectOption {
  label?: string;
  value: Exclude<FormValueType, Array<unknown>>;
  selected: boolean;
}

export default class JsonSchemaFormWidgetsSelectWidget extends Component<EnumWidgetArgs> {
  get formElementId() {
    return createDomId(this);
  }

  get selectOptions(): SelectOption[] {
    if (Array.isArray(this.args.value)) {
      const values: unknown[] = this.args.value;
      return this.args.enums.map((e) => ({
        ...e,
        selected: values.includes(e.value),
      }));
    } else {
      return this.args.enums.map((e) => ({
        ...e,
        selected: e.value === this.args.value,
      }));
    }
  }

  @action
  onOptionSelect(e: Event) {
    const select = e.target as HTMLSelectElement;
    const { selectedOptions } = select;
    if (selectedOptions.length === 1) {
      const value = selectedOptions[0]?.value;
      this.args.onValueChange(this.args.name, value);
    } else {
      const values = Array.from(selectedOptions).map((option) => option.value);
      this.args.onValueChange(this.args.name, values);
    }
  }
}
