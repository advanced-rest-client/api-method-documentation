/* eslint-disable class-methods-use-this */
/* eslint-disable lit-a11y/click-events-have-key-events */
import { html, LitElement } from 'lit-element';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin';
import markdownStyles from '@advanced-rest-client/markdown-styles/markdown-styles.js';
import '@advanced-rest-client/arc-icons/arc-icon.js';
import '@api-components/api-annotation-document/api-annotation-document.js';
import '@api-components/api-body-document/api-body-document.js';
import '@api-components/api-parameters-document/api-parameters-document.js';
import '@api-components/api-headers-document/api-headers-document.js';
import '@api-components/api-responses-document/api-responses-document.js';
import '@advanced-rest-client/arc-marked/arc-marked.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import "@anypoint-web-components/anypoint-dropdown/anypoint-dropdown.js";
import "@anypoint-web-components/anypoint-listbox/anypoint-listbox.js";
import "@anypoint-web-components/anypoint-item/anypoint-item.js";
import '@advanced-rest-client/http-code-snippets/http-code-snippets.js';
import '@advanced-rest-client/clipboard-copy/clipboard-copy.js';
import '@anypoint-web-components/anypoint-collapse/anypoint-collapse.js';
import '@api-components/api-security-documentation/api-security-documentation.js';
import '../api-url.js'
import { ExampleGenerator } from '@api-components/api-example-generator';
import styles from './Styles.js';

/**
 * `api-method-documentation`
 *
 * Renders documentation for a method for an endpoint.
 *
 * This element works with [AMF](https://github.com/mulesoft/amf) data model.
 * To properly compute all the information relevant to method documentation
 * set the following properties:
 *
 * - amf - as AMF's WebApi data model
 * - endpoint - As AMF's EndPoint data model
 * - method - As AMF's SupportedOperation property
 *
 * When set, this will automatically populate the view with data.
 */
export class ApiMethodDocumentation extends AmfHelperMixin(LitElement) {
  get styles() {
    return [
      markdownStyles,
      styles,
    ];
  }


  static get properties() {
    return {
      /**
       * AMF method definition as a `http://www.w3.org/ns/hydra/core#supportedOperation`
       * object.
       */
      method: { type: Object },
      /**
       * Method's endpoint definition as a
       * `http://raml.org/vocabularies/http#endpoint` of AMF model.
       */
      endpoint: { type: Object },
      /**
       * The try it button is not rendered when set.
       */
      noTryIt: { type: Boolean },
      /**
       * Computed value from the method model, name of the method.
       * It is either a `displayName` or HTTP method name
       */
      methodName: { type: String },
      /**
       * HTTP method name string.
       *
       * It is computed from `endpoint`.
       */
      httpMethod: { type: String },
      /**
       * A property to set to override AMF's model base URI information.
       * When this property is set, the `endpointUri` property is recalculated.
       */
      baseUri: { type: String },
      /**
       * Computed value, API version name
       */
      apiVersion: { type: String },
      /**
       * Endpoint URI to display in main URL field.
       * This value is computed when `amf`, `endpoint` or `baseUri` change.
       */
      endpointUri: { type: String },
      /**
       * Computed value of method description from `method` property.
       */
      description: { type: String },
      /**
       * Computed value from current `method`. True if the model contains
       * custom properties (annotations in RAML).
       */
      hasCustomProperties: { type: Boolean },
      /**
       * Computed value of `http://www.w3.org/ns/hydra/core#expects`
       * of AMF model from current `method`
       */
      expects: { type: Object },
      /**
       * Computed value of the `http://raml.org/vocabularies/http#server`
       * from `amf`
       */
      server: { type: Object },
      /**
       * API base URI parameters defined in AMF api model
       */
      serverVariables: { type: Array },
      /**
       * Endpoint's path parameters.
       */
      endpointVariables: { type: Array },
      /**
       * Computed value if server and endpoint definition of API model has
       * defined any variables.
       */
      hasPathParameters: { type: Boolean },
      /**
       * Computed value of method's query parameters.
       */
      queryParameters: { type: Array },
      /**
       * Computed value, true when either has path or query parameters.
       * This renders `api-parameters-document` if true.
       */
      hasParameters: { type: Boolean },
      /**
       * Computed value of AMF payload definition from `expects`
       * property.
       */
      payload: { type: Array },
      /**
       * Computed value of AMF payload definition from `expects`
       * property.
       */
      headers: { type: Array },
      /**
       * Computed value of AMF response definition from `returns`
       * property.
       */
      returns: { type: Array },
      /**
       * Computed value of AMF security definition from `method`
       * property.
       */
      security: { type: Array },
      /**
       * If set it will renders the view in the narrow layout.
       */
      narrow: { type: Boolean, reflect: true },
      /**
       * Model to generate a link to previous HTTP method.
       * It should contain `id` and `label` properties
       */
      previous: { type: Object },
      /**
       * Model to generate a link to next HTTP method.
       * It should contain `id` and `label` properties
       */
      next: { type: Object },
      /**
       * When set code snippets are rendered.
       */
      _snippetsOpened: { type: Boolean },
      /**
       * When set security details are rendered.
       */
      securityOpened: { type: Boolean },
      /**
       * Whether or not the callbacks toggle is opened.
       */
      callbacksOpened: { type: Boolean },
      /**
       * When set it renders code examples section is the documentation
       */
      renderCodeSnippets: { type: Boolean },

      /**
       * When set it renders security documentation when applicable
       */
      renderSecurity: { type: Boolean },
      /**
       * List of traits and resource types, if any.
       */
      extendsTypes: { type: Array },
      /**
       * List of traits applied to this endpoint
       */
      traits: { type: Array },
      /**
       * Enables compatibility with Anypoint components.
       */
      compatibility: { type: Boolean },
      /**
       * When enabled it renders external types as links and dispatches
       * `api-navigation-selection-changed` when clicked.
       */
      graph: { type: Boolean },
      /**
       * OAS summary field.
       */
      methodSummary: { type: String },

      _renderSnippets: { type: Boolean },
      /**
       * When set it hides bottom navigation links
       */
      noNavigation: { type: Boolean },
      /**
       * When set the base URI won't be rendered for this method.
       */
      ignoreBaseUri: { type: Boolean },
      /**
       * Optional protocol for the current method
       */
      protocol: { type: String },
        /**
       * Determines if the method is deprecated
       */
        deprecated: { type: Boolean, reflect: true },
        /**
         *
         */
       selectedMessage: { type: Object },
      /**
      * Bindings for the type document.
      * This is a map of the type name to the binding name.
      */
      bindings: {type: Array},
      /**
       * Adds a servers to async API
       *
       * @param {string} url - The URL of the server.
       * @param {object} [description] - An object containing a string `description` property.
       */
      servers: {type:Array},
      _servers: {type:Array},
    };
  }

