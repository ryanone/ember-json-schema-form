import ContactDetailComponent from '../components/contact-detail';
import CreditCardPanelComponent from '../components/credit-card-panel';
import { FormValueType } from 'ember-json-schema-form/utils/types/form';

export const DATA: Record<string, unknown> = {
  contactDetail: {
    firstName: 'John',
    lastName: 'Doe',
  },
  paymentMethodType: 'CARD',
};

export const DATA_SCHEMA: Record<string, unknown> = {
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
      // format: this.includePostalCode ? undefined : 'hidden',
      format: 'hidden',
    },
  },
};

export const DATA_TYPE_SCHEMA: Record<string, unknown> = {
  object: {
    'contact-detail': 'ContactDetail',
    'credit-card': 'CreditCardPanel',
  },
};

export const ELEMENT_SCHEMA: Record<string, unknown> = {
  'widget:name': 'paymentMethod',
  'widget:validate': validatePaymentMethod,
};

export const WIDGETS: Record<string, unknown> = {
  ContactDetail: ContactDetailComponent,
  CreditCardPanel: CreditCardPanelComponent,
};

function validatePaymentMethod(
  value: FormValueType,
  formState: Record<string, unknown> | FormValueType
): string | undefined {
  // eslint-disable-next-line no-console
  console.log('controller.validatePaymentMethod(%o, %o)', value, formState);
  return 'Invalid payment method';
}

export default {
  DATA,
  DATA_SCHEMA,
  DATA_TYPE_SCHEMA,
  ELEMENT_SCHEMA,
  WIDGETS,
};
