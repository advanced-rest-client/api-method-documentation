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
       * When set it renders the agent parameters section
       */
      _agentOpened: { type: Boolean },
      /**
       * Computed list of agent parameters.
       */
      agentParameters: { type: Object },
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
       * Controls whether the metadata section is opened
       */
      metadataOpened: { type: Boolean }
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
    this.agentParameters = undefined;
    this._agentOpened = false;

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
    this.agentParameters = this._computeAgentParametersByMethod(method);
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
   * Toggles agent parameters section.
   */
  _toggleAgent() {
    this._agentOpened = !this._agentOpened;
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
    ${this._getEnhancedSummaryTemplate()}
    ${this._deprecatedWarningTemplate()}
    ${this._getUrlTemplate()}
    ${this._getTraitsTemplate()}
    ${hasCustomProperties ? html`<api-annotation-document .amf="${this.amf}" .shape="${method}"></api-annotation-document>` : ''}
    ${this._getDescriptionTemplate()}
    ${this._getEnhancedRequestTemplate()}
    ${this._getEnhancedResponseTemplate()}
    ${this._getEnhancedSecurityTemplate()}
    ${this._getEnhancedExamplesTemplate()}
    ${this._getEnhancedMetadataTemplate()}
    ${this._getNavigationTemplate()}`;
  }

  /**
   * Enhanced summary template with gRPC support and better organization
   */
  _getEnhancedSummaryTemplate() {
    if (this._titleHidden) {
      return '';
    }

    const { method, methodName, noTryIt, compatibility, methodSummary, operationId } = this;
    const isGrpc = this.isGrpcOp(method);
    const isAsyncApi = this._isAsyncAPI(this.amf);
    
    return html`
    <section class="operation-summary">
      <div class="title-area">
        <div class="operation-header">
          <div role="heading" aria-level="1" class="title">${methodName}</div>
          ${this._getMethodBadgeTemplate(method, isGrpc)}
        </div>
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
    </section>
    `;
  }

  /**
   * Gets method badge template for REST/gRPC operations
   */
  _getMethodBadgeTemplate(method, isGrpc) {
    if (!method) {
      return '';
    }

    const httpMethod = this._getValue(method, this.ns.aml.vocabularies.apiContract.method);
    
    if (isGrpc) {
      const streamType = this.getGrpcStreamType(method);
      return html`
        <div class="method-badges">
          <span class="method-badge grpc-badge">gRPC</span>
          ${streamType !== 'unary' ? html`<span class="stream-badge">${this._formatStreamType(streamType)}</span>` : ''}
        </div>
      `;
    }

    return html`
      <div class="method-badges">
        <span class="method-badge http-method-${httpMethod?.toLowerCase()}">${httpMethod?.toUpperCase()}</span>
      </div>
    `;
  }

  /**
   * Formats stream type for display
   */
  _formatStreamType(streamType) {
    const typeMap = {
      'client_streaming': 'Client Stream',
      'server_streaming': 'Server Stream', 
      'bidi_streaming': 'Bidirectional Stream',
      'unary': 'Unary'
    };
    return typeMap[streamType] || streamType;
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

  /**
   * Enhanced request template with structured information
   */
  _getEnhancedRequestTemplate() {
    const { method } = this;
    if (!method) {
      return '';
    }

    const expects = this._computeExpects(method);
    if (!expects) {
      return '';
    }

    const isGrpc = this.isGrpcOp(method);
    const payloads = this.getPayloads(expects);
    const params = this.getParams(method);
    const hasParams = Object.values(params).some(paramArray => paramArray.length > 0);

    return html`
    <section class="request-documentation">
      <div class="heading2" role="heading" aria-level="1">Request</div>
      
      ${this._getRequestPayloadTemplate(payloads, isGrpc)}
      ${hasParams ? this._getEnhancedParametersTemplate(params) : ''}
      ${this._getRequestHeadersTemplate(expects)}
      
      <!-- Legacy templates for backward compatibility -->
      ${this._getAsyncSecurityMethodTemplate()}
      ${this._getMessagesTemplate()}
      ${this._getCodeSnippetsTemplate()}
      ${this._getAgentTemplate()}
      ${this._callbacksTemplate()}
    </section>
    `;
  }

  /**
   * Gets request payload template
   */
  _getRequestPayloadTemplate(payloads, isGrpc) {
    if (!payloads || !Array.isArray(payloads) || payloads.length === 0) {
      return html`<div class="no-request-body">No request body</div>`;
    }

    return html`
    <div class="request-payload">
      <div class="heading3">Body</div>
      ${payloads.map(payload => this._getPayloadTemplate(payload, isGrpc, 'request'))}
    </div>
    `;
  }

  /**
   * Gets payload template for request/response
   */
  _getPayloadTemplate(payload, isGrpc, type = 'request') {
    const mediaType = this.getMediaType(payload);
    const schema = this._getValue(payload, this.ns.aml.vocabularies.shapes.schema);
    const examples = this.getExamples(payload);

    let schemaName = 'Unknown';
    if (schema && schema.length > 0) {
      schemaName = this.getSchemaName(schema[0]) || 'Schema';
    }

    return html`
    <div class="payload-item">
      <div class="payload-header">
        <span class="media-type-badge">${mediaType || 'application/json'}</span>
        ${isGrpc ? html`<span class="schema-name">${schemaName}</span>` : ''}
      </div>
      
      ${schema && schema.length > 0 ? this._getSchemaTemplate(schema[0], isGrpc) : ''}
      ${examples.length > 0 ? this._getPayloadExamplesTemplate(examples, type) : ''}
    </div>
    `;
  }

  /**
   * Gets schema template
   */
  _getSchemaTemplate(schema, isGrpc) {
    const schemaName = this.getSchemaName(schema);
    const description = this._getValue(schema, this.ns.aml.vocabularies.core.description);
    
    if (isGrpc) {
      // Resolve schema if it's a link
      const resolvedSchema = this._resolveSchemaLink(schema);
      if (!resolvedSchema) {
        return html`
        <div class="grpc-message">
          <div class="schema-title">${schemaName} Message</div>
          <div class="no-fields">Schema definition not found</div>
        </div>
        `;
      }

      // For gRPC, show message structure from resolved schema
      const properties = this._ensureArray(this._getValue(resolvedSchema, this.ns.w3.shacl.property));
      if (properties && properties.length > 0) {
        return html`
        <div class="grpc-message">
          <div class="schema-title">${schemaName} Message</div>
          ${description ? html`<div class="schema-description">${description}</div>` : ''}
          <div class="message-fields">
            ${properties.map(prop => this._getGrpcFieldTemplate(prop))}
          </div>
        </div>
        `;
      }

      return html`
      <div class="grpc-message">
        <div class="schema-title">${schemaName} Message</div>
        ${description ? html`<div class="schema-description">${description}</div>` : ''}
        <div class="no-fields">No fields defined</div>
      </div>
      `;
    }

    // For REST, use existing body document component
    return html`
    <api-body-document
      .amf="${this.amf}"
      .body="${schema}"
      ?narrow="${this.narrow}"
      ?compatibility="${this.compatibility}"
      ?graph="${this.graph}">
    </api-body-document>
    `;
  }

  /**
   * Gets gRPC field template
   */
  _getGrpcFieldTemplate(property) {
    const name = this._getValue(property, this.ns.w3.shacl.name);
    const range = this._getValue(property, this.ns.aml.vocabularies.shapes.range);
    const minCount = this._getValue(property, this.ns.w3.shacl.minCount);
    const required = minCount && minCount > 0;
    
    let fieldType = this._getFieldTypeFromRange(range);

    return html`
    <div class="grpc-field">
      <span class="field-name">${name}</span>
      <span class="field-type">${fieldType}</span>
      ${required ? html`<span class="required-badge">required</span>` : ''}
    </div>
    `;
  }

  /**
   * Gets field type string from range object
   * @param {Object} range AMF Range object
   * @returns {string} Field type description
   */
  _getFieldTypeFromRange(range) {
    if (!range) {
      return 'string';
    }

    // Check if it's an array
    if (this._hasType(range, 'http://a.ml/vocabularies/shapes#ArrayShape')) {
      const items = this._getValue(range, this.ns.aml.vocabularies.shapes.items);
      if (items) {
        const itemType = this._getFieldTypeFromRange(items);
        return `${itemType}[]`;
      }
      return 'array';
    }

    // Check if it's a scalar
    if (this._hasType(range, 'http://a.ml/vocabularies/shapes#ScalarShape')) {
      const dataType = this._getValue(range, this.ns.w3.shacl.datatype);
      if (dataType) {
        const typeUri = dataType['@id'] || dataType;
        if (typeUri.includes('#string')) return 'string';
        if (typeUri.includes('#int')) return 'int32';
        if (typeUri.includes('#long')) return 'int64';
        if (typeUri.includes('#float')) return 'float';
        if (typeUri.includes('#double')) return 'double';
        if (typeUri.includes('#boolean')) return 'bool';
        return typeUri.split('#').pop() || 'string';
      }
    }

    // Check if it's a node shape (message type)
    if (this._hasType(range, 'http://www.w3.org/ns/shacl#NodeShape')) {
      const name = this._getValue(range, this.ns.w3.shacl.name) || 
                   this._getValue(range, this.ns.aml.vocabularies.core.name);
      return name || 'message';
    }

    return 'string';
  }

  _getRequestTemplate() {
    return html`<section class="request-documentation">
      ${this._getAsyncSecurityMethodTemplate()}
      ${this._getMessagesTemplate()}
      ${this._getCodeSnippetsTemplate()}
      ${this._getAgentTemplate()}
      ${this._getSecurityTemplate()}
      ${this._getParametersTemplate()}
      ${this._getHeadersTemplate()}
      ${this._getBodyTemplate()}
      ${this._callbacksTemplate()}
    </section>`
  }

  _getAgentTemplate() {
    const { agentParameters } = this;
    if (!agentParameters || Object.keys(agentParameters).length === 0) {
      return '';
    }
    const { _agentOpened, compatibility } = this;
    const label = this._computeToggleActionLabel(_agentOpened);
    const buttonState = this._computeToggleButtonState(_agentOpened);
    const iconClass = this._computeToggleIconClass(_agentOpened);
    return html`<section class="agent-parameters">
      <div
        class="section-title-area"
        @click="${this._toggleAgent}"
        title="Toggle agent parameters"
        ?opened="${_agentOpened}"
      >
        <div class="heading3 table-title" role="heading" aria-level="2">Agent parameters</div>
        <div class="title-area-actions" aria-label="${buttonState}">
          <anypoint-button class="toggle-button" ?compatibility="${compatibility}" data-toggle="agent-parameters">
            ${label}
            <arc-icon class="icon ${iconClass}" icon="expandMore"></arc-icon>
          </anypoint-button>
        </div>
      </div>
      <anypoint-collapse .opened="${_agentOpened}">
        <div class="parameters-container">
        ${Object.keys(agentParameters).map((key) => html`
          <div class="property-item">
            <div class="property-name">${key}: <strong>${String(agentParameters[key])}</strong></div>
          </div>
        `)}
        </div>
      </anypoint-collapse>
    </section>`;
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

  /**
   * Enhanced parameters template with better organization
   */
  _getEnhancedParametersTemplate(params) {
    const hasAnyParams = Object.values(params).some(paramArray => paramArray.length > 0);
    if (!hasAnyParams) {
      return '';
    }

    return html`
    <div class="enhanced-parameters">
      <div class="heading3">Parameters</div>
      ${params.path.length > 0 ? this._getParameterGroupTemplate('Path', params.path) : ''}
      ${params.query.length > 0 ? this._getParameterGroupTemplate('Query', params.query) : ''}
      ${params.header.length > 0 ? this._getParameterGroupTemplate('Header', params.header) : ''}
      ${params.cookie.length > 0 ? this._getParameterGroupTemplate('Cookie', params.cookie) : ''}
    </div>
    `;
  }

  /**
   * Gets parameter group template
   */
  _getParameterGroupTemplate(groupName, parameters) {
    return html`
    <div class="parameter-group">
      <div class="parameter-group-title">${groupName} Parameters</div>
      <div class="parameters-list">
        ${parameters.map(param => this._getParameterItemTemplate(param))}
      </div>
    </div>
    `;
  }

  /**
   * Gets parameter item template
   */
  _getParameterItemTemplate(param) {
    return html`
    <div class="parameter-item">
      <div class="parameter-header">
        <span class="parameter-name">${param.name}</span>
        <span class="parameter-type">${param.type}</span>
        ${param.required ? html`<span class="required-badge">required</span>` : ''}
      </div>
      ${param.description ? html`<div class="parameter-description">${param.description}</div>` : ''}
      ${param.defaultValue ? html`<div class="parameter-default">Default: <code>${param.defaultValue}</code></div>` : ''}
      ${param.examples.length > 0 ? html`<div class="parameter-examples">Examples: ${param.examples.map(ex => html`<code>${ex}</code>`).join(', ')}</div>` : ''}
    </div>
    `;
  }

  /**
   * Gets request headers template
   */
  _getRequestHeadersTemplate(expects) {
    const headers = this._ensureArray(this._getValue(expects, this.ns.aml.vocabularies.apiContract.header));
    if (!headers || headers.length === 0) {
      return '';
    }

    return html`
    <div class="request-headers">
      <div class="heading3">Headers</div>
      <api-headers-document
        .amf="${this.amf}"
        .headers="${headers}"
        ?narrow="${this.narrow}"
        ?compatibility="${this.compatibility}">
      </api-headers-document>
    </div>
    `;
  }

  /**
   * Enhanced response template
   */
  _getEnhancedResponseTemplate() {
    const { returns, method } = this;
    if (!returns || !returns.length || this._isAsyncAPI(this.amf)) {
      return '';
    }

    const isGrpc = this.isGrpcOp(method);

    return html`
    <section class="response-documentation">
      <div class="heading2" role="heading" aria-level="1">Response</div>
      
      ${isGrpc ? this._getGrpcResponseTemplate(returns) : this._getRestResponseTemplate(returns)}
    </section>
    `;
  }

  /**
   * Gets gRPC response template
   */
  _getGrpcResponseTemplate(returns) {
    const response = returns[0]; // gRPC typically has one response
    const payloads = this.getPayloads(response);
    
    if (!payloads || !Array.isArray(payloads)) {
      return '';
    }
    
    return html`
    <div class="grpc-response">
      ${payloads.map(payload => this._getPayloadTemplate(payload, true, 'response'))}
    </div>
    `;
  }

  /**
   * Gets REST response template
   */
  _getRestResponseTemplate(returns) {
    return html`
    <div class="rest-responses">
      <api-responses-document
        .amf="${this.amf}"
        ?narrow="${this.narrow}"
        ?compatibility="${this.compatibility}"
        ?graph="${this.graph}"
        .returns="${returns}">
      </api-responses-document>
    </div>
    `;
  }

  /**
   * Gets payload examples template
   */
  _getPayloadExamplesTemplate(examples, type) {
    if (!examples || !Array.isArray(examples) || examples.length === 0) {
      return '';
    }

    return html`
    <div class="payload-examples">
      <div class="examples-title">Example${examples.length > 1 ? 's' : ''}</div>
      ${examples.map((example, index) => this._getExampleTemplate(example, index, type))}
    </div>
    `;
  }

  /**
   * Gets example template
   */
  _getExampleTemplate(example, index, type) {
    const value = this._getValue(example, this.ns.aml.vocabularies.core.value);
    const name = this._getValue(example, this.ns.aml.vocabularies.core.name) || `Example ${index + 1}`;
    
    if (!value) {
      return '';
    }

    const isLongExample = value.length > 200;
    const displayValue = isLongExample ? value.substring(0, 200) + '...' : value;

    return html`
    <div class="example-item">
      <div class="example-header">
        <span class="example-name">${name}</span>
      </div>
      <div class="example-content">
        <pre><code>${displayValue}</code></pre>
        ${isLongExample ? html`
          <anypoint-button 
            class="show-full-example" 
            @click="${() => this._toggleFullExample(index, type)}">
            Show full example
          </anypoint-button>
        ` : ''}
      </div>
    </div>
    `;
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
      graph
    } = this;
    return html`
      <div class="callback-section">
        <div class="heading4 table-title" role="heading" aria-level="3">${name}</div>
        <api-method-documentation
          .amf="${amf}"
          .method="${method}"
          .endpoint="${endpoint}"
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

  /**
   * Enhanced security template
   */
  _getEnhancedSecurityTemplate() {
    const { method } = this;
    const securityRequirements = this.getSecurityRequirements(method);
    
    if (!securityRequirements || securityRequirements.length === 0) {
      return '';
    }

    return html`
    <section class="enhanced-security">
      <div class="heading2" role="heading" aria-level="1">Security</div>
      <div class="security-requirements">
        ${securityRequirements.map(requirement => this._getSecurityRequirementTemplate(requirement))}
      </div>
    </section>
    `;
  }

  /**
   * Gets security requirement template
   */
  _getSecurityRequirementTemplate(requirement) {
    const scheme = this._getValue(requirement, this.ns.aml.vocabularies.security.scheme);
    if (!scheme || !scheme.length) {
      return '';
    }

    return html`
    <api-security-documentation
      .amf="${this.amf}"
      .security="${requirement}"
      ?narrow="${this.narrow}"
      ?compatibility="${this.compatibility}">
    </api-security-documentation>
    `;
  }

  /**
   * Enhanced examples template
   */
  _getEnhancedExamplesTemplate() {
    const { method } = this;
    if (!method) {
      return '';
    }

    const isGrpc = this.isGrpcOp(method);
    const examples = this._collectAllExamples(method);
    const hasExamples = examples.request.length > 0 || examples.response.length > 0;
    
    // Generate gRPC examples if it's a gRPC API and we don't have existing examples
    let grpcExamples = null;
    if (isGrpc && !hasExamples) {
      grpcExamples = this._generateGrpcExamples();
    }

    if (!hasExamples && !grpcExamples) {
      return '';
    }

    return html`
    <section class="enhanced-examples">
      <div class="heading2" role="heading" aria-level="1">Examples</div>
      
      ${isGrpc && grpcExamples ? this._getGrpcExamplesTemplate(grpcExamples) : ''}
      
      ${examples.request && Array.isArray(examples.request) && examples.request.length > 0 ? html`
        <div class="request-examples">
          <div class="heading3">Request Examples</div>
          ${examples.request.map((example, index) => this._getExampleTemplate(example, index, 'request'))}
        </div>
      ` : ''}
      
      ${examples.response && Array.isArray(examples.response) && examples.response.length > 0 ? html`
        <div class="response-examples">
          <div class="heading3">Response Examples</div>
          ${examples.response.map((example, index) => this._getExampleTemplate(example, index, 'response'))}
        </div>
      ` : ''}
    </section>
    `;
  }

  /**
   * Collects all examples from request and response
   */
  _collectAllExamples(method) {
    const examples = { request: [], response: [] };

    // Collect request examples
    const expects = this._computeExpects(method);
    if (expects) {
      const payloads = this.getPayloads(expects);
      if (payloads && Array.isArray(payloads)) {
        payloads.forEach(payload => {
          examples.request.push(...this.getExamples(payload));
        });
      }
    }

    // Collect response examples
    const returns = this._computeReturns(method);
    if (returns && returns.length > 0) {
      returns.forEach(response => {
        const payloads = this.getPayloads(response);
        if (payloads && Array.isArray(payloads)) {
          payloads.forEach(payload => {
            examples.response.push(...this.getExamples(payload));
          });
        }
      });
    }

    return examples;
  }

  /**
   * Enhanced metadata template (collapsible)
   */
  _getEnhancedMetadataTemplate() {
    const { method } = this;
    if (!method) {
      return '';
    }

    const metadata = this._collectMetadata(method);
    const hasMetadata = Object.values(metadata).some(value => 
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    );

    if (!hasMetadata) {
      return '';
    }

    const { compatibility } = this;
    const opened = this.metadataOpened || false;
    const label = this._computeToggleActionLabel(opened);
    const buttonState = this._computeToggleButtonState(opened);
    const iconClass = this._computeToggleIconClass(opened);

    return html`
    <section class="enhanced-metadata">
      <div
        class="section-title-area"
        @click="${this._toggleMetadata}"
        title="Toggle additional information"
        ?opened="${opened}"
      >
        <div class="heading2 table-title" role="heading" aria-level="1">Additional Information</div>
        <div class="title-area-actions" aria-label="${buttonState}">
          <anypoint-button class="toggle-button" ?compatibility="${compatibility}" data-toggle="metadata">
            ${label}
            <arc-icon class="icon ${iconClass}" icon="expandMore"></arc-icon>
          </anypoint-button>
        </div>
      </div>
      <anypoint-collapse .opened="${opened}">
        ${this._getMetadataContentTemplate(metadata)}
      </anypoint-collapse>
    </section>
    `;
  }

  /**
   * Collects metadata from operation
   */
  _collectMetadata(method) {
    const tags = this._ensureArray(this._getValue(method, this.ns.aml.vocabularies.core.tag));
    const servers = this._ensureArray(this._getValue(method, this.ns.aml.vocabularies.apiContract.server));
    
    return {
      operationId: this._getValue(method, this.ns.aml.vocabularies.apiContract.operationId),
      tags: Array.isArray(tags) ? tags : [],
      externalDocs: this._getValue(method, this.ns.aml.vocabularies.core.documentation),
      deprecated: this._getValue(method, this.ns.aml.vocabularies.core.deprecated),
      servers: Array.isArray(servers) ? servers : [],
      callbacks: this._computeCallbacks(method)
    };
  }

  /**
   * Gets metadata content template
   */
  _getMetadataContentTemplate(metadata) {
    return html`
    <div class="metadata-content">
      ${metadata.operationId ? html`
        <div class="metadata-item">
          <span class="metadata-label">Operation ID:</span>
          <span class="metadata-value">${metadata.operationId}</span>
        </div>
      ` : ''}
      
      ${metadata.tags && Array.isArray(metadata.tags) && metadata.tags.length > 0 ? html`
        <div class="metadata-item">
          <span class="metadata-label">Tags:</span>
          <div class="metadata-tags">
            ${metadata.tags.map(tag => html`<span class="tag-badge">${this._getValue(tag, this.ns.aml.vocabularies.core.name)}</span>`)}
          </div>
        </div>
      ` : ''}
      
      ${metadata.externalDocs ? html`
        <div class="metadata-item">
          <span class="metadata-label">External Documentation:</span>
          <a href="${this._getValue(metadata.externalDocs, this.ns.aml.vocabularies.core.url)}" 
             target="_blank" rel="noopener noreferrer">
            ${this._getValue(metadata.externalDocs, this.ns.aml.vocabularies.core.title) || 'Documentation'}
          </a>
        </div>
      ` : ''}
      
      ${metadata.deprecated ? html`
        <div class="metadata-item deprecated">
          <span class="metadata-label">Status:</span>
          <span class="deprecated-badge">Deprecated</span>
        </div>
      ` : ''}
      
      ${metadata.servers && Array.isArray(metadata.servers) && metadata.servers.length > 0 ? html`
        <div class="metadata-item">
          <span class="metadata-label">Servers:</span>
          <div class="server-list">
            ${metadata.servers.map(server => html`
              <div class="server-item">${this._getValue(server, this.ns.aml.vocabularies.core.url)}</div>
            `)}
          </div>
        </div>
      ` : ''}
    </div>
    `;
  }

  /**
   * Toggles metadata section
   */
  _toggleMetadata() {
    this.metadataOpened = !this.metadataOpened;
  }

  /**
   * Toggles full example display
   */
  _toggleFullExample(index, type) {
    // Implementation for showing full examples
    console.log(`Toggle full example ${index} for ${type}`);
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

  _computeAgentParametersByMethod(method) {
    if (!method) {
      return undefined;
    }

    const expect = this._computeExpects(method);
    if (!expect) {
      return undefined;
    }
    const payloads = this._computePayload(expect);
    if (!payloads || payloads.length === 0) {
      return undefined;
    }

    const ramlSchemaKey = this._getAmfKey(this.ns.aml.vocabularies.shapes.schema);
    const schema = payloads[0][ramlSchemaKey];
    if (!schema) {
      return undefined;
    }

    const agentObject = this._computeAgents(schema[0]);
    if (!agentObject) {
      return undefined;
    }
    const actionKey = this._getAmfKey(this.ns.aml.vocabularies.data.action);
    const action = agentObject[0][actionKey];
    if (!action) {
      return undefined;
    }
    const isUserInputKey = this._getAmfKey(this.ns.aml.vocabularies.data.isUserInput);
    const isUserInput = action[0][isUserInputKey];
    if (!isUserInput) {
      return undefined;
    }
    const isInputValue = this._getValue(isUserInput[0], this.ns.aml.vocabularies.data.value);

    const params = {
      isUserInput: isInputValue,
    };

    return params;
  }

  // ========== Enhanced gRPC and AMF Helper Methods ==========

  /**
   * Detects if an operation is a gRPC operation
   * @param {Object} operation AMF Operation model
   * @returns {boolean} True if it's a gRPC operation
   */
  isGrpcOp(operation) {
    if (!operation) {
      return false;
    }
    
    // Check method type for gRPC-specific methods
    const method = this._getValue(operation, this.ns.aml.vocabularies.apiContract.method);
    if (method && ['publish', 'subscribe', 'pubsub'].includes(method.toLowerCase())) {
      return true;
    }

    // Check request payload media type for application/grpc
    const expects = this._computeExpects(operation);
    if (expects) {
      const payloads = this.getPayloads(expects);
      if (payloads && payloads.length > 0) {
        const mediaType = this.getMediaType(payloads[0]);
        if (mediaType === 'application/grpc') {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Gets the gRPC stream type for an operation
   * @param {Object} operation AMF Operation model
   * @returns {string} Stream type: 'unary', 'client_streaming', 'server_streaming', 'bidi_streaming'
   */
  getGrpcStreamType(operation) {
    if (!operation) {
      return 'unary';
    }

    const method = this._getValue(operation, this.ns.aml.vocabularies.apiContract.method);
    if (!method) {
      return 'unary';
    }

    // Map gRPC methods to stream types
    switch (method.toLowerCase()) {
      case 'post':
        return 'unary'; // Standard unary RPC
      case 'publish':
        return 'client_streaming'; // Client sends stream
      case 'subscribe':
        return 'server_streaming'; // Server sends stream
      case 'pubsub':
        return 'bidi_streaming'; // Bidirectional streaming
      default:
        return 'unary';
    }
  }

  /**
   * Extracts payloads from a request or response node
   * @param {Object} node AMF Request or Response model
   * @returns {Array} Array of payload objects
   */
  getPayloads(node) {
    if (!node) {
      return [];
    }
    const payloads = this._ensureArray(this._getValue(node, this.ns.aml.vocabularies.apiContract.payload));
    return Array.isArray(payloads) ? payloads : [];
  }

  /**
   * Gets the media type from a payload
   * @param {Object} payload AMF Payload model
   * @returns {string|undefined} Media type string
   */
  getMediaType(payload) {
    if (!payload) {
      return undefined;
    }
    return this._getValue(payload, this.ns.aml.vocabularies.core.mediaType);
  }

  /**
   * Gets the schema name from a shape
   * @param {Object} shape AMF Shape model
   * @returns {string|undefined} Schema name
   */
  getSchemaName(shape) {
    if (!shape) {
      return undefined;
    }
    // Try w3 name first, then core name
    return this._getValue(shape, this.ns.w3.shacl.name) || 
           this._getValue(shape, this.ns.aml.vocabularies.core.name);
  }

  /**
   * Gets examples from a node (supports both single example and examples array)
   * @param {Object} node AMF node with examples
   * @returns {Array} Array of example objects
   */
  getExamples(node) {
    if (!node) {
      return [];
    }

    // Try examples array first
    const examples = this._ensureArray(this._getValue(node, this.ns.aml.vocabularies.core.examples));
    if (examples && Array.isArray(examples) && examples.length > 0) {
      return examples;
    }

    // Try single example
    const example = this._getValue(node, this.ns.aml.vocabularies.core.example);
    if (example) {
      return [example];
    }

    return [];
  }

  /**
   * Gets parameters from operation and endpoint (path, query, header, cookie)
   * @param {Object} operation AMF Operation model
   * @returns {Object} Grouped parameters by type
   */
  getParams(operation) {
    const params = {
      path: [],
      query: [],
      header: [],
      cookie: []
    };

    if (!operation) {
      return params;
    }

    // Get parameters from expects (request)
    const expects = this._computeExpects(operation);
    if (expects) {
      // Query parameters
      const queryParams = this._ensureArray(this._getValue(expects, this.ns.aml.vocabularies.apiContract.parameter));
      if (queryParams && Array.isArray(queryParams)) {
        queryParams.forEach(param => {
        const binding = this._getValue(param, this.ns.aml.vocabularies.apiBinding.binding);
        const paramType = binding ? binding.toLowerCase() : 'query';
        
        if (params[paramType]) {
          params[paramType].push(this._processParameter(param));
        }
        });
      }

      // Header parameters
      const headers = this._ensureArray(this._getValue(expects, this.ns.aml.vocabularies.apiContract.header));
      if (headers && Array.isArray(headers)) {
        headers.forEach(header => {
          params.header.push(this._processParameter(header));
        });
      }
    }

    // Get path parameters from endpoint
    if (this.endpoint) {
      const pathParams = this._ensureArray(this._getValue(this.endpoint, this.ns.aml.vocabularies.apiContract.parameter));
      if (pathParams && Array.isArray(pathParams)) {
        pathParams.forEach(param => {
          params.path.push(this._processParameter(param));
        });
      }
    }

    return params;
  }

  /**
   * Processes a parameter to extract relevant information
   * @param {Object} param AMF Parameter model
   * @returns {Object} Processed parameter info
   */
  _processParameter(param) {
    if (!param) {
      return {};
    }

    const name = this._getValue(param, this.ns.aml.vocabularies.core.name);
    const required = this._getValue(param, this.ns.aml.vocabularies.apiContract.required);
    const schema = this._getValue(param, this.ns.aml.vocabularies.shapes.schema);
    const description = this._getValue(param, this.ns.aml.vocabularies.core.description);
    
    let type = 'string';
    let defaultValue;
    let examples = [];

    if (schema) {
      const schemaArray = this._ensureArray(schema);
      if (schemaArray.length > 0) {
        const schemaObj = schemaArray[0];
        const dataType = this._getValue(schemaObj, this.ns.w3.shacl.datatype);
        if (dataType) {
          // Extract type from XML Schema URI
          type = dataType.split('#').pop() || 'string';
        }
        
        defaultValue = this._getValue(schemaObj, this.ns.w3.shacl.defaultValue);
        examples = this.getExamples(schemaObj);
      }
    }

    return {
      name,
      type,
      required: Boolean(required),
      defaultValue,
      description,
      examples: examples.map(ex => this._getValue(ex, this.ns.aml.vocabularies.core.value)).filter(Boolean)
    };
  }

  /**
   * Gets security requirements for operation with fallback to API level
   * @param {Object} operation AMF Operation model
   * @returns {Array} Array of security requirements
   */
  getSecurityRequirements(operation) {
    if (!operation) {
      return [];
    }

    // Try operation-level security first
    let security = this._computeSecurity(operation);
    
    // Fallback to server/API level security
    if (!security || security.length === 0) {
      security = this._computeSecurity(this.server) || this._computeSecurity(this.amf);
    }

    return this._ensureArray(security);
  }

  /**
   * Compacts a value using AMF key resolution
   * @param {Object} node AMF node
   * @param {string} key Property key
   * @returns {*} Compacted value
   */
  compactValue(node, key) {
    if (!node || !key) {
      return undefined;
    }
    return this._getValue(node, this._getAmfKey(key));
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

  /**
   * Generates gRPC JSON example from payload schema
   * @param {Object} payload AMF Payload model
   * @returns {Object} Generated example with JSON and grpcurl command
   */
  generateGrpcExample(payload) {
    if (!payload) {
      return { json: '{}', grpcurl: '' };
    }

    const schema = this._getValue(payload, this.ns.aml.vocabularies.shapes.schema);
    if (!schema) {
      return { json: '{}', grpcurl: '' };
    }

    // Generate JSON example from schema
    const jsonExample = this._generateJsonFromSchema(schema);
    
    // Get service and method name for grpcurl
    const serviceName = this._getServiceName();
    const methodName = this._getMethodName();
    const serverUrl = this._getGrpcServerUrl();
    
    const grpcurlCommand = `grpcurl -plaintext -d '${JSON.stringify(jsonExample)}' ${serverUrl} ${serviceName}.${methodName}`;
    
    return {
      json: JSON.stringify(jsonExample, null, 2),
      grpcurl: grpcurlCommand
    };
  }

  /**
   * Generates JSON example from AMF schema
   * @param {Object} schema AMF Shape model
   * @returns {Object} Generated JSON object
   */
  _generateJsonFromSchema(schema) {
    if (!schema) {
      return {};
    }

    // Resolve schema if it's a link
    const resolvedSchema = this._resolveSchemaLink(schema);
    if (!resolvedSchema) {
      return {};
    }

    const properties = this._ensureArray(this._getValue(resolvedSchema, this.ns.w3.shacl.property));
    if (!properties || !Array.isArray(properties)) {
      return {};
    }

    const example = {};
    
    properties.forEach(property => {
      const name = this._getValue(property, this.ns.w3.shacl.name) || 
                   this._getValue(property, this.ns.aml.vocabularies.core.name);
      const range = this._getValue(property, this.ns.aml.vocabularies.shapes.range);
      
      if (name) {
        example[name] = this._getExampleValueFromRange(range, name);
      }
    });

    return example;
  }

  /**
   * Gets example value based on data type
   * @param {string} dataType Schema data type
   * @param {string} fieldName Field name for context
   * @returns {any} Example value
   */
  _getExampleValueForType(dataType, fieldName) {
    if (!dataType) {
      return fieldName.toLowerCase().includes('name') ? 'example' : 'value';
    }

    const typeStr = dataType.toString().toLowerCase();
    
    if (typeStr.includes('string')) {
      if (fieldName.toLowerCase().includes('name')) return 'world';
      if (fieldName.toLowerCase().includes('message')) return 'Hello World!';
      if (fieldName.toLowerCase().includes('email')) return 'user@example.com';
      return 'example';
    }
    
    if (typeStr.includes('int') || typeStr.includes('number')) {
      return 42;
    }
    
    if (typeStr.includes('bool')) {
      return true;
    }
    
    if (typeStr.includes('array')) {
      return ['item1', 'item2'];
    }
    
    return 'value';
  }

  /**
   * Gets gRPC service name from current endpoint
   * @returns {string} Service name
   */
  _getServiceName() {
    if (this.endpoint) {
      const serviceName = this._getValue(this.endpoint, this.ns.aml.vocabularies.core.name);
      if (serviceName) {
        return serviceName;
      }
    }
    return 'greeter';
  }

  /**
   * Gets gRPC method name from current method
   * @returns {string} Method name
   */
  _getMethodName() {
    if (this.method) {
      const methodName = this._getValue(this.method, this.ns.aml.vocabularies.core.name);
      if (methodName) {
        return methodName;
      }
    }
    return 'SayHello';
  }

  /**
   * Gets gRPC server URL
   * @returns {string} Server URL
   */
  _getGrpcServerUrl() {
    // Try to get server from AMF model
    if (this.amf) {
      const servers = this._ensureArray(this._getValue(this.amf, this.ns.aml.vocabularies.apiContract.server));
      if (servers && Array.isArray(servers) && servers.length > 0) {
        const serverUrl = this._getValue(servers[0], this.ns.aml.vocabularies.core.url);
        if (serverUrl) {
          return serverUrl;
        }
      }
    }
    
    // Default gRPC server
    return 'localhost:50051';
  }

  /**
   * Checks if current API is gRPC
   * @returns {boolean} True if gRPC API
   */
  isGrpcApi() {
    return this.isGrpcOp(this.method);
  }

  /**
   * Resolves schema link to actual schema definition
   * @param {Object} schema AMF Schema that might be a link
   * @returns {Object} Resolved schema or original if not a link
   */
  _resolveSchemaLink(schema) {
    if (!schema) {
      return null;
    }

    // Check if this schema has a link-target (reference to another schema)
    const linkTarget = this._getValue(schema, this.ns.aml.vocabularies.document.linkTarget);
    if (linkTarget) {
      // Find the actual schema definition in the AMF model
      return this._findSchemaById(linkTarget['@id'] || linkTarget);
    }

    return schema;
  }

  /**
   * Finds schema definition by ID in the AMF model
   * @param {string} schemaId The ID of the schema to find
   * @returns {Object} Schema definition or null if not found
   */
  _findSchemaById(schemaId) {
    if (!this.amf || !schemaId) {
      return null;
    }

    // Look through all documents in the AMF model
    const documents = Array.isArray(this.amf) ? this.amf : [this.amf];
    
    for (const doc of documents) {
      // Check declares section
      const declares = this._ensureArray(this._getValue(doc, this.ns.aml.vocabularies.document.declares));
      if (declares && Array.isArray(declares)) {
        for (const declaration of declares) {
          if (declaration['@id'] === schemaId) {
            return declaration;
          }
        }
      }

      // Check references section
      const references = this._ensureArray(this._getValue(doc, this.ns.aml.vocabularies.document.references));
      if (references && Array.isArray(references)) {
        for (const reference of references) {
          const found = this._findSchemaById(schemaId);
          if (found) return found;
        }
      }
    }

    return null;
  }

  /**
   * Gets example value from range (handles arrays, scalars, etc.)
   * @param {Object} range AMF Range object
   * @param {string} fieldName Field name for context
   * @returns {any} Example value
   */
  _getExampleValueFromRange(range, fieldName) {
    if (!range) {
      return this._getExampleValueForType(null, fieldName);
    }

    // Check if it's an array
    if (this._hasType(range, 'http://a.ml/vocabularies/shapes#ArrayShape')) {
      const items = this._getValue(range, this.ns.aml.vocabularies.shapes.items);
      if (items) {
        const itemValue = this._getExampleValueFromRange(items, fieldName);
        return [itemValue];
      }
      return [];
    }

    // Check if it's a scalar
    if (this._hasType(range, 'http://a.ml/vocabularies/shapes#ScalarShape')) {
      const dataType = this._getValue(range, this.ns.w3.shacl.datatype);
      if (dataType) {
        return this._getExampleValueForType(dataType['@id'] || dataType, fieldName);
      }
    }

    // Fallback to default value based on field name
    return this._getExampleValueForType(null, fieldName);
  }

  /**
   * Checks if an object has a specific type
   * @param {Object} obj AMF object
   * @param {string} type Type URI to check
   * @returns {boolean} True if object has the type
   */
  _hasType(obj, type) {
    if (!obj || !obj['@type']) {
      return false;
    }
    const types = Array.isArray(obj['@type']) ? obj['@type'] : [obj['@type']];
    return types.includes(type);
  }

  /**
   * Generates gRPC examples for request and response
   * @returns {Object} Generated gRPC examples
   */
  _generateGrpcExamples() {
    const expects = this._computeExpects(this.method);
    const returns = this._computeReturns(this.method);
    
    let requestExample = null;
    let responseExample = null;
    
    // Generate request example
    if (expects) {
      const requestPayloads = this.getPayloads(expects);
      if (requestPayloads && requestPayloads.length > 0) {
        requestExample = this.generateGrpcExample(requestPayloads[0]);
      }
    }
    
    // Generate response example
    if (returns && returns.length > 0) {
      const responsePayloads = this.getPayloads(returns[0]);
      if (responsePayloads && responsePayloads.length > 0) {
        responseExample = this.generateGrpcExample(responsePayloads[0]);
      }
    }
    
    return {
      request: requestExample,
      response: responseExample
    };
  }

  /**
   * Gets gRPC examples template
   * @param {Object} grpcExamples Generated gRPC examples
   * @returns {import('lit-html').TemplateResult} Template for gRPC examples
   */
  _getGrpcExamplesTemplate(grpcExamples) {
    const serviceName = this._getServiceName();
    const methodName = this._getMethodName();
    const serverUrl = this._getGrpcServerUrl();
    
    return html`
    <div class="grpc-examples">
      <div class="heading3">gRPC Examples</div>
      
      ${grpcExamples.request ? html`
        <div class="example-section">
          <div class="heading4">Request JSON (Proto3)</div>
          <div class="example-snippet">
            <pre><code>${grpcExamples.request.json}</code></pre>
            <clipboard-copy .content="${grpcExamples.request.json}"></clipboard-copy>
          </div>
        </div>
        
        <div class="example-section">
          <div class="heading4">grpcurl Command</div>
          <div class="example-snippet grpcurl-command">
            <pre><code>${grpcExamples.request.grpcurl}</code></pre>
            <clipboard-copy .content="${grpcExamples.request.grpcurl}"></clipboard-copy>
          </div>
        </div>
      ` : ''}
      
      ${grpcExamples.response ? html`
        <div class="example-section">
          <div class="heading4">Response JSON (Proto3)</div>
          <div class="example-snippet">
            <pre><code>${grpcExamples.response.json}</code></pre>
            <clipboard-copy .content="${grpcExamples.response.json}"></clipboard-copy>
          </div>
        </div>
      ` : ''}
      
      <div class="server-info">
        <div class="heading4">Server Information</div>
        <div class="server-details">
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Method:</strong> ${methodName}</p>
          <p><strong>Server:</strong> ${serverUrl}</p>
        </div>
      </div>
    </div>
    `;
  }
}
