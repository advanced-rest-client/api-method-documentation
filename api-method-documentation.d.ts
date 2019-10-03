/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   api-method-documentation.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {html, css, LitElement} from 'lit-element';

import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';

declare namespace ApiElements {

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
   * - else if `amf` is set then it computes base uri value from main
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
   * The change will be reflected whehn `amf` or `endpoint` property chnage.
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
   */
  class ApiMethodDocumentation extends
    AmfHelperMixin(
    Object) {
    legacy: boolean|null|undefined;

    /**
     * AMF method definition as a `http://www.w3.org/ns/hydra/core#supportedOperation`
     * object.
     */
    method: object|null|undefined;

    /**
     * Method's endpoint definition as a
     * `http://raml.org/vocabularies/http#endpoint` of AMF model.
     */
    endpoint: object|null|undefined;

    /**
     * A property to set to override AMF's model base URI information.
     * When this property is set, the `endpointUri` property is recalculated.
     */
    baseUri: string|null|undefined;

    /**
     * Computed value of `http://www.w3.org/ns/hydra/core#expects`
     * of AMF model from current `method`
     */
    expects: object|null|undefined;
    readonly _titleHidden: any;
    readonly _exampleGenerator: any;

    /**
     * `raml-aware` scope property to use.
     */
    aware: string|null|undefined;

    /**
     * The try it button is not rendered when set.
     */
    noTryIt: boolean|null|undefined;

    /**
     * Computed value from the method model, name of the method.
     * It is either a `displayName` or HTTP method name
     */
    methodName: string|null|undefined;

    /**
     * HTTP method name string.
     *
     * It is computed from `endpoint`.
     */
    httpMethod: string|null|undefined;

    /**
     * Computed value, API version name
     */
    apiVersion: string|null|undefined;

    /**
     * Endpoint URI to display in main URL field.
     * This value is computed when `amf`, `endpoint` or `baseUri` change.
     */
    endpointUri: string|null|undefined;

    /**
     * Computed value of method description from `method` property.
     */
    description: string|null|undefined;

    /**
     * Computed value from current `method`. True if the model contains
     * custom properties (annotations in RAML).
     */
    hasCustomProperties: boolean|null|undefined;

    /**
     * Computed value of the `http://raml.org/vocabularies/http#server`
     * from `amf`
     */
    server: object|null|undefined;

    /**
     * API base URI parameters defined in AMF api model
     */
    serverVariables: any[]|null|undefined;

    /**
     * Endpoint's path parameters.
     */
    endpointVariables: any[]|null|undefined;

    /**
     * Computed value if server and endpoint definition of API model has
     * defined any variables.
     */
    hasPathParameters: boolean|null|undefined;

    /**
     * Computed value of method's query parameters.
     */
    queryParameters: any[]|null|undefined;

    /**
     * Computed value, true when either has path or query parameters.
     * This renders `api-parameters-document` if true.
     */
    hasParameters: boolean|null|undefined;

    /**
     * Computed value of AMF payload definition from `expects`
     * property.
     */
    payload: any[]|null|undefined;

    /**
     * Computed value of AMF payload definition from `expects`
     * property.
     */
    headers: any[]|null|undefined;

    /**
     * Computed value of AMF response definition from `returns`
     * property.
     */
    returns: any[]|null|undefined;

    /**
     * Computed value of AMF security definition from `method`
     * property.
     */
    security: any[]|null|undefined;

    /**
     * If set it will renders the view in the narrow layout.
     */
    narrow: boolean|null|undefined;

    /**
     * Model to generate a link to previous HTTP method.
     * It should contain `id` and `label` properties
     */
    previous: object|null|undefined;

    /**
     * Model to generate a link to next HTTP method.
     * It should contain `id` and `label` properties
     */
    next: object|null|undefined;

    /**
     * When set code snippets are rendered.
     */
    _snippetsOpened: boolean|null|undefined;

    /**
     * When set security details are rendered.
     */
    securityOpened: boolean|null|undefined;

    /**
     * When set it renders code examples section is the documentation
     */
    renderCodeSnippets: boolean|null|undefined;

    /**
     * When set it renders security documentation when applicable
     */
    renderSecurity: boolean|null|undefined;

    /**
     * List of traits and resource types, if any.
     */
    extendsTypes: Array<object|null>|null;

    /**
     * List of traits appied to this endpoint
     */
    traits: Array<object|null>|null;

    /**
     * Enables compatibility with Anypoint components.
     */
    compatibility: boolean|null|undefined;

    /**
     * When enabled it renders external types as links and dispatches
     * `api-navigation-selection-changed` when clicked.
     */
    graph: boolean|null|undefined;

    /**
     * OAS summary field.
     */
    methodSummary: string|null|undefined;
    _renderSnippets: boolean|null|undefined;

    /**
     * When set it hiddes bottom navigation links
     */
    noNavigation: boolean|null|undefined;

    /**
     * Tries to find an example value (whether it's default value or from an
     * example) to put it into snippet's values.
     *
     * @param item A http://raml.org/vocabularies/http#Parameter property
     */
    _computePropertyValue(item: object|null): String|null|undefined;
    _methodChanged(): void;
    _endpointChanged(): void;
    _processModelChange(): void;
    _processMethodChange(): void;
    _processEndpointChange(): void;
    _expectsChanged(expects: any): void;
    _processEndpointVariables(): void;

    /**
     * Computes value for `methodName` property.
     * It is either a `http://schema.org/name` or HTTP method name
     *
     * @param method AMF `supportedOperation` model
     * @returns Method friendly name
     */
    _computeMethodName(method: object|null): String|null|undefined;

    /**
     * Computes value for `httpMethod` property.
     *
     * @param method AMF `supportedOperation` model
     * @returns HTTP method name
     */
    _computeHttpMethod(method: object|null): String|null|undefined;

    /**
     * Computes value for `hasPathParameters` property
     *
     * @param sVars Current value of `serverVariables` property
     * @param eVars Current value of `endpointVariables` property
     */
    _computeHasPathParameters(sVars: any[]|null, eVars: any[]|null): Boolean|null;

    /**
     * "Try it" button click handler. Dispatches `tryit-requested` custom event
     */
    _tryIt(): void;

    /**
     * Navigates to next method. Calls `_navigate` with id of previous item.
     */
    _navigatePrevious(): void;

    /**
     * Navigates to next method. Calls `_navigate` with id of next item.
     */
    _navigateNext(): void;

    /**
     * Dispatches `api-navigation-selection-changed` so other components
     * can update their state.
     */
    _navigate(id: String|null, type: String|null): void;

    /**
     * Toggles code snippets section.
     */
    _toggleSnippets(): void;
    _snippetsTransitionEnd(): void;

    /**
     * Toggles security section.
     */
    _toggleSecurity(): void;

    /**
     * Computes example headers string for code snippets.
     *
     * @param headers Headers model from AMF
     * @returns Computed example value for headers
     */
    _computeSnippetsHeaders(headers: any[]|null): String|undefind|null;

    /**
     * Computes example payload string for code snippets.
     *
     * @param payload Payload model from AMF
     * @returns Computed example value for payload
     */
    _computeSnippetsPayload(payload: any[]|null): String|undefind|null;

    /**
     * Computes a label for the section toggle buttons.
     */
    _computeToggleActionLabel(opened: any): any;

    /**
     * Computes class for the toggle's button icon.
     */
    _computeToggleIconClass(opened: any): any;

    /**
     * Computes list of "extends" from the shape.
     *
     * @param shape AMF shape to get `#extends` model from
     */
    _computeExtends(shape: object|null): Array<object|null>|null|undefined;

    /**
     * Computes value for `traits` property
     *
     * @param types Result of calling `_computeExtends()` or
     * a list of `#extends` models.
     */
    _computeTraits(types: Array<object|null>|null): Array<object|null>|null|undefined;

    /**
     * Computes list of trait names to render it in the doc.
     *
     * @param traits AMF trait definition
     * @returns Trait name if defined.
     */
    _computeTraitNames(traits: Array<object|null>|null): String|null|undefined;
    _apiChanged(e: any): void;
    render(): any;
    _getTitleTemplate(): any;
    _getUrlTemplate(): any;
    _getTraitsTemplate(): any;
    _getDescriptionTemplate(): any;
    _getCodeSnippetsTemplate(): any;
    _getSecurityTemplate(): any;
    _getParametersTemplate(): any;
    _getHeadersTemplate(): any;
    _getBodyTemplate(): any;
    _getReturnsTemplate(): any;
    _getNavigationTemplate(): any;
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "api-method-documentation": ApiElements.ApiMethodDocumentation;
  }
}