  get method() {
    return this._method;
  }

  set method(value) {
    const old = this._method;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._method = value;
    this._methodChanged();
  }

  get endpoint() {
    return this._endpoint;
  }

  set endpoint(value) {
    const old = this._endpoint;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._endpoint = value;
    this._endpointChanged();
  }

  get bindings() {
    return this._bindings;
  }

  set bindings(value) {
    const old = this._bindings;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._bindings = value;
  }

  get baseUri() {
    return this._baseUri;
  }

  set baseUri(value) {
    const old = this._baseUri;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._baseUri = value;
    this.requestUpdate('baseUri', old);
    this._processServerInfo();
  }

  get ignoreBaseUri() {
    return this._ignoreBaseUri;
  }

  set ignoreBaseUri(value) {
    const old = this._ignoreBaseUri;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._ignoreBaseUri = value;
    this._processServerInfo();
  }

  get expects() {
    return this._expects;
  }

  set expects(value) {
    const old = this._expects;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._expects = value;
    this._expectsChanged(value);
    this.requestUpdate('expects', old);
  }

  get server() {
    return this._server;
  }

  set server(value) {
    const old = this._server;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._server = value;
    this.requestUpdate('server', old);
    this._processServerInfo();
  }

  get servers() {
    return this._servers;
  }

  set servers(value) {
   
    const old = this._servers;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._servers = value;
    this.requestUpdate('servers', old);
  }

  get _titleHidden() {
    if (!this.noTryIt) {
      return false;
    }
    const { methodName, httpMethod } = this;
    if (!methodName || !httpMethod) {
      return true;
    }
    return methodName.toLowerCase() === httpMethod.toLowerCase();
  }

  get snippetsUri() {
    return this.endpointUri + this._computeMethodParametersUri(this.method);
  }

  get message() {
    return this._getMessageForMethod(this.methodName);
  }

  constructor() {
    super();
    this.callbacksOpened = false;
    this.noTryIt = false;
    this.narrow = false;
    this.graph = false;
    this.noNavigation = false;
    this.compatibility = false;
    this.renderSecurity = false;
    this.renderCodeSnippets = false;
    this.deprecated = false;
    this.selectedMessage = null;

    this.previous = undefined;
    this.next = undefined;
  }

  __amfChanged() {
    if (this.__amfProcessingDebouncer) {
      return;
    }
    this.__amfProcessingDebouncer = true;
    setTimeout(() => this._processModelChange());
  }

  _methodChanged() {
    if (this.__methodProcessingDebouncer) {
      return;
    }
    this.__methodProcessingDebouncer = true;
    setTimeout(() => this._processMethodChange());
  }

  _endpointChanged() {
    if (this.__endpointProcessingDebouncer) {
      return;
    }
    this.__endpointProcessingDebouncer = true;
    setTimeout(() => this._processEndpointChange());
  }

  _processModelChange() {
    this.__amfProcessingDebouncer = false;
    const { amf } = this;
    this.apiVersion = this._computeApiVersion(amf);
    this.server = this._computeServer(amf);
    this._processServerInfo();
  }

