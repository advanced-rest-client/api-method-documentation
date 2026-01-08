import { fixture, assert, html, aTimeout } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import '../api-method-documentation.js';

describe('gRPC API rendering', function() {
  async function modelFixture(amf, endpoint, method) {
    return (await fixture(html`<api-method-documentation
      .amf="${amf}"
      .endpoint="${endpoint}"
      .method="${method}"></api-method-documentation>`));
  }

  const apiFile = 'grpc-test';

  // Helper to find gRPC endpoint by name instead of path
  function lookupEndpointByName(model, name) {
    const webApi = AmfLoader.getEncodes(model);
    const endpoints = webApi['http://a.ml/vocabularies/apiContract#endpoint'];
    if (!endpoints) {
      return null;
    }
    const endpointArray = Array.isArray(endpoints) ? endpoints : [endpoints];
    return endpointArray.find(endpoint => {
      const names = endpoint['http://a.ml/vocabularies/core#name'];
      if (!names) {
        return false;
      }
      const nameArray = Array.isArray(names) ? names : [names];
      return nameArray.some(n => n['@value'] === name);
    });
  }

  // Helper to find operation within an endpoint
  function lookupOperationInEndpoint(endpoint, methodName) {
    const operations = endpoint['http://a.ml/vocabularies/apiContract#supportedOperation'];
    if (!operations) {
      return null;
    }
    const opsArray = Array.isArray(operations) ? operations : [operations];
    return opsArray.find(op => {
      const methods = op['http://a.ml/vocabularies/apiContract#method'];
      if (!methods) {
        return false;
      }
      const methodArray = Array.isArray(methods) ? methods : [methods];
      return methodArray.some(m => m['@value'] === methodName);
    });
  }

  [
    ['Compact model', false],
    ['Regular model', true]
  ].forEach(([label, compact]) => {
    describe(label, () => {
      let amf;
      let element;
      before(async () => {
        amf = await AmfLoader.load(apiFile, compact);
      });

      it('renders method title with "Method name:" prefix for gRPC', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'post');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const titleNode = element.shadowRoot.querySelector('.heading2');
        assert.ok(titleNode, 'title node is rendered');
        assert.include(titleNode.textContent, 'Method name:', 'title includes "Method name:" prefix');
        assert.include(titleNode.textContent, 'SayHello1', 'title includes method name');
      });

      it('uses heading2 class for gRPC method title', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'post');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const titleNode = element.shadowRoot.querySelector('.heading2');
        assert.ok(titleNode, 'heading2 class is used for gRPC');
        const oldTitleNode = element.shadowRoot.querySelector('.title');
        assert.notOk(oldTitleNode, 'title class is not used for gRPC');
      });

      it('hides operation ID for gRPC', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'post');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const operationIdNode = element.shadowRoot.querySelector('.operation-id');
        assert.notOk(operationIdNode, 'operation ID is hidden for gRPC');
      });

      it('hides code snippets for gRPC', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'post');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const snippetsNode = element.shadowRoot.querySelector('http-code-snippets');
        assert.notOk(snippetsNode, 'code snippets are hidden for gRPC');
      });

      it('renders api-url component for gRPC', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'post');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const urlNode = element.shadowRoot.querySelector('api-url');
        assert.ok(urlNode, 'api-url component is rendered');
      });

      it('detects gRPC operation correctly (post method)', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'post');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const isGrpc = element._isGrpcOperation(element.method);
        assert.isTrue(isGrpc, 'post method is detected as gRPC');
      });

      it('detects gRPC operation correctly (publish method)', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'publish');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const isGrpc = element._isGrpcOperation(element.method);
        assert.isTrue(isGrpc, 'publish method is detected as gRPC');
      });

      it('detects gRPC operation correctly (subscribe method)', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'subscribe');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const isGrpc = element._isGrpcOperation(element.method);
        assert.isTrue(isGrpc, 'subscribe method is detected as gRPC');
      });

      it('detects gRPC operation correctly (pubsub method)', async () => {
        const endpoint = lookupEndpointByName(amf, 'Greeter');
        const method = lookupOperationInEndpoint(endpoint, 'pubsub');
        element = await modelFixture(amf, endpoint, method);
        await aTimeout();
        const isGrpc = element._isGrpcOperation(element.method);
        assert.isTrue(isGrpc, 'pubsub method is detected as gRPC');
      });
    });
  });
});

