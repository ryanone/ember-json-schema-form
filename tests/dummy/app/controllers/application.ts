import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  get data() {
    // return {
    //   description: 'My description',
    //   title: 'My title',
    // };
    return 'abcdefg';
  }

  get dataSchema(): Record<string, unknown> {
    return {
      title: 'My form',
      description: 'My description',
      type: 'string',
    };
  }
}
