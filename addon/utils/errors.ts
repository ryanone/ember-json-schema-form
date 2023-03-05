import type { FormData } from 'ember-json-schema-form/utils/form-utils';

export const ErrorType = {
  MaxLength: 'maxLength',
  MinLength: 'minLength',
  Pattern: 'pattern',
  Required: 'required',
};

export interface ErrorMessageOpts {
  title: string | undefined;
  value?: FormData | undefined;
  length?: number;
}

export type ErrorMessagesMap = Record<string, (o: ErrorMessageOpts) => string>;

export const DefaultErrorMessages: ErrorMessagesMap = {
  [ErrorType.MaxLength]: (opts: ErrorMessageOpts): string => {
    return opts.title
      ? `${opts.title} must not have more than ${opts.length} characters.`
      : `This value must not have more than ${opts.length} characters.`;
  },
  [ErrorType.MinLength]: (opts: ErrorMessageOpts): string => {
    return opts.title
      ? `${opts.title} must have at least ${opts.length} characters.`
      : `This value must have at least ${opts.length} characters.`;
  },
  [ErrorType.Pattern]: (opts: ErrorMessageOpts): string => {
    return opts.title
      ? `Please enter a valid value for ${opts.title}.`
      : 'Please enter a valid value.';
  },
  [ErrorType.Required]: (opts: ErrorMessageOpts): string => {
    return opts.title ? `${opts.title} is required.` : 'This value is required';
  },
};
