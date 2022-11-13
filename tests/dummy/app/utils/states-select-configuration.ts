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
    select: 'Autocomplete',
  },
};

export const ELEMENT_SCHEMA: Record<string, unknown> = {};

export const WIDGETS: Record<string, unknown> = {};
