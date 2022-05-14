import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | dynamic-form/widgets/text-widget',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`{{dynamic-form/widgets/text-widget}}`);

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await render(hbs`
      {{#dynamic-form/widgets/text-widget}}
        template block text
      {{/dynamic-form/widgets/text-widget}}
    `);

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  }
);
