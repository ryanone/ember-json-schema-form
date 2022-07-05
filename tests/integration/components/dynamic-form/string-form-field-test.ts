import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | dynamic-form/string-form-field',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`{{dynamic-form/string-form-field}}`);

      assert.equal(this.element.textContent?.trim(), '');

      // Template block usage:
      await render(hbs`
      {{#dynamic-form/string-form-field}}
        template block text
      {{/dynamic-form/string-form-field}}
    `);

      assert.equal(this.element.textContent?.trim(), 'template block text');
    });
  }
);
