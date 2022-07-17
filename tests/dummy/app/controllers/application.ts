import Controller from '@ember/controller';
import CreditCardPanelComponent from '../components/credit-card-panel';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  get data() {
    // return {
    //   firstName: 'Bob',
    //   lastName: 'Jones',
    // };
    // return 'abcdefg';
    return {
      creditCardNumber: '4988 4388 4388 4305',
      cvv: '053',
    };
  }

  get dataSchema(): Record<string, unknown> {
    return {
      title: 'Credit Card Panel',
      type: 'object',
      format: 'credit-card',
      properties: {
        creditCardNumber: {
          type: 'string',
        },
        cvv: {
          type: 'string',
        },
      },
    };
    // return {
    //   title: 'My form',
    //   description: 'My description',
    //   type: 'object',
    //   properties: {
    //     firstName: {
    //       description: 'Enter your first name',
    //       title: 'First name',
    //       type: 'string',
    //     },
    //     lastName: {
    //       type: 'string',
    //     },
    //     address: {
    //       type: 'object',
    //       properties: {
    //         streetAddress: {
    //           title: 'Street Address',
    //           type: 'string',
    //         },
    //         city: {
    //           title: 'City',
    //           type: 'string',
    //         },
    //       },
    //     },
    //   },
    // };
    // return { type: 'string' };
  }

  get dataTypeSchema(): Record<string, unknown> {
    return {
      object: {
        'credit-card': 'CreditCardPanel',
      },
    };
  }

  get elementSchema(): Record<string, unknown> {
    // return {
    //   firstName: {
    //     'widget:name': 'person.firstName',
    //   },
    //   lastName: {
    //     'widget:name': 'person.lastName',
    //   },
    //   'form:submitButton': {
    //     text: 'Submit your information',
    //   },
    // };
    return {
      'widget:name': 'paymentMethod',
      creditCardNumber: {
        'widget:name': 'paymentMethod.creditCardNumber',
      },
      cvv: {
        'widget:name': 'paymentMethod.creditCardCvv',
      },
    };
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
}
