import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  get data() {
    return {
      firstName: 'Bob',
      lastName: 'Jones',
    };
    // return 'abcdefg';
  }

  get dataSchema(): Record<string, unknown> {
    return {
      title: 'My form',
      description: 'My description',
      // type: 'string',
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

  get elementSchema(): Record<string, unknown> {
    return {
      firstName: {
        'widget:name': 'person.firstName',
      },
      lastName: {
        'widget:name': 'person.lastName',
      },
    };
  }

  @action
  onFormSubmit(data: Record<string, unknown>) {
    console.log('onFormSubmit: %o', data);
  }
}
