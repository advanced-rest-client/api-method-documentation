import { CSSResult, LitElement, TemplateResult } from 'lit-element';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin';

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
export declare class ApiUrl extends AmfHelperMixin(LitElement) {
  /**
   * AMF model for Server object
   */
  server: any;
  /**
   * AMF model for Endpoint object
   */
  endpoint: any;
  /**
   * AMF model for Operation object
   */
  operation: any;
  /**
   * Optional parameter to be injected into the URL
   * @attribute
   */
  apiVersion: string;
  /**
   * Optional override of the URL. If this property is set, then that will
   * be the base URI regardless of server and endpoint
   * @attribute
   */
  baseUri: string;
  _url: string;
  _method: string;
  _protocol: string;
  _protocolVersion: string;
  _operation: any;
  _server: any;

  get styles(): CSSResult;

  get isNotHttp(): boolean;

  get path(): string;

  get url(): string;

  render(): TemplateResult;

  _getMethodTemplate(): TemplateResult;

  _getPathTemplate(): TemplateResult|string;

  getUrlTemplate(): TemplateResult;

  _updateMethod(): void;

  _updateProtocol(): void;

  _updateProtocolVersion(): void;

  _updateUrl(): void;

  /**
   * Computes value for `httpMethod` property.
   *
   * @param operation AMF `supportedOperation` model
   * @returns HTTP method name
   */
  _computeMethod(operation: any): string|undefined;

  _dispatchChangeEvent(): void;

  /**
   * Checks if the given operation is a gRPC operation
   * @param operation Operation model
   * @returns True if it's a gRPC operation
   */
  _isGrpcOperation(operation: any): boolean;

  /**
   * Gets the gRPC stream type for an operation
   * @param operation Operation model
   * @returns Stream type: 'unary', 'client_streaming', 'server_streaming', or 'bidi_streaming'
   */
  _getGrpcStreamType(operation: any): string;

  /**
   * Gets the display name for a gRPC stream type
   * @param streamType Stream type
   * @returns Display name
   */
  _getGrpcStreamTypeDisplayName(streamType: string): string;

  /**
   * Gets the HTTP method name to use for color styling based on gRPC stream type
   * @param streamType gRPC stream type
   * @returns HTTP method name for color styling
   */
  _getMethodForColor(streamType: string): string;
}
