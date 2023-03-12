export const DATA: Record<string, unknown> = {
  state: 'OR',
};

export const DATA_SCHEMA: Record<string, unknown> = {
  type: 'object',
  properties: {
    state: {
      title: 'State',
      type: 'string',
      format: 'select',
      anyOf: [
        {
          type: 'string',
          enum: ['CA'],
        },
        {
          type: 'string',
          enum: ['OR'],
        },
        {
          type: 'string',
          enum: ['WA'],
        },
      ],
    },
  },
};

export const DATA_TYPE_SCHEMA: Record<string, unknown> = {
  string: {
    select: 'Select',
  },
};

export const ELEMENT_SCHEMA: Record<string, unknown> = {
  state: {
    'widget:name': 'state',
    'widget:placeholder': 'Select a state',
  },
};

export const WIDGETS: Record<string, unknown> = {};
