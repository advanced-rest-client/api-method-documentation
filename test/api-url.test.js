import { fixture, assert, nextFrame, html, waitUntil } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import '../api-url.js';

describe('<api-url>', () => {
  async function basicFixture() {
	return fixture(`<api-url></api-url>`);
  }

  async function operationFixture({ amf, endpoint, operation, server }) {
	return fixture(html`<api-url
      .amf="${amf}"
      .endpoint="${endpoint}"
      .operation="${operation}"
      .server="${server}"
    >
    </api-url>`);
  }

  describe('Basic tests', () => {
	it('should render baseUri if set', async () => {
	  const element = await basicFixture();
	  element.baseUri = 'http://example.org';
	  await nextFrame();
	  assert.equal(element.url, 'http://example.org');
	  assert.equal(element.shadowRoot.querySelector('.url-value').textContent.trim(), 'http://example.org');
	});
  });

  [
	['Compact model', true],
	['Full model', false]
  ].forEach(([label, compact]) => {
	describe(label, () => {
	  const demoApi = 'demo-api';
	  const asyncApi = 'async-api';

	  describe('Basic AMF computations', () => {
		let amf;
		let element;
		let server;

		before(async () => {
		  amf = await AmfLoader.load(demoApi, compact);
		});

		beforeEach(async () => {
		  const [endpoint, operation] = AmfLoader.lookupEndpointOperation(amf, '/people', 'get');
		  element = await basicFixture();
		  element.amf = amf;
		  server = AmfLoader.getEncodes(amf)[element._getAmfKey(element.ns.aml.vocabularies.apiContract.server)];
		  if (Array.isArray(server)) {
			[server] = server;
		  }
		  element = await operationFixture({ amf, endpoint, operation, server });
		  // model change debouncer
		  await nextFrame();
		});

		it('should compute path', () => {
		  assert.equal(element.path, '/people');
		});

		it('should compute url', () => {
		  assert.equal(element.url, 'http://{instance}.domain.com/{version}/people');
		});

		it('should compute method', () => {
		  assert.equal(element._method, 'GET');
		});

		it('should render method', () => {
		  assert.exists(element.shadowRoot.querySelector('.method-value'));
		});

		it('should not render method if method is not present', async () => {
		  element.operation = null;
		  await nextFrame();
		  assert.notExists(element.shadowRoot.querySelector('.method-value'));
		});

		it('should recompute url and keep endpoint path after baseUri change', () => {
		  element.baseUri = 'http://example.com';
		  assert.equal(element.url, 'http://example.com/people');
		});
	  });

	  describe('AsyncAPI', () => {
		let amf;
		let element;
		let server;

		before(async () => {
		  amf = await AmfLoader.load(asyncApi, compact);
		});

		beforeEach(async () => {
		  const [endpoint, operation] = AmfLoader.lookupEndpointOperation(amf, 'hello', 'publish');
		  element = await basicFixture();
		  element.amf = amf;
		  server = AmfLoader.getEncodes(amf)[element._getAmfKey(element.ns.aml.vocabularies.apiContract.server)];
		  if (Array.isArray(server)) {
			[server] = server;
		  }
		  element = await operationFixture({ amf, endpoint, operation, server });
		  // model change debouncer
		  await nextFrame();
		});

		it('should compute path', () => {
		  assert.equal(element.path, 'hello');
		});

		it('should compute url without path', () => {
		  assert.equal(element.url, 'amqp://broker.mycompany.com');
		});

		it('should compute server names', () => {
		  assert.equal(element.asyncServersNames[0], 'production');
		});

		it('should compute method', () => {
		  assert.equal(element._method, 'PUBLISH');
		});

		it('should render PUBLISH as the displayed method label', async () => {
		  await waitUntil(() => element.shadowRoot.querySelector('.method-label'));
		  const label = element.shadowRoot.querySelector('.method-label');
		  assert.equal(label.textContent.trim(), 'PUBLISH');
		});
	  });

		describe('APIC-560', () => {
			let amf;
			let element;
			let server;

			before(async () => {
				amf = await AmfLoader.load('APIC-560', compact);
			});

			beforeEach(async () => {
				const endpointName = 'smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured'
				const [endpoint, operation] = AmfLoader.lookupEndpointOperation(amf, endpointName, 'subscribe');
				element = await basicFixture();
				element.amf = amf;
				server = AmfLoader.getEncodes(amf)[element._getAmfKey(element.ns.aml.vocabularies.apiContract.server)];
				if (Array.isArray(server)) {
					[server] = server;
				}
				element = await operationFixture({ amf, endpoint, operation, server });
				// model change debouncer
				await nextFrame();
			});

			it('should render channel', async () => {
				const channel = 'smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured'
				await waitUntil(() => element.shadowRoot.querySelector('.async-servers-path'));
				assert.equal(element.shadowRoot.querySelector('.async-servers-path').textContent, channel);
			});

			it('should render server', async () => {
				const expectedServer = 'production'
				await waitUntil(() => element.shadowRoot.querySelector('.async-server-name'));
				assert.equal(element.shadowRoot.querySelector('.async-server-name').textContent, expectedServer);
			});

			it('should render SUBSCRIBE as the displayed method label', async () => {
				await waitUntil(() => element.shadowRoot.querySelector('.method-label'));
				const label = element.shadowRoot.querySelector('.method-label');
				assert.equal(label.textContent.trim(), 'SUBSCRIBE');
			});

			it('should only render url value when no operation selected', async () => {
				element.amf = amf
				element.operation = undefined
				element.endpoint = undefined
				await nextFrame();
				await nextFrame();

				const expectedServer = 'production'
				assert.equal(element.shadowRoot.querySelector('.url-value').textContent.trim(), expectedServer);
			});
		});
	});
  });

  describe('QUERY method (from a real generated OAS 3.2 model)', () => {
	// OAS 3.2 adds the QUERY HTTP method. amf-client-js 5.11 PARSES `query:` from
	// an OAS 3.2 pathItem and emits its method as "QUERY" (upper case), so the
	// QUERY label is driven from a real generated model —
	// demo/oas32-query/oas32-query.yaml — not hand-built AMF. `_computeMethod`
	// keeps the raw upper-case value for display and the color hook is
	// lower-cased to `data-method="query"`.
	let amf;
	let element;

	before(async () => {
	  amf = await AmfLoader.load('oas32-query', true);
	});

	beforeEach(async () => {
	  const [endpoint, operation] = AmfLoader.lookupEndpointOperation(amf, '/pets', 'QUERY');
	  element = await operationFixture({ amf, endpoint, operation });
	  await nextFrame();
	});

	it('computes the method in upper case', () => {
	  assert.equal(element._method, 'QUERY');
	});

	it('renders the method label with the lower-cased color hook', () => {
	  const label = element.shadowRoot.querySelector('.method-label');
	  assert.exists(label, 'the method label is rendered');
	  assert.equal(label.getAttribute('data-method'), 'query', 'color hook is lower-cased');
	});

	it('displays the method name in upper case', () => {
	  const label = element.shadowRoot.querySelector('.method-label');
	  assert.equal(label.textContent.trim(), 'QUERY');
	});
  });

  ['COPY', 'MOVE'].forEach((verb) => {
	describe(`${verb} method (OAS 3.2)`, () => {
	  // OAS 3.2 also adds the COPY and MOVE HTTP methods. Same casing contract
	  // as QUERY: displayed upper case, color hook lower-cased. Inline expanded
	  // operation keeps this independent of the model generator.
	  const METHOD = 'http://a.ml/vocabularies/apiContract#method';
	  const OPERATION_T = 'http://a.ml/vocabularies/apiContract#Operation';

	  let element;

	  beforeEach(async () => {
		element = await operationFixture({
		  operation: {
			'@id': 'amf://id#12',
			'@type': [OPERATION_T],
			[METHOD]: [{ '@value': verb }],
		  },
		});
		await nextFrame();
	  });

	  it('computes the method in upper case', () => {
		assert.equal(element._method, verb);
	  });

	  it('renders the method label with the lower-cased color hook', () => {
		const label = element.shadowRoot.querySelector('.method-label');
		assert.exists(label, 'the method label is rendered');
		assert.equal(
		  label.getAttribute('data-method'),
		  verb.toLowerCase(),
		  'color hook is lower-cased'
		);
	  });

	  it('displays the method name in upper case', () => {
		const label = element.shadowRoot.querySelector('.method-label');
		assert.equal(label.textContent.trim(), verb);
	  });
	});
  });
});
