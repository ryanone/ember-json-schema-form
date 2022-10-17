export const DATA = 'abcdefg';

export const DATA_SCHEMA: Record<string, unknown> = {
  type: 'string',
};

export const DATA_TYPE_SCHEMA: Record<string, unknown> = {};

export const ELEMENT_SCHEMA: Record<string, unknown> = {
  'widget:name': 'stringProp',
  'widget:validate': () => {
    return undefined;
  },
};;

export const WIDGETS: Record<string, unknown> = {};
