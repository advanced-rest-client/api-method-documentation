/* eslint-disable class-methods-use-this */
import { html, LitElement } from 'lit-element';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin';
import markdownStyles from '@advanced-rest-client/markdown-styles/markdown-styles.js';
import httpMethodStyles from '@api-components/http-method-label/http-method-label-common-styles.js';
import styles from './Styles.js';

/**
 * `api-url`
 *
 * Renders the view for a URL given a server or a plan string URI value
 *
 * If a URI string is provided, then the URI will be prioritized over the server
 * Otherwise, the component will extract the necessary information from the server
 * object to render the corresponding URI.
 *
 * The ApiUrl component will also receive an optional endpoint and operation in order
 * to render the operation name and the endpoint path.
 *
 * For HTTP protocols:
 *  - HTTP method
 *  - Base URI
 *  - Endpoint path
 *  - Operation path
 *
 * For non-HTTP protocols:
 *  - Operation method
 *  - Protocol
 *  - URL
 *  - Operation name
 * @fires change
 */
export class ApiUrl extends AmfHelperMixin(LitElement) {
  static get properties() {
    return {
      /**
       * AMF model for Server object
       */
      server: { type: Object },
      /**
       * AMF model for Endpoint object
       */
      endpoint: { type: Object },
      /**
       * AMF model for Operation object
       */
      operation: { type: Object },
      /**
       * Optional parameter to be injected into the URL
       */
      apiVersion: { type: String },
      /**
       * Optional override of the URL. If this property is set, then that will
       * be the base URI regardless of server and endpoint
       * @attribute
       */
      baseUri: { type: String },
      /**
       * Optional, operation id that is render only for async api
       */
      operationId:{type: String},
      _url: { type: String },
      _method: { type: String },
      _protocol: { type: String },
      _protocolVersion: { type: String },
      _operation: { type: Object },
      _server: { type: Object },
      _operationId:{type: String}
    };
  }

  get styles() {
    return [markdownStyles, httpMethodStyles, styles];
  }

  get isNotHttp() {
    const { server } = this;
    if (server) {
      const key = this._getAmfKey(this.ns.aml.vocabularies.apiContract.protocol);
      const protocol = /** @type string */ (this._getValue(server, key));
      if (!protocol) {
        return false;
      }
      return protocol.toLowerCase() !== 'http' && protocol.toLowerCase() !== 'https';
    }
    return false;
  }

  get operation() {
    return this._operation;
  }

  set operation(value) {
    const old = this._operation;
    if (old === value) {
      return;
    }
    this._operation = value;
    this.requestUpdate('operation', old);
    this._updateMethod();
    this._updateUrl();
  }

  get server() {
    return this._server;
  }

  set server(value) {
    const old = this._server;
    if (old === value) {
      return;
    }
    this._server = value;
    this.requestUpdate('server', old);
    this._updateProtocol();
    this._updateProtocolVersion();
    this._updateUrl();
  }

  get servers() {
    let endpointId
    if(this.endpoint){
      endpointId = this.endpoint["@id"]
    }
    return this._getServers({ endpointId });
  }

  get endpoint() {
    return this._endpoint;
  }

  set endpoint(value) {
    const old = this._endpoint;
    if (old === value) {
      return;
    }
    this._endpoint = value;
    this.requestUpdate('endpoint', old);
    this._updateUrl();
  }

  get apiVersion() {
    return this._apiVersion;
  }

  set apiVersion(value) {
    const old = this._apiVersion;
    if (old === value) {
      return;
    }
    this._apiVersion = value;
    this.requestUpdate('apiVersion', old);
    this._updateUrl();
  }

  get path() {
    if (this.endpoint) {
      return this._getValue(this.endpoint, this._getAmfKey(this.ns.aml.vocabularies.apiContract.path));
    }
    return '';
  }

  get url() {
    return this._url || this.baseUri;
  }

  set baseUri(value) {
    const old = this._baseUri;
    if (old === value) {
      return;
    }
    this._baseUri = value;
    this.requestUpdate('baseUri', old);
    this._updateUrl();
  }

