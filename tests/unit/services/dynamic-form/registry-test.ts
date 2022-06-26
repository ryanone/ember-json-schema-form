import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | dynamic-form/registry', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup('service:dynamic-form/registry');
    assert.ok(service);
  });
});
