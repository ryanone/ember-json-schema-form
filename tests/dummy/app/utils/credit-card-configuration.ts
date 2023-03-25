import ContactDetailComponent from '../components/contact-detail';
import CreditCardPanelComponent from '../components/credit-card-panel';

export const DATA: Record<string, unknown> = {
  contactDetail: {
    firstName: 'John',
    lastName: 'Doe',
  },
  contactDetailCountry: 'us',
  paymentMethodType: 'CARD',
  expiration: {
    month: 5,
    year: 2027,
  },
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
    expiration: {
      type: 'object',
      properties: {
        month: {
          type: 'integer',
        },
        year: {
          type: 'integer',
        },
      },
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
      format: 'hidden',
      // format: this.includePostalCode ? undefined : 'hidden',
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
  paymentMethodType: {
    'widget:name': 'paymentMethod.type',
  },
  contactDetailCountry: {
    'widget:name': 'contactDetail.country',
  },
  contactDetailPostalCode: {
    'widget:name': 'contactDetail.postalCode',
  },
  expiration: {
    month: {
      'widget:name': 'paymentMethod.expiration.month',
    },
    year: {
      'widget:name': 'paymentMethod.expiration.year',
    },
  },
};

export const WIDGETS: Record<string, unknown> = {
  ContactDetail: ContactDetailComponent,
  CreditCardPanel: CreditCardPanelComponent,
};
