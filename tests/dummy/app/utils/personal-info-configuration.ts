export const DATA = {};

export const DATA_SCHEMA: Record<string, unknown> = {
  title: 'My form',
  description: 'My description',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      description: 'Enter your first name',
      title: 'First name',
      type: 'string',
      minLength: 1,
    },
    lastName: {
      type: 'string',
      title: 'Last name',
      pattern: '^[A-Z][a-z]+$',
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

export const DATA_TYPE_SCHEMA: Record<string, unknown> = {};

export const ELEMENT_SCHEMA: Record<string, unknown> = {
  // 'widget:order': ['address', 'firstName', 'lastName'],
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
      'widget:placeholder': 'Enter your city',
    },
  },
  'form:submitButton': {
    text: 'Submit your information',
  },
};

export const WIDGETS: Record<string, unknown> = {};