  get asyncSecurityServers(){
    if(!this.endpoint){
      return []
    }
    const endpoint = Array.isArray(this.endpoint) ? this.endpoint[0]: this.endpoint
    const apiContractServerKey = this._getAmfKey( this.ns.aml.vocabularies.apiContract.server)
    const endpointServers = this._ensureArray(endpoint[apiContractServerKey])
    const apiSecurityKey = this._getAmfKey( this.ns.aml.vocabularies.security.security)
    
    // try to find servers in channel level
    if(endpointServers){
      return endpointServers.map((server)=>server[apiSecurityKey] || null).filter(elem=>elem!==null).flat();  
    }

    // try to find root server (only one) that is received by property
    if(this.server){
      return this._ensureArray(this.server[apiSecurityKey]) || []
    }

    // in case that async api doesn't have servers
    return []      
  }

  /**
   * Filters the methodSecurity array to remove elements that have the same '@id' as the elements in the serversSecurity array.
   * 
   * @param {object[]} methodSecurity - The array of method security objects.
   * @param {object[]} serversSecurity - The array of server security objects.
   * @returns {object[]} The filtered methodSecurity array with unique elements based on the '@id' key.
   */
  _computeAsyncSecurityMethod(methodSecurity,serversSecurity){
    if(!Array.isArray(methodSecurity) || !Array.isArray(serversSecurity)){
      return []
    }
    return methodSecurity.filter(method => !serversSecurity.some(server=>server['@id']===method['@id']));
  }

  _processMethodChange() {
    this.__methodProcessingDebouncer = false;
    const { method } = this;
    this.methodName = this._computeMethodName(method);
    this.description = this._computeDescription(method);
    this.hasCustomProperties = this._computeHasCustomProperties(method);
    this.expects = this._computeExpects(method);
    this.returns = this._computeReturns(method);
    
    if (this._isAsyncAPI(this.amf)) {
      this._overwriteExpects();
      this._computeAsyncApiSecurity()
    }else{
      this.security = this._computeSecurity(method) || this._computeSecurity(this.server);
    }
    
    const extendsTypes = this._computeExtends(method);
    this.extendsTypes = extendsTypes;
    this.traits = this._computeTraits(extendsTypes);
    this.methodSummary = this._getValue(method, this.ns.aml.vocabularies.apiContract.guiSummary);
    this.operationId = this._getValue(method, this.ns.aml.vocabularies.apiContract.operationId);
    this.callbacks = this._computeCallbacks(method);
    this.deprecated = this._computeIsDeprecated(method);
  }

  _computeAsyncApiSecurity(){
      const { method } = this;
      // find security from all servers for this endpoint
      this.serversSecurity = this.asyncSecurityServers;

      // security that is defined by operation
      const methodSecurity = this._computeSecurity(method);

      // method security that is defined by operation and is not defined by servers
      this.methodSecurity = this._computeAsyncSecurityMethod(methodSecurity,this.serversSecurity);
      this.security = this.methodSecurity.length > 0 ? this.methodSecurity : this.serversSecurity;
  }

  _computeIsDeprecated(method) {
    return Boolean(this._getValue(method, this._getAmfKey(this.ns.aml.vocabularies.core.deprecated)));
  }

  _overwriteExpects() {
    let expects = this.message;
    if (Array.isArray(expects)) {
       // eslint-disable-next-line prefer-destructuring
       expects = expects[0];
    }
    this.expects = expects;
  }

  _processEndpointChange() {
    this.__endpointProcessingDebouncer = false;
    this._processServerInfo();
  }

  _computeBindings(expects) {
    let result = [];
    if (!expects) {
      result = [];
    }
    const keyBinding = this._getAmfKey(this.ns.aml.vocabularies.apiBinding.binding)
    const keyBindings = this._getAmfKey(this.ns.aml.vocabularies.apiBinding.bindings)
    result = expects && expects[keyBinding] ? expects[keyBinding][0][keyBindings] : []

    return result
  }

  _hasQueryParameters() {
    if (!this.queryParameters) {
      return false;
    }
    return this.queryParameters instanceof Object || !!this.queryParameters.length;
  }

  _expectsChanged(expects) {
    this._processEndpointVariables();
    this.headers = this._computeHeaders(expects);
    this.bindings = this._computeBindings(expects)
    this.payload = this._computePayload(expects);
    this.payloadDescription = this._computeDescription(expects);
    this.queryParameters = this._computeQueryParameters(expects);
    this.hasParameters = this.hasPathParameters || this._hasQueryParameters();
  }

  _processEndpointVariables() {
    const endpointVariables = this._computeEndpointVariables(this.endpoint, this.expects);
    this.endpointVariables = endpointVariables;
    const hasPathParameters = this._computeHasPathParameters(this.serverVariables, endpointVariables);
    this.hasPathParameters = hasPathParameters;
    this.hasParameters = hasPathParameters || this._hasQueryParameters();
  }

