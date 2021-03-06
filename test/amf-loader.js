import { AmfHelperMixin } from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import { LitElement } from 'lit-element';

export const AmfLoader = {};

class HelperElement extends AmfHelperMixin(LitElement) {}
window.customElements.define('helper-element', HelperElement);

const helper = new HelperElement();

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
      resolve(data);
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
