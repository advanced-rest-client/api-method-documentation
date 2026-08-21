import { AmfHelperMixin } from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import { LitElement } from 'lit-element';

export const AmfLoader = {};

class HelperElement extends AmfHelperMixin(LitElement) {}
window.customElements.define('helper-element', HelperElement);

const helper = new HelperElement();

/**
 * amf-client-js 5.11.x emits models in flattened `@graph` form
 * (`{"@graph":[...]}`), whereas 4.7 emitted a plain array (`[{...}]`). The
 * `amf` setter expands them internally (via AmfHelperMixin `_expand`), but the
 * raw `@graph` model handed to the `_compute*` helpers is not navigable —
 * `_computeApi` returns `undefined`. We expand at load time so every consumer
 * (helpers and component fixtures) receives a navigable model. Re-feeding an
 * already-expanded model to the setter is idempotent.
 * @param {any} model Raw (possibly flattened `@graph`) API model.
 * @return {any} Expanded model.
 */
const expand = (model) => {
  helper.amf = model;
  const { amf } = helper;
  return Array.isArray(amf) ? amf[0] : amf;
};

AmfLoader.load = async (fileName, compact) => {
  const compactValue = compact ? '-compact' : '';
  const file = `${fileName}${compactValue}.json`;
  const url = `${window.location.protocol}//${window.location.host}/base/demo/${file}`;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
      let data;
      try {
        data = JSON.parse(e.target.response);
        /* istanbul ignore next */
      } catch (error) {
        /* istanbul ignore next */
        reject(error);
        /* istanbul ignore next */
        return;
      }
      resolve(expand(data));
    });
    /* istanbul ignore next */
    xhr.addEventListener('error',
      () => reject(new Error('Unable to load model file')));
    xhr.open('GET', url);
    xhr.send();
  });
};

AmfLoader.lookupEndpoint = (model, endpoint) => {
  helper.amf = model;
  const webApi = helper._computeApi(model);
  return helper._computeEndpointByPath(webApi, endpoint);
};

AmfLoader.lookupOperation = (model, endpoint, operation) => {
  const endPoint = AmfLoader.lookupEndpoint(model, endpoint);
  const opKey = helper._getAmfKey(helper.ns.aml.vocabularies.apiContract.supportedOperation);
  const ops = helper._ensureArray(endPoint[opKey]);
  return ops.find((item) => helper._getValue(item, helper.ns.aml.vocabularies.apiContract.method) === operation);
};

AmfLoader.lookupPayload = (model, endpoint, operation) => {
  const op = AmfLoader.lookupOperation(model, endpoint, operation);
  const expects = helper._computeExpects(op);
  return helper._ensureArray(helper._computePayload(expects));
};

AmfLoader.lookupEndpointOperation = (model, endpoint, operation) => {
  const endPoint = AmfLoader.lookupEndpoint(model, endpoint);
  const opKey = helper._getAmfKey(helper.ns.aml.vocabularies.apiContract.supportedOperation);
  const ops = helper._ensureArray(endPoint[opKey]);
  const op = ops.find((item) => helper._getValue(item, helper.ns.aml.vocabularies.apiContract.method) === operation);
  return [endPoint, op];
};

AmfLoader.getEncodes = model => helper._computeEncodes(model)

AmfLoader.getServers = model => {
  helper.amf = model;
  return helper._getServers({});
}

AmfLoader.getParamName = model => {
  helper.amf = model;
  return helper._getValue(model, helper.ns.aml.vocabularies.apiContract.paramName);
}

AmfLoader.lookupEndpointByName = (model, name) => {
  helper.amf = model;
  const webApi = helper._computeApi(model);
  const endpointKey = helper._getAmfKey(helper.ns.aml.vocabularies.apiContract.endpoint);
  const endpoints = helper._ensureArray(webApi[endpointKey]);
  return endpoints.find(endpoint => {
    const endpointName = helper._getValue(endpoint, helper.ns.aml.vocabularies.core.name);
    return endpointName === name;
  });
}

AmfLoader.lookupOperationInEndpoint = (endpoint, methodName) => {
  const opKey = helper._getAmfKey(helper.ns.aml.vocabularies.apiContract.supportedOperation);
  const ops = helper._ensureArray(endpoint[opKey]);
  return ops.find(op => {
    const method = helper._getValue(op, helper.ns.aml.vocabularies.apiContract.method);
    return method === methodName;
  });
}

/**
 * Returns the top-level OAS 3.1/3.2 webhook endpoints from the API model.
 * @param {any} model Api model.
 * @return {any[]} Array of webhook endpoint nodes (possibly empty).
 */
AmfLoader.lookupWebhooks = (model) => {
  helper.amf = model;
  const webApi = helper._computeApi(model);
  return helper._computeWebhooks(webApi);
}

/**
 * Returns a single webhook endpoint by its event name (the OAS `webhooks:` map
 * key). AMF carries the key on the endpoint node as `core#name` and/or
 * `apiContract#path`, mirroring the component's `webhookEventName` getter
 * (name first, then path), so match on either.
 * @param {any} model Api model.
 * @param {string} name Webhook event name.
 * @return {any|undefined} The webhook endpoint node.
 */
AmfLoader.lookupWebhook = (model, name) => {
  const webhooks = AmfLoader.lookupWebhooks(model);
  return webhooks.find(webhook => {
    const eventName = helper._getValue(webhook, helper.ns.aml.vocabularies.core.name);
    const path = helper._getValue(webhook, helper.ns.aml.vocabularies.apiContract.path);
    return eventName === name || path === name;
  });
}
