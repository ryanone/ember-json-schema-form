import Component from '@glimmer/component';
import type { EnumWidgetArgs } from 'ember-json-schema-form/utils/types/widget';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { action } from '@ember/object';
import { createDomId } from 'ember-json-schema-form/utils/dom';

interface SelectOption {
  label?: string;
  value: Exclude<FormValueType, Array<unknown>>;
  selected: boolean;
}

const PLACEHOLDER_ATTR_NAME = 'data-select-widget-placeholder';

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
      const selectedOption = selectedOptions[0];
      if (!selectedOption?.hasAttribute(PLACEHOLDER_ATTR_NAME)) {
        const value = selectedOptions[0]?.value;
        this.args.onValueChange(this.args.name, value);
      }
    } else {
      const values = Array.from(selectedOptions).map((option) => option.value);
      this.args.onValueChange(this.args.name, values);
    }
  }
}
