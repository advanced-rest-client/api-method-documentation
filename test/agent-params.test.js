import { fixture, assert, html, aTimeout } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import '../api-method-documentation.js';

describe('agent-api', function() {
  async function modelFixture(amf, endpoint, method) {
    return (await fixture(html`<api-method-documentation
      .amf="${amf}"
      .endpoint="${endpoint}"
      .method="${method}"></api-method-documentation>`));
  }

  const apiFile = 'agents-api';

  [
    ['Compact model V1', true],
    ['Regular model V1', false]
  ].forEach(([label, compact]) => {
    describe(label, () => {
      let amf;
      let element;
      before(async () => {
        amf = await AmfLoader.load(apiFile, compact);
      });

      it('isUserInput is true', async () => {
        const endpopint = AmfLoader.lookupEndpoint(amf, '/reservations/reservationlookup');
        const method = AmfLoader.lookupOperation(amf, '/reservations/reservationlookup', 'get');
        element = await modelFixture(amf, endpopint, method);
        await aTimeout();
        assert.equal(element.agentParameters.isUserInput, 'true');
      });

      it('renders the summary', async () => {
        const endpopint = AmfLoader.lookupEndpoint(amf, '/reservations/reservationlookup');
        const method = AmfLoader.lookupOperation(amf, '/reservations/reservationlookup', 'get');
        element = await modelFixture(amf, endpopint, method);
        await aTimeout();
        const node = element.shadowRoot.querySelector('.summary');
        assert.ok(node);
      });
    });
  });
});