  /**
   * Updates value for endpoint URI, server and path variables.
   */
  _processServerInfo() {
    const serverVariables = this._computeServerVariables(this.server);
    this.serverVariables = serverVariables;
    const hasPathParameters = this._computeHasPathParameters(serverVariables, this.endpointVariables);
    this.hasPathParameters = hasPathParameters;
    this.hasParameters = hasPathParameters || this._hasQueryParameters();
    this._processEndpointVariables();
  }

  /**
   * Computes list of query parameters to be rendered in the query parameters table.
   *
   * The parameters document can pass a type definition for query parameters
   * or a list of properties to be rendered without the parent type definition.
   *
   * @param {any} scheme Model for Expects shape of AMF model.
   * @return {any[]|any|undefined} Either list of properties or a type definition
   * for a queryString property of RAML's
   */
  _computeQueryParameters(scheme) {
    if (!scheme) {
      return undefined;
    }
    const pKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.parameter);
    let result = this._ensureArray(scheme[pKey]);
    if (result) {
      return result;
    }
    const qKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.queryString);
    result = this._ensureArray(scheme[qKey]);
    if (result) {
      // @ts-ignore
      result = this._resolve(result[0]);
    }
    return result;
  }

  /**
   * Computes value for `methodName` property.
   * It is either a `http://schema.org/name` or HTTP method name
   *
   * @param {any} method AMF `supportedOperation` model
   * @return {string|undefined} Method friendly name
   */
  _computeMethodName(method) {
    let name = /** @type string */ (this._getValue(method, this.ns.aml.vocabularies.core.name));
    if (!name) {
      name = /** @type string */ (this._getValue(method, this.ns.aml.vocabularies.apiContract.method));
    }
    return name;
  }

  /**
   * Computes value for `hasPathParameters` property
   *
   * @param {any[]} sVars Current value of `serverVariables` property
   * @param {any[]} eVars Current value of `endpointVariables` property
   * @return {boolean}
   */
  _computeHasPathParameters(sVars, eVars) {
    return !!((sVars && sVars.length) || (eVars && eVars.length));
  }

  /**
   * "Try it" button click handler. Dispatches `tryit-requested` custom event
   */
  _tryIt() {
    const { method } = this;
    if (!method) {
      return;
    }
    const id = method['@id'];
    this.dispatchEvent(new CustomEvent('tryit-requested', {
      bubbles: true,
      composed: true,
      detail: {
        id
      }
    }));
  }

  /**
   * Navigates to next method. Calls `_navigate` with id of previous item.
   */
  _navigatePrevious() {
    this._navigate(this.previous.id, 'method');
  }

  /**
   * Navigates to next method. Calls `_navigate` with id of next item.
   */
  _navigateNext() {
    this._navigate(this.next.id, 'method');
  }

  /**
   * Dispatches `api-navigation-selection-changed` so other components
   * can update their state.
   *
   * @param {String} id
   * @param {String} type
   */
  _navigate(id, type) {
    const e = new CustomEvent('api-navigation-selection-changed', {
      bubbles: true,
      composed: true,
      detail: {
        selected: id,
        type
      }
    });
    this.dispatchEvent(e);
  }

  /**
   * Toggles code snippets section.
   */
  _toggleSnippets() {
    const state = !this._snippetsOpened;
    if (state && !this._renderSnippets) {
      this._renderSnippets = true;
    }
    setTimeout(() => {
      this._snippetsOpened = state;
    });
  }

  _snippetsTransitionEnd() {
    if (!this._snippetsOpened) {
      this._renderSnippets = false;
    }
  }

  /**
   * Toggles security section.
   */
  _toggleSecurity() {
    this.securityOpened = !this.securityOpened;
  }

  /**
   * Toggles security section.
   */
  _toggleCallbacks() {
    this.callbacksOpened = !this.callbacksOpened;
  }

  /**
   * Computes example headers string for code snippets.
   * @param {any|any[]} headers Headers model from AMF
   * @return {string|undefined} Computed example value for headers
   */
  _computeSnippetsHeaders(headers) {
    let result;
    if (headers && headers.length) {
      result = '';
      headers.forEach((item) => {
        const name = this._getValue(item, this.ns.aml.vocabularies.apiContract.paramName) || this._getValue(item, this.ns.aml.vocabularies.core.name);
        const value = this._computePropertyValue(item) || '';
        result += `${name}: ${value}\n`;
      });
    }
    return result;
  }

  /**
   * Computes example payload string for code snippets.
   * @param {object|object[]} payload Payload model from AMF
   * @return {string|undefined} Computed example value for payload
   */
  _computeSnippetsPayload(payload) {
    let body = payload;
    if (body &&  Array.isArray(body)) {
      [body] = body;
    }
    if (!body) {
      return undefined;
    }
    let mt = /** @type string */ (this._getValue(body, this.ns.aml.vocabularies.core.mediaType));
    if (!mt) {
      mt = 'application/json';
    }
    const gen = new ExampleGenerator(this.amf);
    const examples = gen.generatePayloadExamples(body, mt, {});
    if (!examples || !examples[0]) {
      return undefined;
    }
    return examples[0].value;
  }

  /**
   * Tries to find an example value (whether it's default value or from an
   * example) to put it into snippet's values.
   *
   * @param {object} item A http://raml.org/vocabularies/http#Parameter property
   * @return {string|undefined}
   */
  _computePropertyValue(item) {
    const sKey = this._getAmfKey(this.ns.aml.vocabularies.shapes.schema);
    let schema = item && item[sKey];
    if (!schema) {
      return undefined;
    }
    if (Array.isArray(schema)) {
      [schema] = schema;
    }
    let value = /** @type string */ (this._getValue(schema, this.ns.w3.shacl.defaultValue));
    if (!value) {
      const gen = new ExampleGenerator(this.amf);
      const items = gen.computeExamples(schema, null, { rawOnly: true });
      if (items) {
        value = items[0].value;
      }
    }
    return value;
  }

  /**
   * Computes a label for the section toggle buttons.
   * @param {boolean} opened
   * @returns {string}
   */
  _computeToggleActionLabel(opened) {
    return opened ? 'Hide' : 'Show';
  }

  /**
   * Computes state of toggle button.
   * @param {boolean} opened
   * @returns {string}
   */
  _computeToggleButtonState(opened) {
    return opened ? 'Collapsed' : 'Expanded';
  }

  /**
   * Computes class for the toggle's button icon.
   * @param {boolean} opened
   * @returns {string}
   */
  _computeToggleIconClass(opened) {
    let classes = 'toggle-icon';
    if (opened) {
      classes += ' opened';
    }
    return classes;
  }

  /**
   * Computes list of "extends" from the shape.
   *
   * @param {any} shape AMF shape to get `#extends` model from
   * @return {any[]|undefined}
   */
  _computeExtends(shape) {
    const key = this._getAmfKey(this.ns.aml.vocabularies.document.extends);
    return shape && this._ensureArray(shape[key]);
  }

  /**
   * Computes value for `traits` property
   *
   * @param {any[]} types Result of calling `_computeExtends()` or a list of `#extends` models.
   * @return {any[]|undefined}
   */
  _computeTraits(types) {
    if (!types || !types.length) {
      return undefined;
    }
    const data = types.filter((item) =>
      this._hasType(item, this.ns.aml.vocabularies.apiContract.ParametrizedTrait));
    return data.length ? data : undefined;
  }

  /**
   * Computes list of trait names to render it in the doc.
   *
   * @param {any[]} traits AMF trait definition
   * @return {string|undefined} Trait name if defined.
   */
  _computeTraitNames(traits) {
    if (!traits || !traits.length) {
      return undefined;
    }
    const names = traits.map((trait) => this._getValue(trait, this.ns.aml.vocabularies.core.name));
    if (names.length === 2) {
      return names.join(' and ');
    }
    return names.join(', ');
  }

  /**
   * Computes as list of OAS' callbacks in current method
   * @param {Object} method A method to process
   * @return {Array<Object>|undefined} List of Callbacks or undefined if none.
   */
  _computeCallbacks(method) {
    if (!method) {
      return undefined;
    }
    const key = this._getAmfKey(this.ns.aml.vocabularies.apiContract.callback);
    return this._ensureArray(method[key]);
  }

  render() {
    const {
      hasCustomProperties,
      method
    } = this;
    return html`<style>${this.styles}</style>
    ${this._getTitleTemplate()}
    ${this._deprecatedWarningTemplate()}
    ${this._getUrlTemplate()}
    ${this._getTraitsTemplate()}
    ${hasCustomProperties ? html`<api-annotation-document .shape="${method}"></api-annotation-document>` : ''}
    ${this._getDescriptionTemplate()}
    ${this._getRequestTemplate()}
    ${this._getReturnsTemplate()}
    ${this._getNavigationTemplate()}`;
  }

  _getTitleTemplate() {
    const isAsyncApi = this._isAsyncAPI(this.amf)
    if (this._titleHidden) {
      return '';
    }
    const {
      methodName,
      noTryIt,
      compatibility,
      methodSummary,
      operationId,
    } = this;
    return html`
    <div class="title-area">
      <div role="heading" aria-level="1" class="title">${methodName}</div>
      ${noTryIt ? '' : html`<div class="action">
        <anypoint-button
          class="action-button"
          @click="${this._tryIt}"
          emphasis="high"
          ?compatibility="${compatibility}">Try it</anypoint-button>
      </div>`}
    </div>
    ${methodSummary ? html`<p class="summary">${methodSummary}</p>` : ''}
    ${operationId && !isAsyncApi ? html`<span class="operation-id">Operation ID: ${operationId}</span>` : ''}
    `;
  }

  _deprecatedWarningTemplate() {
    if (!this.deprecated) {
      return '';
    }
    return html`<div class="deprecated-warning"><span>Warning: Deprecated</span></div>`
  }

  _getUrlTemplate() {
    return html`
    <api-url
      .amf="${this.amf}"
      .server="${this.server}"
      .servers="${this.servers}"
      .endpoint="${this.endpoint}"
      .apiVersion="${this.apiVersion}"
      .baseUri="${this.baseUri}"
      .operation="${this.method}"
      .operationId="${this.operationId}"
      @change="${this._handleUrlChange}"
    >
    </api-url>`;
  }

  _getTraitsTemplate() {
    const {traits} = this;
    if (!traits || !traits.length) {
      return '';
    }
    const value = this._computeTraitNames(traits);
    return html`<section class="extensions">
      <span>Mixes in
      <span class="trait-name">${value}</span>.
      </span>
    </section>`;
  }

  _getDescriptionTemplate() {
    const { description } = this;
    if (!description) {
      return '';
    }
    return html`<arc-marked .markdown="${description}" sanitize>
      <div slot="markdown-html" class="markdown-body"></div>
    </arc-marked>`;
  }

  _getCodeSnippetsTemplate() {
    if (!this.renderCodeSnippets) {
      return '';
    }
    if (this.isNonHttpProtocol()) {
      return '';
    }
    const {
      _snippetsOpened,
      _renderSnippets,
      snippetsUri,
      httpMethod,
      headers,
      payload,
      compatibility
    } = this;
    const label = this._computeToggleActionLabel(_snippetsOpened);
    const buttonState = this._computeToggleButtonState(_snippetsOpened);
    const iconClass = this._computeToggleIconClass(_snippetsOpened);
    return html`<section class="snippets">
      <div
        class="section-title-area"
        @click="${this._toggleSnippets}"
        title="Toggle code example details"
        ?opened="${_snippetsOpened}"
      >
        <div class="heading3 table-title" role="heading" aria-level="2">Code examples</div>
        <div class="title-area-actions" aria-label="${buttonState}">
          <anypoint-button class="toggle-button" ?compatibility="${compatibility}" data-toggle="code-examples">
            ${label}
            <arc-icon class="icon ${iconClass}" icon="expandMore"></arc-icon>
          </anypoint-button>
        </div>
      </div>
      <anypoint-collapse .opened="${_snippetsOpened}" @transitionend="${this._snippetsTransitionEnd}">
      ${_renderSnippets ? html`<http-code-snippets
        scrollable
        ?compatibility="${compatibility}"
        .url="${snippetsUri}"
        .method="${httpMethod}"
        .headers="${this._computeSnippetsHeaders(headers)}"
        .payload="${this._computeSnippetsPayload(payload)}"></http-code-snippets>` : ''}
      </anypoint-collapse>
    </section>`;
  }

  _getSecurityTemplate() {
    const { renderSecurity, serversSecurity, security: securityNoAsync } = this;
    let security = securityNoAsync
    if(this._isAsyncAPI(this.amf)){
      // when is async api shows security that is defined by servers
      security = serversSecurity
    }
    if (!renderSecurity || !security || !security.length) {
      return '';
    }
    const { securityOpened, compatibility, amf, narrow } = this;
    const label = this._computeToggleActionLabel(securityOpened);
    const buttonState = this._computeToggleButtonState(securityOpened);
    const iconClass = this._computeToggleIconClass(securityOpened);
    return html`<section class="security">
      <div
        class="section-title-area"
        @click="${this._toggleSecurity}"
        title="Toggle security details"
        ?opened="${securityOpened}"
      >
        <div class="heading3 table-title" role="heading" aria-level="2">Security</div>
        <div class="title-area-actions" aria-label="${buttonState}">
          <anypoint-button class="toggle-button security" ?compatibility="${compatibility}" data-toggle="security">
            ${label}
            <arc-icon icon="expandMore" class="icon ${iconClass}"></arc-icon>
          </anypoint-button>
        </div>
      </div>
      <anypoint-collapse .opened="${securityOpened}">
        ${security.map((item) => html`<api-security-documentation
          .amf="${amf}"
          .security="${item}"
          ?narrow="${narrow}"
          ?compatibility="${compatibility}"></api-security-documentation>`)}
      </anypoint-collapse>
    </section>`;
  }

  _getParametersTemplate() {
    if (!this.hasParameters) {
      return '';
    }
    const {
      serverVariables,
      endpointVariables,
      queryParameters,
      amf,
      narrow,
      compatibility,
      graph
    } = this;
    return html`<api-parameters-document
      .amf="${amf}"
      queryOpened
      pathOpened
      .baseUriParameters="${serverVariables}"
      .endpointParameters="${endpointVariables}"
      .queryParameters="${queryParameters}"
      ?narrow="${narrow}"
      ?compatibility="${compatibility}"
      ?graph="${graph}"></api-parameters-document>`;
  }

  _getHeadersTemplate() {
    const { headers } = this;
    // @ts-ignore
    if (!headers || (!headers.length && !Object.keys(headers).length)) {
      return '';
    }
    const {
      amf,
      narrow,
      compatibility,
      graph
    } = this;

    // hidden example when is not an async api 
    const noMainExample = !this._isAsyncAPI(amf)

    return html`<api-headers-document
      opened
      .amf="${amf}"
      ?narrow="${narrow}"
      ?compatibility="${compatibility}"
      ?graph="${graph}"
      .noMainExample="${noMainExample}"
      .headers="${headers}"></api-headers-document>`;
  }

  _getBodyTemplate() {
    const { payload, payloadDescription, bindings, endpoint } = this;
    if (!payload || !payload.length) {
      return '';
    }
    const {
      amf,
      narrow,
      compatibility,
      graph
    } = this;
    return html`<api-body-document
      opened
      .amf="${amf}"
      ?narrow="${narrow}"
      ?compatibility="${compatibility}"
      ?graph="${graph}"
      .endpoint="${endpoint}"
      .body="${payload}"
      .bodyDescription="${payloadDescription}"
      .bindings="${bindings}"
      ></api-body-document>`;
  }

  _getRequestTemplate() {
    return html`<section class="request-documentation">
      ${this._getAsyncSecurityMethodTemplate()}
      ${this._getMessagesTemplate()}
      ${this._getCodeSnippetsTemplate()}
      ${this._getSecurityTemplate()}
      ${this._getParametersTemplate()}
      ${this._getHeadersTemplate()}
      ${this._getBodyTemplate()}
      ${this._callbacksTemplate()}
    </section>`
  }

  _getAsyncSecurityMethodTemplate() {
    const { renderSecurity, methodSecurity } = this;
    if (!renderSecurity || !methodSecurity || !methodSecurity.length || !this._isAsyncAPI(this.amf)) {
      return '';
    }
    const {  compatibility, amf, narrow } = this;
    return html`<section class="async-method-security">
      <div
        class="section-title-area"
      >
        <div class="heading3 table-title" role="heading" aria-level="2">Additional security requirements</div>
        
      </div>
        ${methodSecurity.map((item) => html`<api-security-documentation
          .amf="${amf}"
          .security="${item}"
          ?narrow="${narrow}"
          ?compatibility="${compatibility}"></api-security-documentation>`)}
    </section>`;
  }

  _getMessagesTemplate() {
    const { message } = this;
    if (!message || !Array.isArray(message) || message.length <= 1) {
      return html``;
    }
    return html`<div class="messages-options">
    <div>This operation has multiple messages. Please select one:</div>
    <anypoint-dropdown-menu
      aria-label="Select message from list of available options"
    >
      <label slot="label">Selected message</label>
      <anypoint-listbox slot="dropdown-content" tabindex="-1" selected="0" @selected-changed="${(e) => this._selectedMessageHandler(e)}">
        ${message.map(msg => this._getMessageTemplate(msg))}
      </anypoint-listbox>
    </anypoint-dropdown-menu>
    </div>`;
  }

  _getMessageTemplate(message) {
    const nameKey = this._getAmfKey(this.ns.aml.vocabularies.core.name);
    const name = this._getValue(message, nameKey);
    return html`<anypoint-item>${name}</anypoint-item>`
  }

  _selectedMessageHandler(event) {
    this.expects = this.message[event.target.selected]
  }

  _getReturnsTemplate() {
    const { returns } = this;
    if (!returns || !returns.length || this._isAsyncAPI(this.amf)) {
      return '';
    }
    const {
      amf,
      narrow,
      compatibility,
      graph
    } = this;
    return html`<section class="response-documentation">
      <div class="heading2" role="heading" aria-level="1">Responses</div>
      <api-responses-document
        .amf="${amf}"
        ?narrow="${narrow}"
        ?compatibility="${compatibility}"
        ?graph="${graph}"
        .returns="${returns}"></api-responses-document>
    </section>`;
  }

  _callbacksTemplate() {
    const { callbacks } = this;
    if (!callbacks || !callbacks.length) {
      return '';
    }
    const {
      callbacksOpened,
      compatibility,
    } = this;
    const label = this._computeToggleActionLabel(callbacksOpened);
    const buttonState = this._computeToggleButtonState(callbacksOpened);
    const iconClass = this._computeToggleIconClass(callbacksOpened);
    return html`<section class="callbacks">
      <div
        class="section-title-area"
        @click="${this._toggleCallbacks}"
        title="Toggle callbacks details"
        ?opened="${callbacksOpened}"
      >
        <div class="heading3 table-title" role="heading" aria-level="2">Callbacks</div>
        <div class="title-area-actions" aria-label="${buttonState}">
          <anypoint-button class="toggle-button" ?compatibility="${compatibility}" data-toggle="callbacks">
            ${label}
            <arc-icon icon="expandMore"  class="icon ${iconClass}"></arc-icon>
          </anypoint-button>
        </div>
      </div>
      <anypoint-collapse .opened="${callbacksOpened}">
        ${callbacks.map((callback) => this._callbackTemplate(callback))}
      </anypoint-collapse>
    </section>`;
  }

  _callbackTemplate(callback) {
    const name = this._getValue(callback, this.ns.aml.vocabularies.core.name);
    const endpointKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.endpoint);
    const endpoints = this._ensureArray(callback[endpointKey]);
    if (!endpoints || !endpoints.length) {
      return '';
    }
    const endpoint = endpoints[0];
    const methodKey = this._getAmfKey(this.ns.aml.vocabularies.apiContract.supportedOperation);
    const methods = this._ensureArray(endpoint[methodKey]);
    if (!methods || !methods.length) {
      return '';
    }
    const method = methods[0];
    const {
      amf,
      compatibility,
      graph,
      servers
    } = this;
    return html`
      <div class="callback-section">
        <div class="heading4 table-title" role="heading" aria-level="3">${name}</div>
        <api-method-documentation
          .amf="${amf}"
          .method="${method}"
          .endpoint="${endpoint}"
          .servers="${servers}"
          ?compatibility="${compatibility}"
          ?graph="${graph}"
          noTryit
          narrow
          noNavigation
          ignoreBaseUri
        ></api-method-documentation>
      </div>
    `;
  }

  _handleUrlChange(event) {
    this.endpointUri = event.detail.url;
    this.protocol = event.detail.protocol;
    this.httpMethod = event.detail.method;
  }

  isNonHttpProtocol() {
    const { protocol } = this;
    if (!protocol) {
      return false;
    }
    const lowerCase = protocol.toLowerCase();
    return lowerCase !== 'http' && lowerCase !== 'https';
  }

  _getNavigationTemplate() {
    const { next, previous, noNavigation } = this;
    if (!next && !previous || noNavigation) {
      return '';
    }
    const { compatibility } = this;
    return html`<section class="bottom-nav">
      ${previous ? html`<div class="bottom-link previous" @click="${this._navigatePrevious}">
        <anypoint-icon-button title="${previous.label}" ?compatibility="${compatibility}">
          <arc-icon icon="chevronLeft"></arc-icon>
        </anypoint-icon-button>
        <span class="nav-label">${previous.label}</span>
      </div>` : ''}
      <div class="nav-separator"></div>
      ${next ? html`<div class="bottom-link next" @click="${this._navigateNext}">
        <span class="nav-label">${next.label}</span>
        <anypoint-icon-button title="${next.label}" ?compatibility="${compatibility}">
          <arc-icon icon="chevronRight"></arc-icon>
        </anypoint-icon-button>
      </div>` : ''}
    </section>`;
  }

  _computeMethodParametersUri(method) {
    let queryParams = '';
    if (!method) {
      return queryParams;
    }

    const expects = this._computeExpects(method);
    const params = this._computeQueryParameters(expects);
    if (params && Array.isArray(params)) {
      params.forEach((param) => {
        const paramExample = this._computeMethodParameterUri(param);
        if (paramExample) {
          if (paramExample.example) {
            queryParams += `${queryParams ? '&' : '?'}${paramExample.name}=${paramExample.example}`;
          } else {
            const examples = paramExample.examples.map((e) => `${paramExample.name}=${e}`).join('&');
            queryParams += `${queryParams ? '&' : '?'}${examples}`;
          }
        }
      });
    }
    return queryParams;
  }

  _computeMethodParameterUri(param) {
    if (!this._getValue(param, this.ns.aml.vocabularies.apiContract.required)) {
      return undefined;
    }

    const paramName = this._getValue(param, this.ns.aml.vocabularies.apiContract.paramName);
    const paramExample = this._computePropertyValue(param);

    const sKey = this._getAmfKey(this.ns.aml.vocabularies.shapes.schema);
    let schema = param && param[sKey];
    if (schema) {
      if (Array.isArray(schema)) {
        [schema] = schema;
      }
      if (paramExample && this._hasType(schema, this.ns.aml.vocabularies.shapes.ArrayShape)) {
        const examples = paramExample.split(/\n/).map((e) => e.substr(1).trim());
        return { name: paramName, examples };
      }
    }

    if (paramName && paramExample) {
      return { name: paramName, example: paramExample };
    }
    return undefined;
  }

  /**
   * Returns message value depending on operation node method
   * Subscribe -> returns
   * Publish -> expects
   * `undefined` otherwise
   * @param {String} method Operation method
   */
  _getMessageForMethod(method) {
    if (!method) {
      return undefined;
    }
    switch(method.toLowerCase()) {
      case 'subscribe':
        return this.returns;
      case 'publish':
        return this._computeAllExpects(this.method);
      default:
        return undefined;
    }
  }

  /**
   * Dispatched when the user requested the "Try it" view.
   * @event tryit-requested
   * @param {String} id ID of requested method in AMF model.
   * It might be required if the request for try it view comes from
   * a context where more than one method is rendered at the same time.
   */
  /**
   * Dispatched when the user requested previous / next
   *
   * @event api-navigation-selection-changed
   * @param {String} selected
   * @param {String} type
   */
}
