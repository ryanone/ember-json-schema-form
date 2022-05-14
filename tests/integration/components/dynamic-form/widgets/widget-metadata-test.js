import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | dynamic-form/widgets/widget-metadata',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`{{dynamic-form/widgets/widget-metadata}}`);

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await render(hbs`
      {{#dynamic-form/widgets/widget-metadata}}
        template block text
      {{/dynamic-form/widgets/widget-metadata}}
    `);

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  }
);
