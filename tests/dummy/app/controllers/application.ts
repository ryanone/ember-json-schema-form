import ContactDetailComponent from '../components/contact-detail';
import Controller from '@ember/controller';
import CreditCardPanelComponent from '../components/credit-card-panel';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

interface OnValueChangeArgs {
  name: string;
  value: FormValueType;
}

export default class ApplicationController extends Controller {
  @tracked
  data: Record<string, unknown> = tracked({
    contactDetail: {
      firstName: 'John',
      lastName: 'Doe',
    },
    paymentMethodType: 'CARD',
  });

  @tracked
  includePostalCode = false;

  // 'abcdefg';
  // {
  //   firstName: 'Bob',
  //   lastName: 'Jones',
  // };
  // {
  //   contactDetail: {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //   },
  //   paymentMethodType: 'CARD',
  //   contactDetailCountry: 'ca',
  //   creditCardNumber: '4988 4388 4388 4305',
  //   cvv: '053',
  //   $type: 'com.linkedin.payments.paymentmethod.CreditCard',
  // };

  get dataSchema(): Record<string, unknown> {
    // return {
    //   type: 'string',
    // };
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
    return {
      type: 'object',
      properties: {
        contactDetail: {
          type: 'object',
          format: 'contact-detail',
          properties: {
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
          },
        },
        paymentMethodType: {
          type: 'string',
          format: 'hidden',
        },
        contactDetailCountry: {
          title: 'Country',
          type: 'string',
          format: 'select',
          anyOf: [
            {
              type: 'string',
              title: 'United States',
              enum: ['us'],
            },
            {
              type: 'string',
              title: 'Canada',
              enum: ['ca'],
            },
            {
              type: 'string',
              title: 'Mexico',
              enum: ['mx'],
            },
          ],
        },
        contactDetailPostalCode: {
          title: 'Postal code',
          type: 'string',
          format: this.includePostalCode ? undefined : 'hidden',
        },
      },
    };
  }

  get dataTypeSchema(): Record<string, unknown> {
    return {
      object: {
        'contact-detail': 'ContactDetail',
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
    //   address: {
    //     streetAddress: {
    //       'widget:name': 'address.streetAddress',
    //     },
    //     city: {
    //       'widget:name': 'address.city',
    //     },
    //   },
    //   'form:submitButton': {
    //     text: 'Submit your information',
    //   },
    // };
    return {
      'widget:name': 'paymentMethod',
      'widget:validate': this.validatePaymentMethod,
    };
    // return {
    //   'widget:name': 'stringProp',
    //   'widget:validate': () => {
    //     return undefined;
    //   },
    // };
  }

  get widgets(): Record<string, unknown> {
    return {
      ContactDetail: ContactDetailComponent,
      CreditCardPanel: CreditCardPanelComponent,
    };
  }

  @action
  onFormSubmit(data: Record<string, unknown>) {
    // eslint-disable-next-line no-console
    console.log('onFormSubmit: %o', data);
  }

  @action
  onValueChange(formValue: OnValueChangeArgs) {
    // eslint-disable-next-line no-console
    console.log('onFormValue: %o', formValue);
    this.includePostalCode =
      formValue.name === 'contactDetailCountry' && formValue.value === 'us';
    if (formValue.name === 'contactDetailCountry') {
      this.data['contactDetailCountry'] = formValue.value ?? undefined;
    }
  }

  @action
  validatePaymentMethod(
    value: FormValueType,
    formState: Record<string, unknown> | FormValueType
  ): string | undefined {
    // eslint-disable-next-line no-console
    console.log('controller.validatePaymentMethod(%o, %o)', value, formState);
    return 'Invalid payment method';
  }
}