  get baseUri() {
    return this._baseUri;
  }



  get asyncServersNames(){
    const servers = this._ensureArray(this.servers)

    // try to find servers in channel level
    if(servers){
      return servers.map((item)=>(this._getValue(item, this.ns.aml.vocabularies.core.name)));  
    }

    // try to find root server (only one) that is received by property
    if(this.server){
      return [this._getValue(this.server, this.ns.aml.vocabularies.core.name)]
    }

    // in case that async api doesn't have servers
    return null      
  }

  get operationId(){
    return this._operationId
  }

  set operationId(value){
    this._operationId = value
  }

  render() {
    const { url, asyncServersNames } = this;
    const isAsyncApi = this._isAsyncAPI(this.amf)

    if(isAsyncApi && asyncServersNames){
      // only if an async api and has servers
      return this.renderAsyncApi(asyncServersNames)
    }
    return html`
      <style>${this.styles}</style>
      <section class="url-area">
        ${this._getMethodTemplate()}
        <div class="url-value">
          ${this._getPathTemplate()}
          ${this.getUrlTemplate()}
        </div>
      </section>
      <clipboard-copy id="urlCopy" .content="${url}"></clipboard-copy>
    `;
  }

  _getMethodTemplate() {
    const method = this._method;
    if (!method) {
      return html``;
    }
    
    // Check if it's gRPC and get appropriate display method and color
    const isGrpc = this._isGrpcOperation(this._operation);
    let displayMethod = method;
    let methodForColor = method.toLowerCase();
    
    if (isGrpc) {
      const streamType = this._getGrpcStreamType(this._operation);
      displayMethod = this._getGrpcStreamTypeDisplayName(streamType);
      methodForColor = this._getMethodForColor(streamType);
    }
    
    return html`<div class="method-value"><span class="method-label" data-method="${methodForColor}">${displayMethod}</span></div>`
  }

  _getPathTemplate() {
    if (this.isNotHttp && !!this._method) {
      return html`<div class="url-channel-value"><span class="channel-url">Channel</span>${this.path}</div>`;
    }
    return '';
  }

  getUrlTemplate() {
    const { url, isNotHttp, _method } = this;
    if (isNotHttp && !!_method) {
      return html`<div class="url-server-value"><span class="server-url">Server</span>${url}</div>`
    }
    return html`${url}`
  }

  _updateMethod() {
    this._method = this._computeMethod(this._operation);
    this._dispatchChangeEvent();
  }

  _updateProtocol() {
    const key = this._getAmfKey(this.ns.aml.vocabularies.apiContract.protocol);
    this._protocol = this._getValue(this._server, key);
    this._dispatchChangeEvent();
  }

  _updateProtocolVersion() {
    const key = this._getAmfKey(this.ns.aml.vocabularies.apiContract.protocolVersion);
    this._protocolVersion = this._getValue(this._server, key);
  }

  _updateUrl() {
    const { _server, baseUri, apiVersion: version, _endpoint, _protocol } = this;
    const options = { baseUri, version };
    options.server = _server;
    if (this.isNotHttp) {
      options.ignorePath = true;
    }
    if (_protocol) {
      options.protocols = [_protocol];
    }
    this._url = this._computeUri(_endpoint, options);
    this._dispatchChangeEvent();
  }

  renderAsyncApi(asyncServersNames){
    const { url } = this;
   
   return html`
      <style>${this.styles}</style>
      <section class="async-servers-names-area">
        ${this._getMethodTemplate()}
        <div class="async-servers">
          ${this._getAsyncPathTemplate()}
          ${this._getOperationIdTemplate()}
          ${this._getAsyncServersNamesTemplate(asyncServersNames)}
        </div>
      </section>
      <clipboard-copy id="urlCopy" .content="${url}"></clipboard-copy>
    `;
  }

  _getAsyncPathTemplate() {
      return html`<div class="async-servers-path url-channel-value">${this.path || ''}</div>`;    
  }

  _getOperationIdTemplate() {
    const { operationId } = this;
    if (operationId) {
      return html`<div class="async-server-names-container">
        <span class="async-server-names-title">Operation ID: ${operationId}</span></div>`
    }
    return html``
  }

