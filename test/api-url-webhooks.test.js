import { fixture, assert, nextFrame, html } from '@open-wc/testing';
import '../api-url.js';

/**
 * OAS 3.1/3.2 top-level webhooks are not invokable, so `<api-url>` renders the
 * event name instead of a request URL/server. A webhook compiles to an
 * `apiContract#EndPoint` node identical to a regular endpoint; the only
 * distinction is that the WebAPI root references it via `apiContract#webhooks`
 * instead of `apiContract#endpoint`.
 *
 * The model is built inline (expanded AMF, no `@context`) so these tests do not
 * depend on the model generator — the webhook demo fixture is git-ignored.
 */
describe('<api-url> webhooks (OAS 3.1/3.2)', () => {
  const DOC = 'http://a.ml/vocabularies/document#Document';
  const ENCODES = 'http://a.ml/vocabularies/document#encodes';
  const WEBAPI = 'http://a.ml/vocabularies/apiContract#WebAPI';
  const ENDPOINT = 'http://a.ml/vocabularies/apiContract#endpoint';
  const WEBHOOKS = 'http://a.ml/vocabularies/apiContract#webhooks';
  const ENDPOINT_T = 'http://a.ml/vocabularies/apiContract#EndPoint';
  const OPERATION_T = 'http://a.ml/vocabularies/apiContract#Operation';
  const SUPPORTED_OP = 'http://a.ml/vocabularies/apiContract#supportedOperation';
  const PATH = 'http://a.ml/vocabularies/apiContract#path';
  const METHOD = 'http://a.ml/vocabularies/apiContract#method';
  const NAME = 'http://a.ml/vocabularies/core#name';

  function buildModel() {
    return {
      '@type': [DOC],
      [ENCODES]: [{
        '@id': 'amf://id#1',
        '@type': [WEBAPI],
        [ENDPOINT]: [{
          '@id': 'amf://id#10',
          '@type': [ENDPOINT_T],
          [PATH]: [{ '@value': '/pets' }],
          [SUPPORTED_OP]: [{
            '@id': 'amf://id#11',
            '@type': [OPERATION_T],
            [METHOD]: [{ '@value': 'get' }],
          }],
        }],
        [WEBHOOKS]: [{
          '@id': 'amf://id#20',
          '@type': [ENDPOINT_T],
          [PATH]: [{ '@value': 'newPet' }],
          [NAME]: [{ '@value': 'newPet' }],
          [SUPPORTED_OP]: [{
            '@id': 'amf://id#21',
            '@type': [OPERATION_T],
            [METHOD]: [{ '@value': 'post' }],
          }],
        }],
      }],
    };
  }

  function webApiOf(model) {
    const enc = model[ENCODES][0];
    return enc;
  }

  async function operationFixture({ amf, endpoint, operation }) {
    const el = await fixture(html`<api-url
      .amf="${amf}"
      .endpoint="${endpoint}"
      .operation="${operation}"
    ></api-url>`);
    await nextFrame();
    return el;
  }

  let model;
  let webhookEndpoint;
  let webhookOperation;
  let restEndpoint;
  let restOperation;

  beforeEach(() => {
    model = buildModel();
    const webApi = webApiOf(model);
    webhookEndpoint = webApi[WEBHOOKS][0];
    webhookOperation = webhookEndpoint[SUPPORTED_OP][0];
    restEndpoint = webApi[ENDPOINT][0];
    restOperation = restEndpoint[SUPPORTED_OP][0];
  });

  it('flags a webhook operation via isWebhook', async () => {
    const el = await operationFixture({ amf: model, endpoint: webhookEndpoint, operation: webhookOperation });
    assert.isTrue(el.isWebhook, 'isWebhook is true for a top-level webhook op');
  });

  it('does not flag a regular endpoint operation as a webhook', async () => {
    const el = await operationFixture({ amf: model, endpoint: restEndpoint, operation: restOperation });
    assert.isFalse(el.isWebhook, 'isWebhook is false for a REST op');
  });

  it('computes the webhook event name from the endpoint', async () => {
    const el = await operationFixture({ amf: model, endpoint: webhookEndpoint, operation: webhookOperation });
    assert.equal(el.webhookEventName, 'newPet');
  });

  it('renders the event name instead of a URL for a webhook', async () => {
    const el = await operationFixture({ amf: model, endpoint: webhookEndpoint, operation: webhookOperation });
    const label = el.shadowRoot.querySelector('.url-server-value .server-url');
    assert.ok(label, 'the labelled row is rendered');
    assert.equal(label.textContent.trim(), 'Event', 'label reads "Event", not "Server"');
    assert.include(el.shadowRoot.querySelector('.url-server-value').textContent, 'newPet', 'event name is shown');
  });

  it('does not render an endpoint path row for a webhook', async () => {
    const el = await operationFixture({ amf: model, endpoint: webhookEndpoint, operation: webhookOperation });
    assert.isNull(el.shadowRoot.querySelector('.url-channel-value'), 'no channel/path row for a webhook');
  });

  it('still renders the normal URL for a regular endpoint (no webhook suppression)', async () => {
    const el = await operationFixture({ amf: model, endpoint: restEndpoint, operation: restOperation });
    assert.isFalse(el.isWebhook);
    const label = el.shadowRoot.querySelector('.url-server-value .server-url');
    assert.isNull(label, 'no "Event" row for a REST endpoint');
  });
});
