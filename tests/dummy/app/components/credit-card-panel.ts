import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface CreditCardPanelArgs {
  value: Record<string, string>;
}

export default class CreditCardPanelComponent extends Component<CreditCardPanelArgs> {
  @tracked
  creditCardNumber;

  @tracked
  creditCardCvv;

  constructor(owner: unknown, args: CreditCardPanelArgs) {
    super(owner, args);
    this.creditCardNumber = this.args.value['creditCardNumber'];
    this.creditCardCvv = this.args.value['cvv'];
  }
}