  _getAsyncServersNamesTemplate(asyncServersNames) {
    if (asyncServersNames) {
      return html`<div class="async-server-names-container">
        <span class="async-server-names-title">Available on servers:</span> ${this._getAsyncServersNamesList(asyncServersNames)}</div>`
    }
    return html``
  }

  _getAsyncServersNamesList(asyncServersNames) {
      return asyncServersNames.map((name) => html`<span class="async-server-name url-value">${name}</span>`)
  }

  /**
   * Computes value for `httpMethod` property.
   *
   * @param {Object} operation AMF `supportedOperation` model
   * @return {String|undefined} HTTP method name
   */
  _computeMethod(operation) {
    const methodKey = this.ns.aml.vocabularies.apiContract.method;
    let name = /** @type string */ (this._getValue(operation, methodKey));
    if (name) {
      name = name.toUpperCase();
    }
    return name;
  }

  async _dispatchChangeEvent() {
    await this.updateComplete
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          url: this._url,
          protocol: this._protocol,
          method: this._method
        }
      })
    );
  }

  // ========== gRPC Support Methods ==========

  /**
   * Checks if the given operation is a gRPC operation
   * @param {Object} operation Operation model
   * @return {boolean}
   */
  _isGrpcOperation(operation) {
    if (!operation) {
      return false;
    }
    
    // Check for gRPC-specific methods
    const method = this._getValue(operation, this.ns.aml.vocabularies.apiContract.method);
    if (method && typeof method === 'string' && ['publish', 'subscribe', 'pubsub'].includes(method.toLowerCase())) {
      return true;
    }
    
    // Check for gRPC media type in request
    const expects = this._computeExpects(operation);
    if (expects) {
      const payloadKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.payload);
      const payloads = this._ensureArray(expects[payloadKey]);
      
      if (payloads && payloads.length > 0) {
        const mediaType = this._getValue(payloads[0], this.ns.aml.vocabularies.core.mediaType);
        if (mediaType && typeof mediaType === 'string' && 
            (mediaType === 'application/grpc' || mediaType === 'application/grpc+proto')) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Gets the gRPC stream type for an operation
   * @param {Object} operation Operation model
   * @return {string} Stream type: 'unary', 'client_streaming', 'server_streaming', or 'bidi_streaming'
   */
  _getGrpcStreamType(operation) {
    if (!operation) {
      return 'unary';
    }
    
    const method = this._getValue(operation, this.ns.aml.vocabularies.apiContract.method);
    
    if (!method || typeof method !== 'string') {
      return 'unary';
    }
    
    // Map methods to gRPC stream types
    const methodLower = method.toLowerCase();
    switch (methodLower) {
      case 'publish':
        return 'client_streaming';
      case 'subscribe':
        return 'server_streaming';
      case 'pubsub':
        return 'bidi_streaming';
      case 'post':
      case 'get':
      default:
        return 'unary';
    }
  }

  /**
   * Gets the display name for a gRPC stream type
   * @param {string} streamType Stream type
   * @return {string} Display name
   */
  _getGrpcStreamTypeDisplayName(streamType) {
    const displayNames = {
      'unary': 'Unary',
      'client_streaming': 'Client',
      'server_streaming': 'Server',
      'bidi_streaming': 'Bidirectional'
    };
    
    return displayNames[streamType] || streamType;
  }

  /**
   * Gets the HTTP method name to use for color styling based on gRPC stream type
   * @param {string} streamType gRPC stream type
   * @return {string} HTTP method name for color styling
   */
  _getMethodForColor(streamType) {
    // Map stream type to HTTP method for consistent colors
    // patch = purple, publish = green, subscribe = blue, options = gray
    const colorMethodMap = {
      'unary': 'patch',              // Purple: rgb(156, 39, 176)
      'client_streaming': 'publish',  // Green: #1f9d55
      'server_streaming': 'subscribe', // Blue: #3490dc
      'bidi_streaming': 'options'     // Gray (default/neutral color)
    };
    
    return colorMethodMap[streamType] || 'patch';
  }
}
