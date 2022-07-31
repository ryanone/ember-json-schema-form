import Controller from '@ember/controller';
import CreditCardPanelComponent from '../components/credit-card-panel';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  get data() {
    // return 'abcdefg';
    return {
      firstName: 'Bob',
      lastName: 'Jones',
    };
    // return {
    //   creditCardNumber: '4988 4388 4388 4305',
    //   cvv: '053',
    //   $type: 'com.linkedin.payments.paymentmethod.CreditCard',
    // };
  }

  get dataSchema(): Record<string, unknown> {
    // return {
    //   type: 'string',
    // };
    // return {
    //   title: 'Credit Card Panel',
    //   type: 'object',
    //   format: 'credit-card',
    //   properties: {
    //     creditCardNumber: {
    //       title: 'Credit card number',
    //       type: 'string',
    //     },
    //     cvv: {
    //       title: 'CVV',
    //       type: 'string',
    //     },
    //     $type: {
    //       type: 'string',
    //       format: 'hidden',
    //     },
    //   },
    // };
    return {
      title: 'My form',
      description: 'My description',
      type: 'object',
      properties: {
        firstName: {
          description: 'Enter your first name',
          title: 'First name',
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        address: {
          type: 'object',
          properties: {
            streetAddress: {
              title: 'Street Address',
              type: 'string',
            },
            city: {
              title: 'City',
              type: 'string',
            },
          },
        },
      },
    };
  }

  get dataTypeSchema(): Record<string, unknown> {
    return {
      object: {
        'credit-card': 'CreditCardPanel',
      },
    };
  }

  get elementSchema(): Record<string, unknown> {
    return {
      firstName: {
        'widget:name': 'person.firstName',
      },
      lastName: {
        'widget:name': 'person.lastName',
      },
      address: {
        streetAddress: {
          'widget:name': 'address.streetAddress',
        },
        city: {
          'widget:name': 'address.city',
        },
      },
      'form:submitButton': {
        text: 'Submit your information',
      },
    };
    // return {
    //   'widget:name': 'paymentMethod',
    //   'widget:validate': this.validatePaymentMethod,
    //   creditCardNumber: {
    //     'widget:name': 'paymentMethod.creditCardNumber',
    //   },
    //   cvv: {
    //     'widget:name': 'paymentMethod.creditCardCvv',
    //   },
    //   hidden: {
    //     'widget:name': 'paymentMethod.$type',
    //   },
    // };
    // return {
    //   'widget:name': 'stringProp',
    //   'widget:validate': () => {
    //     return undefined;
    //   },
    // };
  }

  get widgets(): Record<string, unknown> {
    return {
      CreditCardPanel: CreditCardPanelComponent,
    };
  }

  @action
  onFormSubmit(data: Record<string, unknown>) {
    console.log('onFormSubmit: %o', data);
  }

  @action
  validatePaymentMethod(
    value: FormValueType,
    formState: Record<string, unknown> | FormValueType
  ): string | undefined {
    console.log('controller.validatePaymentMethod(%o, %o)', value, formState);
    return 'Invalid payment method';
  }
}
