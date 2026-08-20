import { fixture, assert, nextFrame, html } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import '../api-url.js';

/**
 * OAS 3.1/3.2 top-level webhooks are not invokable, so `<api-url>` renders the
 * event name instead of a request URL/server. A webhook compiles to an
 * `apiContract#EndPoint` node identical to a regular endpoint; the only
 * distinction is that the WebAPI root references it via `apiContract#webhooks`
 * instead of `apiContract#endpoint`.
 *
 * These tests drive the REAL generated model (`demo/oas31-webhooks`, from
 * `demo/oas31-webhooks/oas31-webhooks.yaml`) rather than hand-built AMF, so a
 * generator/mixin change to the `apiContract#webhooks` predicate fails here
 * instead of silently passing an inline fixture. The demo model is a git-ignored
 * `prepare` artifact — regenerate it with `npm run prepare`.
 */
describe('<api-url> webhooks (OAS 3.1/3.2)', () => {
  async function operationFixture({ amf, endpoint, operation }) {
    const el = await fixture(html`<api-url
      .amf="${amf}"
      .endpoint="${endpoint}"
      .operation="${operation}"
    ></api-url>`);
    await nextFrame();
    return el;
  }

  [true, false].forEach((compact) => {
    describe(`${compact ? 'compact' : 'full'} model`, () => {
      let amf;
      let webhookEndpoint;
      let webhookOperation;
      let restEndpoint;
      let restOperation;

      before(async () => {
        amf = await AmfLoader.load('oas31-webhooks', compact);
      });

      beforeEach(() => {
        webhookEndpoint = AmfLoader.lookupWebhook(amf, 'newPet');
        webhookOperation = AmfLoader.lookupOperationInEndpoint(webhookEndpoint, 'post');
        restEndpoint = AmfLoader.lookupEndpoint(amf, '/pets');
        restOperation = AmfLoader.lookupOperationInEndpoint(restEndpoint, 'get');
      });

      it('resolves the webhook from the generated model', () => {
        assert.ok(webhookEndpoint, 'the newPet webhook endpoint is resolved');
        assert.ok(webhookOperation, 'the webhook post operation is resolved');
        assert.ok(restEndpoint, 'the /pets endpoint is resolved');
        assert.ok(restOperation, 'the /pets get operation is resolved');
      });

      it('flags a webhook operation via isWebhook', async () => {
        const el = await operationFixture({ amf, endpoint: webhookEndpoint, operation: webhookOperation });
        assert.isTrue(el.isWebhook, 'isWebhook is true for a top-level webhook op');
      });

      it('does not flag a regular endpoint operation as a webhook', async () => {
        const el = await operationFixture({ amf, endpoint: restEndpoint, operation: restOperation });
        assert.isFalse(el.isWebhook, 'isWebhook is false for a REST op');
      });

      it('computes the webhook event name from the endpoint', async () => {
        const el = await operationFixture({ amf, endpoint: webhookEndpoint, operation: webhookOperation });
        assert.equal(el.webhookEventName, 'newPet');
      });

      it('renders the event name instead of a URL for a webhook', async () => {
        const el = await operationFixture({ amf, endpoint: webhookEndpoint, operation: webhookOperation });
        const label = el.shadowRoot.querySelector('.url-server-value .server-url');
        assert.ok(label, 'the labelled row is rendered');
        assert.equal(label.textContent.trim(), 'Event', 'label reads "Event", not "Server"');
        assert.include(el.shadowRoot.querySelector('.url-server-value').textContent, 'newPet', 'event name is shown');
      });

      it('does not render an endpoint path row for a webhook', async () => {
        const el = await operationFixture({ amf, endpoint: webhookEndpoint, operation: webhookOperation });
        assert.isNull(el.shadowRoot.querySelector('.url-channel-value'), 'no channel/path row for a webhook');
      });

      it('still renders the normal URL for a regular endpoint (no webhook suppression)', async () => {
        const el = await operationFixture({ amf, endpoint: restEndpoint, operation: restOperation });
        assert.isFalse(el.isWebhook);
        const label = el.shadowRoot.querySelector('.url-server-value .server-url');
        assert.isNull(label, 'no "Event" row for a REST endpoint');
      });
    });
  });
});
