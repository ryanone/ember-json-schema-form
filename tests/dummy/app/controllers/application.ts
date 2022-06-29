import Controller from '@ember/controller';
// import { inject as service } from '@ember/service';
// import FooBarBarService from 'ember-dynamic-form/services/foo-bar-bar';
// import RegistryService from 'ember-dynamic-form/services/dynamic-form/registry';

export default class ApplicationController extends Controller {
  // @service('foo-bar-bar')
  // declare fooBarBar: FooBarBarService;

  // @service('dynamic-form/registry')
  // declare registry: RegistryService;

  get data() {
    return {
      description: 'My description',
      title: 'My title',
    };
  }

  get dataSchema(): Record<string, unknown> {
    return {
      title: 'My form',
      description: 'My description',
      type: 'string',
    };
  }

  name;

  constructor() {
    super();
    // this.name = this.fooBarBar;
    this.name = 'foo';
  }
}
