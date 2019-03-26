import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {afterNextRender} from '../../@polymer/polymer/lib/utils/render-status.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import {AmfHelperMixin} from '../../@api-components/amf-helper-mixin/amf-helper-mixin.js';
import '../../@polymer/polymer/lib/elements/dom-if.js';
import '../../@polymer/polymer/lib/elements/dom-repeat.js';
import '../../@api-components/raml-aware/raml-aware.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@api-components/api-annotation-document/api-annotation-document.js';
import '../../@api-components/api-body-document/api-body-document.js';
import '../../@api-components/api-parameters-document/api-parameters-document.js';
import '../../@api-components/api-headers-document/api-headers-document.js';
import '../../@api-components/api-responses-document/api-responses-document.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@advanced-rest-client/markdown-styles/markdown-styles.js';
import '../../@polymer/marked-element/marked-element.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@advanced-rest-client/http-code-snippets/http-code-snippets.js';
import '../../@advanced-rest-client/clipboard-copy/clipboard-copy.js';
import '../../@polymer/iron-collapse/iron-collapse.js';
import '../../@polymer/iron-icon/iron-icon.js';
import '../../@api-components/api-security-documentation/api-security-documentation.js';
import '../../@api-components/api-example-generator/api-example-generator.js';
import '../../@api-components/http-method-label/http-method-label-common-styles.js';
/**
 * `api-method-documentation`
 *
 * Renders documentation for a method for an endpoint.
 *
 * This element works with [AMF](https://github.com/mulesoft/amf) data model.
 * To properly compute all the information relevant to method documentation
 * set the following properties:
 *
 * - amfModel - as AMF's WebApi data model
 * - endpoint - As AMF's EndPoint data model
 * - method - As AMF's SupportedOperation property
 *
 * When set, this will automatically populate the wiew with data.
 *
 * ## Updating API's base URI
 *
 * By default the component render the documentation as it is defined
 * in the AMF model. Sometimes, however, you may need to replace the base URI
 * of the API with something else. It is useful when the API does not
 * have base URI property defined (therefore this component render relative
 * paths instead of URIs) or when you want to manage different environments.
 *
 * To update base URI value either update `baseUri` property or use
 * `iron-meta` with key `ApiBaseUri`. First method is easier but the second
 * gives much more flexibility since it use a
 * [monostate pattern](http://wiki.c2.com/?MonostatePattern)
 * to manage base URI property.
 *
 * When the component constructs the funal URI for the endpoint it does the
 * following:
 * - if `baseUri` is set it uses this value as a base uri for the endpoint
 * - else if `iron-meta` with key `ApiBaseUri` exists and contains a value
 * it uses it uses this value as a base uri for the endpoint
 * - else if `amfModel` is set then it computes base uri value from main
 * model document
 * Then it concatenates computed base URI with `endpoint`'s path property.
 *
 * ### Example
 *
 * ```html
 * <iron-meta key="ApiBaseUri" value="https://domain.com"></iron-meta>
 * ```
 *
 * To update value of the `iron-meta`:
 * ```javascript
 * new Polymer.IronMeta({key: 'ApiBaseUri'}).value = 'https://other.domain';
 * ```
 *
 * Note: The element will not get notified about the change in `iron-meta`.
 * The change will be reflected whehn `amfModel` or `endpoint` property chnage.
 *
 * ## Styling
 *
 * `<api-method-documentation>` provides the following custom properties and
 * mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--api-method-documentation` | Mixin applied to this elment | `{}`
 * `--arc-font-headline` | Theme mixin, Applied to H1 element | `{}`
 * `--api-method-documentation-title` | Mixin applied to the H1 element | `{}`
 * `--api-method-documentation-title-narrow` | Mixin applied to the H1 element
 * in narrow layout | `{}`
 * `--arc-font-title` | Theme mixin, applied to h2 element | `{}`
 * `--api-method-documentation-main-section-title` | Mixin applied to main
 * sections title element (reqyest and response) | `{}`
 * `--api-method-documentation-main-section-title-narrow` | Mixin applied to
 * main sections title element (reqyest and response) in narrow layout | `{}`
 * `--api-method-documentation-subsection-title` | Mixin applied to sub section
 * titles | `{}`
 * `--api-method-documentation-subsection-title-narrow` | Mixin applied to
 * sub section titles in narrow layout | `{}`
 * `--api-method-documentation-title-method-font-weight` | Font weight of method name title. | `500`
 * `--arc-font-code1` | Theme mixin, applied to the URL area | `{}`
 * `--api-method-documentation-url-font-size` | Font size of endpoin URL | `16px`
 * `--api-method-documentation-url-background-color` | Background color of
 * the URL section | `#424242`
 * `--api-method-documentation-url-font-color` | Font color of the URL area | `#fff`
 * `--api-method-documentation-try-it-background-color` | Background color
 * of the Try it button | `--primary-color`
 * `--api-method-documentation-try-it-color` | Color of the Try it button |
 * `--primary-action-color` or `#fff`
 * `--api-method-documentation-try-it-background-color-hover` | Background
 * color of the Try it button when hovered | `--primary-color`
 * `--api-method-documentation-try-it-color-hover` | Color of the Try it
 * button when hovered | `--primary-action-color` or `#fff`
 * `--api-method-documentation-bottom-navigation-border-color` | Color of
 * the top border of the bottom navigartion | `#546E7A`
 * `--api-method-documentation-bottom-navigation-color` | Color of of the
 * bottom navigartion (icon + text) | `#546E7A`
 * `--api-method-documentation-main-sections` | Mixin applied to both request
 * and response sections | `{}`
 * `--api-method-documentation-docs-sections` | Mixin applied to each
 * documentation block | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin AmfHelperMixin
 */
