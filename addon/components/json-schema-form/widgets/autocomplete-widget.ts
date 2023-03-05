import Component from '@glimmer/component';
import type { EnumWidgetArgs } from 'ember-json-schema-form/utils/types/widget';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { action } from '@ember/object';
import { createDomId } from 'ember-json-schema-form/utils/dom';

interface DatalistOption {
  label?: string;
  value: Exclude<FormValueType, Array<unknown>>;
  selected?: boolean;
}

export default class JsonSchemaFormWidgetsAutocompleteWidget extends Component<EnumWidgetArgs> {
  get formElementId() {
    return createDomId(this);
  }

  get datalistId() {
    return `${this.formElementId}-datalist`;
  }

  get datalistOptions(): DatalistOption[] {
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
  onValueChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.args.onValueChange(this.args.name, target.value);
  }
}
