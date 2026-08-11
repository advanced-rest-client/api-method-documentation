import { assert, fixture, html, aTimeout } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import '../api-method-documentation.js';

describe('AsyncAPI 3.0 operation rendering (method documentation)', () => {
  let amf;
  before(async () => {
    amf = await AmfLoader.load('async30', false); // (fileName, compact)
  });

  function findSendEndpointAndOp() {
    const endpoint = amf['@graph'].find((n) =>
      n['@type']?.includes('http://a.ml/vocabularies/apiContract#EndPoint') &&
      n['http://a.ml/vocabularies/apiContract#supportedOperation']);
    const opRef = endpoint['http://a.ml/vocabularies/apiContract#supportedOperation'][0];
    const op = amf['@graph'].find((n) => n['@id'] === opRef['@id']) || opRef;
    return { endpoint, op };
  }

  async function load() {
    const { endpoint, op } = findSendEndpointAndOp();
    const element = await fixture(html`<api-method-documentation
      .amf="${amf}" .endpoint="${endpoint}" .method="${op}"></api-method-documentation>`);
    await aTimeout(100);
    return element;
  }

  it('labels the async op SEND and colors it publish', async () => {
    const element = await load();
    // The badge is rendered by the nested api-url element, inside its own shadow root.
    const apiUrl = element.shadowRoot.querySelector('api-url');
    const badge = apiUrl && apiUrl.shadowRoot.querySelector('.method-label');
    assert.exists(badge, 'no method badge found in nested api-url shadow root');
    assert.equal(badge.textContent.trim().toLowerCase(), 'send');
    assert.equal(badge.getAttribute('data-method'), 'publish');
  });

  it('discovers and renders the message payload', async () => {
    const element = await load();
    // message getter → send branch → operationMessages Message[] → payload
    assert.isOk(element.message, 'no message discovered for send op');
    assert.isOk(element.payload, 'no payload computed from the async message');
  });
});