class ApiMethodDocumentation extends AmfHelperMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="markdown-styles"></style>
    <style include="http-method-label-common-styles"></style>
    <style>
    :host {
      display: block;
      padding-bottom: 24px;
      @apply --arc-font-body1;
      @apply --api-method-documentation;

      --tmp-font-title: {
        @apply --arc-font-title;
      };
    }

    [hidden] {
      display: none !important;
    }

    h1 {
      @apply --arc-font-headline;
      font-weight: var(--api-method-documentation-title-method-font-weight, 500);
      text-transform: capitalize;
      @apply --api-method-documentation-title;
    }

    h2 {
      @apply --arc-font-title;
      @apply --api-method-documentation-main-section-title;
    }

    h3 {
      @apply --layout-flex;
      @apply --arc-font-title;
      @apply --api-method-documentation-subsection-title;
    }

    .title-area {
      @apply --layout-horizontal;
      @apply --layout-center;
    }

    :host([narrow]) .title-area {
      margin-bottom: 24px;
    }

    :host([narrow]) .title-area {
      margin-top: 12px;
    }

    :host([narrow]) h1 {
      font-size: 20px;
      margin: 0;
      @apply --api-method-documentation-title-narrow;
    }

    :host([narrow]) h2 {
      font-size: 18px;
      @apply --api-method-documentation-main-section-title-narrow;
    }

    :host([narrow]) h3 {
      font-size: 17px;
      @apply --api-method-documentation-subsection-title-narrow;
    }

    .title {
      @apply --layout-flex;
    }

    .url-area {
      @apply --layout-flex;
      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --arc-font-code1;
      font-size: var(--api-method-documentation-url-font-size, 16px);
      margin-bottom: 40px;
      margin-top: 20px;
      background: var(--api-method-documentation-url-background-color, #424242);
      color: var(--api-method-documentation-url-font-color, #fff);
      padding: 8px;
      border-radius: 4px;
      position: relative;
    }

    .section-title-area {
      @apply --layout-horizontal;
      @apply --layout-center;
      border-bottom: 1px var(--api-parameters-document-title-border-color, #e5e5e5) solid;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .toggle-button {
      outline: none;
      color: var(--api-method-document-toggle-view-color,
        var(--arc-toggle-view-icon-color, rgba(0, 0, 0, 0.74)));
      transition: color 0.25s ease-in-out;
      @apply --toggle-button;
    }

    .toggle-button:hover {
      color: var(--api-method-document-toggle-view-hover-color,
        var(--arc-toggle-view-icon-hover-color, rgba(0, 0, 0, 0.88)));
      @apply --toggle-button-hover;
    }

    .url-value {
      @apply --layout-flex;
      margin-left: 12px;
      word-break: break-all;
    }

    .method-value {
      text-transform: uppercase;
      white-space: nowrap;
    }

    .toggle-icon {
      margin-left: 8px;
      transform: rotateZ(0deg);
      transition: transform 0.3s ease-in-out;
    }

    .toggle-icon.opened {
      transform: rotateZ(-180deg);
    }

    http-code-snippets {
      margin-bottom: 40px;
    }

    .action-button {
      background-color: var(--api-method-documentation-try-it-background-color, var(--primary-color));
      color: var(--api-method-documentation-try-it-color, var(--primary-action-color, #fff));
    }

    .action-button:hover {
      background-color: var(--api-method-documentation-try-it-background-color-hover, var(--primary-color));
      color: var(--api-method-documentation-try-it-color-hover, var(--primary-action-color, #fff));
    }

    .bottom.action {
      @apply --layout-horizontal;
      @apply --layout-end-justified;
      margin-top: 20px;
    }

    marked-element {
      margin: 12px 0;
    }

    .markdown-body {
      @apply --arc-font-body1;
      margin-bottom: 28px;
      color: var(--api-method-documentation-descxription-color, rgba(0, 0, 0, 0.74));
    }

    .method-label {
      margin-bottom: 0;
    }

    .bottom-nav,
    .bottom-link {
      @apply --layout-horizontal;
      @apply --layout-center;
    }

    .bottom-nav {
      padding: 32px 0;
      margin: 16px 0;
      border-top: 1px var(--api-method-documentation-bottom-navigation-border-color, #cfd8dc) solid;
      color: var(--api-method-documentation-bottom-navigation-color, #000);
      font-size: 18px;
    }

    .bottom-link {
      cursor: pointer;
      max-width: 50%;
      word-break: break-all;
    }

    .bottom-link.previous {
      margin-right: 12px;
    }

    .bottom-link.next {
      margin-left: 12px;
    }

    .nav-separator {
      @apply --layout-flex;
    }

    api-security-documentation {
      --arc-font-display1: {
        @apply --arc-font-title;
      };
      --arc-font-title: {
        @apply --tmp-font-title;
        font-size: larger;
      };

      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px var(--api-headers-document-title-border-color, #e5e5e5) dashed;
    }

    api-security-documentation:last-of-type {
      margin-bottom: 0;
      border-bottom: none;
      padding-bottom: 0;
    }

    .request-documentation,
    .response-documentation {
      @apply --api-method-documentation-main-sections;
    }

    .snippets,
    .security,
    api-parameters-document,
    api-headers-document,
    api-body-document,
    .response-documentation {
      @apply --api-method-documentation-docs-sections;
    }

    .extensions {
      font-style: italic;
      margin: 12px 0;
    }
    </style>
    <template is="dom-if" if="[[aware]]">
      <raml-aware raml="{{amfModel}}" scope="[[aware]]"></raml-aware>
    </template>

    <div class="title-area" hidden\$="[[_titleHidden(methodName, httpMethod, noTryIt)]]">
      <h1 class="title">[[methodName]]</h1>
      <template is="dom-if" if="[[!noTryIt]]">
        <div class="action">
          <paper-button class="action-button" on-click="_tryIt" raised="">Try it</paper-button>
        </div>
      </template>
    </div>

    <section class="url-area">
      <div class="method-value"><span class="method-label" data-method\$="[[httpMethod]]">[[httpMethod]]</span></div>
      <div class="url-value">[[endpointUri]]</div>
      <paper-icon-button class="action-icon copy-icon" icon="arc:content-copy"
        on-click="_copyUrlClipboard" title="Copy URL to clipboard"></paper-icon-button>
    </section>
    <clipboard-copy id="urlCopy" content="[[endpointUri]]"></clipboard-copy>

    <template is="dom-if" if="[[hasTraits]]">
      <section class="extensions">
        <span>Mixes in
        <span class="trait-name">[[_computeTraitNames(traits)]]</span>.
      </span></section>
    </template>

    <template is="dom-if" if="[[hasCustomProperties]]">
      <api-annotation-document shape="[[method]]"></api-annotation-document>
    </template>

    <template is="dom-if" if="[[description]]">
      <marked-element markdown="[[description]]">
        <div slot="markdown-html" class="markdown-body"></div>
      </marked-element>
    </template>

    <section class="request-documentation">
      <template is="dom-if" if="[[renderCodeSnippets]]" restamp="true">
        <section class="snippets">
          <div class="section-title-area" on-click="_toggleSnippets" title="Toogle code example details">
            <h3 class="table-title">Code examples</h3>
            <div class="title-area-actions">
              <paper-button class="toggle-button">
                [[_computeToggleActionLabel(snippetsOpened)]]
                <iron-icon icon="arc:expand-more" class\$="[[_computeToggleIconClass(snippetsOpened)]]"></iron-icon>
              </paper-button>
            </div>
          </div>
          <iron-collapse id="snippetsCollapse" on-transitionend="_snippetsTransitionEnd">
            <template is="dom-if" id="snippetsCondition" restamp="">
              <http-code-snippets url="[[endpointUri]]" method="[[httpMethod]]"
                headers="[[_computeSnippetsHeaders(headers)]]"
                payload="[[_computeSnippetsPayload(payload)]]"></http-code-snippets>
            </template>
          </iron-collapse>
        </section>
      </template>

      <template is="dom-if" if="[[renderSecurity]]" restamp="">
        <template is="dom-if" if="[[hasSecurity]]" restamp="">
          <section class="security">
            <div class="section-title-area" on-click="_toggleSecurity" title="Toogle security details">
              <h3 class="table-title">Security</h3>
              <div class="title-area-actions">
                <paper-button class="toggle-button security">
                  [[_computeToggleActionLabel(securityOpened)]]
                  <iron-icon icon="arc:expand-more" class\$="[[_computeToggleIconClass(securityOpened)]]"></iron-icon>
                </paper-button>
              </div>
            </div>
            <iron-collapse opened="[[securityOpened]]">
              <template is="dom-repeat" items="[[security]]">
                <api-security-documentation amf-model="[[amfModel]]"
                  security="[[item]]" narrow="[[narrow]]"></api-security-documentation>
              </template>
            </iron-collapse>
          </section>
        </template>
      </template>

      <template is="dom-if" if="[[hasParameters]]">
        <api-parameters-document amf-model="[[amfModel]]" query-opened=""
          path-opened="" base-uri-parameters="[[serverVariables]]"
          endpoint-parameters="[[endpointVariables]]" query-parameters="[[queryParameters]]"
          narrow="[[narrow]]"></api-parameters-document>
      </template>

      <template is="dom-if" if="[[hasHeaders]]">
        <api-headers-document opened="" amf-model="[[amfModel]]" headers="[[headers]]"
          narrow="[[narrow]]"></api-headers-document>
      </template>

      <template is="dom-if" if="[[hasPayload]]">
        <api-body-document amf-model="[[amfModel]]" body="[[payload]]" narrow="[[narrow]]"
          opened=""></api-body-document>
      </template>
    </section>

    <template is="dom-if" if="[[hasReturns]]">
      <section class="response-documentation">
        <h2>Response</h2>
        <api-responses-document amf-model="[[amfModel]]" returns="[[returns]]"
          narrow="[[narrow]]"></api-responses-document>
      </section>
    </template>

    <template is="dom-if" if="[[hasPagination]]">
      <section class="bottom-nav">
        <template is="dom-if" if="[[hasPreviousLink]]">
          <div class="bottom-link previous" on-click="_navigatePrevious">
            <paper-icon-button icon="arc:chevron-left"></paper-icon-button>
            <span class="nav-label">[[previous.label]]</span>
          </div>
        </template>
        <div class="nav-separator"></div>
        <template is="dom-if" if="[[hasNextLink]]">
          <div class="bottom-link next" on-click="_navigateNext">
            <span class="nav-label">[[next.label]]</span>
            <paper-icon-button icon="arc:chevron-right"></paper-icon-button>
          </div>
        </template>
      </section>
    </template>
    <api-example-generator amf-model="[[amfModel]]" id="exampleGenerator"></api-example-generator>
`;
  }

  static get is() {
    return 'api-method-documentation';
  }
  static get properties() {
    return {
      /**
       * `raml-aware` scope property to use.
       */
      aware: String,
      /**
       * Generated AMF json/ld model form the API spec.
       * The element assumes the object of the first array item to be a
       * type of `"http://raml.org/vocabularies/document#Document`
       * on AMF vocabulary.
       *
       * It is only usefult for the element to resolve references.
       *
       * @type {Object|Array}
       */
      amfModel: Object,
      /**
       * AMF method definition as a `http://www.w3.org/ns/hydra/core#supportedOperation`
       * object.
       */
      method: Object,
      /**
       * Method's endpoint definition as a
       * `http://raml.org/vocabularies/http#endpoint` of AMF model.
       */
      endpoint: Object,
      /**
       * The try it button is not rendered when set.
       */
      noTryIt: {
        type: Boolean,
        value: false
      },
      /**
       * Computed value from the method model, name of the method.
       * It is either a `displayName` or HTTP method name
       */
      methodName: {
        type: String,
        computed: '_computeMethodName(method)'
      },
      /**
       * HTTP method name string.
       *
       * It is computed from `endpoint`.
       */
      httpMethod: {
        type: String,
        computed: '_computeHttpMethod(method)'
      },
      /**
       * A property to set to override AMF's model base URI information.
       * When this property is set, the `endpointUri` property is recalculated.
       */
      baseUri: String,
      /**
       * Computed value, API version name
       */
      apiVersion: {
        type: String,
        computed: '_computeApiVersion(amfModel)'
      },
      /**
       * Endpoint URI to display in main URL field.
       * This value is computed when `amfModel`, `endpoint` or `baseUri` change.
       */
      endpointUri: {
        type: String,
        computed: '_computeEndpointUri(server, endpoint, baseUri, apiVersion)'
      },
      /**
       * Computed value of method description from `method` property.
       */
      description: {
        type: String,
        computed: '_computeDescription(method)'
      },
      /**
       * Computed value from current `method`. True if the model contains
       * custom properties (annotations in RAML).
       */
      hasCustomProperties: {
        type: Boolean,
        computed: '_computeHasCustomProperties(method)'
      },
      /**
       * Computed value of `http://www.w3.org/ns/hydra/core#expects`
       * of AMF model from current `method`
       */
      expects: {
        type: Object,
        computed: '_computeExpects(method)'
      },
      /**
       * Computed value of the `http://raml.org/vocabularies/http#server`
       * from `amfModel`
       */
      server: {
        type: Object,
        computed: '_computeServer(amfModel)'
      },
      /**
       * API base URI parameters defined in AMF api model
       *
       * @type {Array|undefined}
       */
      serverVariables: {
        type: Array,
        computed: '_computeServerVariables(server)'
      },
      /**
       * Endpoint's path parameters.
       *
       * @type {Array|undefined}
       */
      endpointVariables: {
        type: Array,
        computed: '_computeEndpointVariables(endpoint)'
      },
      /**
       * Computed value if server and endpoint definition of API model has
       * defined any variables.
       */
      hasPathParameters: {
        type: Boolean,
        computed: '_computeHasPathParameters(serverVariables, endpointVariables)'
      },
      /**
       * Computed value of method's query parameters.
       */
      queryParameters: {
        type: Array,
        computed: '_computeQueryParameters(expects)'
      },
      /**
       * Computed value if server definition of API model has defined
       * variables.
       */
      hasQueryParameters: {
        type: Boolean,
        computed: '_computeHasArrayValue(queryParameters)'
      },
      /**
       * Computed value, true when either has path or query parameters.
       * This renders `api-parameters-document` if true.
       */
      hasParameters: {
        type: Boolean,
        computed: '_computeHasParameters(hasQueryParameters, hasPathParameters)'
      },
      /**
       * Computed value of AMF payload definition from `expects`
       * property.
       */
      payload: {
        type: Object,
        computed: '_computePayload(expects)'
      },
      /**
       * Computed value, true if `payload` has values.
       */
      hasPayload: {
        type: Boolean,
        computed: '_computeHasArrayValue(payload)'
      },
      /**
       * Computed value of AMF payload definition from `expects`
       * property.
       */
      headers: {
        type: Object,
        computed: '_computeHeaders(expects)'
      },
      /**
       * Computed value, true if `payload` has values.
       */
      hasHeaders: {
        type: Boolean,
        computed: '_computeHasArrayValue(headers)'
      },
      /**
       * Computed value of AMF response definition from `returns`
       * property.
       */
      returns: {
        type: Object,
        computed: '_computeReturns(method)'
      },
      /**
       * Computed value, true if `returns` has values.
       */
      hasReturns: {
        type: Boolean,
        computed: '_computeHasArrayValue(returns)'
      },
      /**
       * Computed value of AMF security definition from `method`
       * property.
       */
      security: {
        type: Object,
        computed: '_computeSecurity(method)'
      },
      /**
       * Computed value, true if `returns` has values.
       */
      hasSecurity: {
        type: Boolean,
        computed: '_computeHasArrayValue(security)'
      },
      /**
       * If set it will renders the view in the narrow layout.
       */
      narrow: {
        type: Boolean,
        reflectToAttribute: true
      },
      /**
       * Model to generate a link to previous HTTP method.
       * It should contain `id` and `label` properties
       */
      previous: Object,
      /**
       * Computed value, true if `previous` is set
       */
      hasPreviousLink: {
        type: Boolean,
        computed: '_computeHasPreviousLink(previous)'
      },
      /**
       * Model to generate a link to next HTTP method.
       * It should contain `id` and `label` properties
       */
      next: Object,
      /**
       * Computed value, true if `next` is set
       */
      hasNextLink: {
        type: Boolean,
        computed: '_computeHasNextLink(next)'
      },
      /**
       * Computed value, true to render bottom navigation
       */
      hasPagination: {
        type: Boolean,
        computed: '_computeHasNavigation(hasPreviousLink, hasNextLink)'
      },
      /**
       * When set code snippets are rendered.
       */
      snippetsOpened: {
        type: Boolean,
        value: false,
        observer: '_snippetsOpenedChanegd'
      },
      /**
       * When set security details are rendered.
       */
      securityOpened: {
        type: Boolean,
        value: false
      },
      /**
       * When set it renders code examples section is the documentation
       */
      renderCodeSnippets: Boolean,

      /**
       * When set it renders security documentation when applicable
       */
      renderSecurity: Boolean,
      /**
       * List of traits and resource types, if any.
       *
       * @type {Array<Object>}
       */
      extendsTypes: {
        type: Array,
        computed: '_computeExtends(method)'
      },
      /**
       * List of traits appied to this endpoint
       *
       * @type {Array<Object>}
       */
      traits: {
        type: Array,
        computed: '_computeTraits(extendsTypes)'
      },
      /**
       * Computed value, true if the endpoint has traits.
       */
      hasTraits: {
        type: Boolean,
        computed: '_computeHasArrayValue(traits)'
      }
    };
  }
  /**
   * Computes value for `methodName` property.
   * It is either a `http://schema.org/name` or HTTP method name
   *
   * @param {Object} method AMF `supportedOperation` model
   * @return {String|undefined} Method friendly name
   */
  _computeMethodName(method) {
    let name = this._getValue(method, this.ns.schema.schemaName);
    if (!name) {
      name = this._getValue(method, this.ns.w3.hydra.core + 'method');
    }
    return name;
  }
  /**
   * Computes value for `httpMethod` property.
   *
   * @param {Object} method AMF `supportedOperation` model
   * @return {String|undefined} HTTP method name
   */
  _computeHttpMethod(method) {
    let name = this._getValue(method, this.ns.w3.hydra.core + 'method');
    if (name) {
      name = name.toUpperCase();
    }
    return name;
  }
  /**
   * Computes value for `hasPathParameters` property
   *
   * @param {?Array} sVars Current value of `serverVariables` property
   * @param {?Array} eVars Current value of `endpointVariables` property
   * @return {Boolean}
   */
  _computeHasPathParameters(sVars, eVars) {
    return !!((sVars && sVars.length) || (eVars && eVars.length));
  }
  /**
   * Computes value for `hasParameters` property.
   *
   * @param {Boolean} hasPath
   * @param {Boolean} hasQuery
   * @return {Boolean} True if any argument is true
   */
  _computeHasParameters(hasPath, hasQuery) {
    return !!(hasPath || hasQuery);
  }
  /**
   * "Try it" button click handler. Dispatches `tryit-requested` custom event
   */
  _tryIt() {
    const id = this.method['@id'];
    this.dispatchEvent(new CustomEvent('tryit-requested', {
      bubbles: true,
      composed: true,
      detail: {
        id
      }
    }));
  }
  /**
   * Computes value for `hasPreviousLink` property
   * @param {?Object} previous
   * @return {Boolean}
   */
  _computeHasPreviousLink(previous) {
    return !!previous;
  }
  /**
   * Computes value for `hasNextLink` property
   * @param {?Object} next
   * @return {Boolean}
   */
  _computeHasNextLink(next) {
    return !!next;
  }
  /**
   * Computes value for `hasPagination` property
   * @param {Boolean} previous
   * @param {Boolean} next
   * @return {Boolean}
   */
  _computeHasNavigation(previous, next) {
    return !!(previous || next);
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
        type: type
      }
    });
    this.dispatchEvent(e);
  }

  _copyUrlClipboard(e) {
    const button = e.localTarget || e.target;
    if (this.$.urlCopy.copy()) {
      button.icon = 'arc:done';
    } else {
      button.icon = 'arc:error';
    }
    setTimeout(() => {
      button.icon = 'arc:content-copy';
    }, 1000);
  }
  /**
   * Toggles code snippets section.
   */
  _toggleSnippets() {
    this.snippetsOpened = !this.snippetsOpened;
  }
  /**
   * Renders or hides code snippets section.
   *
   * @param {Boolean} state Current state of `snippetsOpened`
   */
  _snippetsOpenedChanegd(state) {
    // (Pawel): Code snippets makes a lot of computations and are not even
    // rendered at first. They should be stamped when user request it.
    const collapse = this.shadowRoot.querySelector('#snippetsCollapse');
    if (!collapse) {
      return;
    }
    if (state) {
      const condition = this.shadowRoot.querySelector('#snippetsCondition');
      condition.if = true;
    } else {
      collapse.opened = false;
    }
    afterNextRender(this, () => {
      if (state) {
        collapse.opened = true;
      }
    });
  }
  /**
   * Removes code snippets element if should not be rendered.
   */
  _snippetsTransitionEnd() {
    if (!this.snippetsOpened) {
      const condition = this.shadowRoot.querySelector('#snippetsCondition');
      condition.if = false;
    }
  }
  /**
   * Toggles security section.
   */
  _toggleSecurity() {
    this.securityOpened = !this.securityOpened;
  }

  /**
   * Computes example headers string for code snippets.
   * @param {Array} headers Headers model from AMF
   * @return {String|undefind} Computed example value for headers
   */
  _computeSnippetsHeaders(headers) {
    let result;
    if (headers && headers.length) {
      result = '';
      headers.forEach((item) => {
        const name = this._getValue(item, this.ns.schema.schemaName);
        const value = this._computePropertyValue(item) || '';
        result += `${name}: ${value}\n`;
      });
    }
    return result;
  }
  /**
   * Computes example payload string for code snippets.
   * @param {Array} payload Payload model from AMF
   * @return {String|undefind} Computed example value for payload
   */
  _computeSnippetsPayload(payload) {
    if (payload && payload instanceof Array) {
      payload = payload[0];
    }
    if (!payload) {
      return;
    }
    let mt = this._getValue(payload, this.ns.raml.vocabularies.http + 'mediaType');
    if (!mt) {
      mt = 'application/json';
    }
    const examples = this.$.exampleGenerator.generatePayloadExamples(payload, mt, {});
    if (!examples || !examples[0]) {
      return;
    }
    return examples[0].value;
  }
  /**
   * Tries to find an example value (whether it's default value or from an
   * example) to put it into snippet's values.
   *
   * @param {Object} item A http://raml.org/vocabularies/http#Parameter property
   * @return {String|undefined}
   */
  _computePropertyValue(item) {
    const skey = this._getAmfKey(this.ns.raml.vocabularies.http + 'schema');
    let schema = item && item[skey];
    if (!schema) {
      return;
    }
    if (schema instanceof Array) {
      schema = schema[0];
    }
    let value = this._getValue(schema, this.ns.w3.shacl.name + 'defaultValue');
    if (!value) {
      const items = this.$.exampleGenerator.computeExamples(schema, null, {rawOnly: true});
      if (items) {
        value = items[0].value;
      }
    }
    return value;
  }
  // Computes a label for the section toggle buttons.
  _computeToggleActionLabel(opened) {
    return opened ? 'Hide' : 'Show';
  }
  // Computes class for the toggle's button icon.
  _computeToggleIconClass(opened) {
    let clazz = 'toggle-icon';
    if (opened) {
      clazz += ' opened';
    }
    return clazz;
  }

  _titleHidden(methodName, httpMethod, noTryIt) {
    if (!noTryIt) {
      return false;
    }
    if (!methodName || !httpMethod) {
      return true;
    }
    if (methodName.toLowerCase() === httpMethod.toLowerCase()) {
      return true;
    }
    return false;
  }

  /**
   * Computes list of "extends" from the shape.
   *
   * @param {Object} shape AMF shape to get `#extends` model from
   * @return {Array<Object>|undefined}
   */
  _computeExtends(shape) {
    const key = this._getAmfKey(this.ns.raml.vocabularies.document + 'extends');
    return shape && this._ensureArray(shape[key]);
  }
  /**
   * Computes value for `traits` property
   *
   * @param {Array<Object>} types Result of calling `_computeExtends()` or
   * a list of `#extends` models.
   * @return {Array<Object>|undefined}
   */
  _computeTraits(types) {
    if (!types || !types.length) {
      return;
    }
    const data = types.filter((item) =>
      this._hasType(item, this.ns.raml.vocabularies.document + 'ParametrizedTrait'));
    return data.length ? data : undefined;
  }

  /**
   * Computes list of trait names to render it in the doc.
   *
   * @param {Array<Object>} traits AMF trait definition
   * @return {String|undefined} Trait name if defined.
   */
  _computeTraitNames(traits) {
    if (!traits || !traits.length) {
      return;
    }
    const names = traits.map((trait) => this._getValue(trait, this.ns.schema.schemaName));
    if (names.length === 2) {
      return names.join(' and ');
    }
    return names.join(', ');
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
window.customElements.define(ApiMethodDocumentation.is, ApiMethodDocumentation);