import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  get data() {
    return {
      description: 'My description',
      title: 'My title',
    };
  }

  name = 'foo';
}
