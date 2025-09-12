import { css } from 'lit-element';

export default css`
:host {
  display: block;
}

[hidden] {
  display: none !important;
}

.title {
  font-size: var(--arc-font-headline-font-size);
  letter-spacing: var(--arc-font-headline-letter-spacing);
  line-height: var(--arc-font-headline-line-height);
  font-weight: var(--api-method-documentation-title-method-font-weight,
    var(--arc-font-headline-font-weight, 500));
  color: var(--arc-font-headline-color);
  text-transform: var(--api-method-documentation-title-text-transform, capitalize);
}

.heading2 {
  font-family: var(--api-method-documentation-h2-font-family, var(--arc-font-title-font-family));
  font-size: var(--api-method-documentation-h2-font-size, var(--arc-font-title-font-size));
  font-weight: var(--api-method-documentation-h2-font-weight, var(--arc-font-title-font-weight));
  line-height: var(--api-method-documentation-h2-line-height, var(--arc-font-title-line-height));
  color: var(--api-method-documentation-h2-font-color, var(--arc-font-title-color));
  margin: 0.84em 0;
}

.heading3 {
  flex: 1;
  font-family: var(--api-method-documentation-h3-font-family, var(--arc-font-subhead-font-family));
  font-size: var(--api-method-documentation-h3-font-size, var(--arc-font-subhead-font-size));
  font-weight: var(--api-method-documentation-h3-font-weight, var(--arc-font-subhead-font-weight));
  line-height: var(--api-method-documentation-h3-line-height, var(--arc-font-subhead-line-height));
  color: var(--api-method-documentation-h3-font-color, var(--arc-font-subhead-color));
}

.heading4 {
  flex: 1;
  font-weight: bold;
}

.title-area {
  flex-direction: row;
  display: flex;
  align-items: center;
}

:host([narrow]) .title-area {
  margin-bottom: 24px;
}

:host([narrow]) .title-area {
  margin-top: 12px;
}

:host([narrow]) .title {
  font-size: var(--arc-font-headline-narrow-font-size, 20px);
  margin: 0;
}

:host([narrow]) .heading2 {
  font-size: var(--arc-font-title-narrow-font-size, 18px);
}

:host([narrow]) .heading3 {
  font-size: var(--arc-font-subhead-narrow-font-size, 17px);
}

.title {
  flex: 1;
}

.url-area, .async-servers-names-area {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(
    --api-method-documentation-url-font-family,
    var(--arc-font-code-family)
  );
  font-size: var(--api-method-documentation-url-font-size, 1.07rem);
  font-weight: var(--api-method-documentation-url-font-weight);
  line-height: var(--api-method-documentation-url-line-height);
  margin-bottom: 40px;
  margin-top: 20px;
  margin: var(--api-method-documentation-url-margin);
  background-color: var(--api-method-documentation-url-background-color, var(--code-background-color));
  color: var(
    --api-method-documentation-url-font-color,
    var(--code-color)
  );
  padding: var(--api-method-documentation-url-padding, 8px);
  border-radius: var(--api-method-documentation-url-border-radius, 4px);
  position: relative;
}

.async-servers-names-area{
  padding: var(--api-method-documentation-url-padding, 13px);
}

.section-title-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px var(--api-parameters-document-title-border-color, #e5e5e5) solid;
  border: var(--api-parameters-document-title-border);
  cursor: pointer;
  user-select: none;
  transition: border-bottom-color 0.15s ease-in-out;
}

.section-title-area[opened] {
  border-bottom-color: transparent;
}

.url-value {
  flex: 1;
  margin-left: 12px;
  margin: var(--api-method-documentation-url-value-margin);
  word-break: break-all;
}

.channel-url, .server-url {
  display: block;
  font-size: var(--api-method-documentation-url-font-size, 0.70rem);
  font-weight: bolder;
}

.url-server-value {
  margin-top: 8px;
}

.method-value {
  align-self: baseline;
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

.bottom.action {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
}

arc-marked {
  margin: 8px 0;
  padding: 0px;
}

.markdown-body {
  margin-bottom: 28px;
  color: var(--api-method-documentation-description-color, rgba(0, 0, 0, 0.74));
}

.summary {
  color: var(--api-method-documentation-description-color, rgba(0, 0, 0, 0.74));
  font-size: 1.1rem;
}

.operation-id {
  color: var(--api-method-documentation-operation-id-color, rgba(0, 0, 0, 0.61));
  font-size: 0.8rem;
}

.method-label {
  margin-bottom: 0;
  font-size: var(--api-method-documentation-http-method-label-font-size, inherit);
  font-family: var(--api-method-documentation-http-method-label-font-family);
  font-weight: var(--api-method-documentation-http-method-label-font-weight);
  min-width: var(--api-method-documentation-http-method-label-min-width, inherit);
}

.bottom-nav,
.bottom-link {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.bottom-nav {
  padding: 32px 0;
  margin: 16px 0;
  border-top: 1px var(--api-method-documentation-bottom-navigation-border-color, #cfd8dc) solid;
  color: var(--api-method-documentation-bottom-navigation-color, #000);
}

.bottom-link {
  cursor: pointer;
  max-width: 50%;
  word-break: break-all;
  text-decoration: underline;
}

.bottom-link.previous {
  margin-right: 12px;
}

.bottom-link.next {
  margin-left: 12px;
}

.nav-separator {
  flex: 1;
}

api-security-documentation {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px var(--api-headers-document-title-border-color, var(--api-parameters-document-title-border-color, #e5e5e5)) dashed;
}

api-security-documentation:last-of-type {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.extensions {
  font-style: italic;
  margin: 12px 0;
}

.request-documentation,
.response-documentation {
  background-color: var(--api-method-documentation-section-background-color, initial);
  padding: var(--api-method-documentation-section-padding, 0px);
}

.icon {
  display: block;
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.callback-section {
  margin: 12px 0;
  padding: 8px;
  background-color: var(--api-method-documentation-callback-background-color, #f7f7f7);
}

.deprecated-warning {
  margin-top: 10px;
  margin-bottom: 10px;
}

.deprecated-warning > span {
  background-color: var(--api-type-document-type-deprecated-background-color, gray);
  color: var(--api-type-document-type-deprecated-color, white);
  padding: var(--api-type-document-deprecated-warning-padding, 3px 6px);
  border-radius: var(--api-type-document-deprecated-warning-border-radius, 3px);
}

.messages-options > anypoint-dropdown-menu {
  margin-left: 0;
}

.async-servers{
  margin-left: 11px;
}

.async-servers .async-servers-path{
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: -1px;
  word-break: break-all;
}

.async-servers .async-server-names-title{
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-family: var(--api-method-documentation-async-server-names-title-font,Helvetica);
  margin-right: 10px;
}

.async-servers .async-server-names-container{
  margin-top: 16px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.async-servers .async-server-name{
  color: var(--api-method-documentation-async-server-names-color,#ffffff);
  background-color: var(--api-method-documentation-async-server-names-bg-color,#506773);
  text-align: center;
  font-family: var(--api-method-documentation-async-server-names-font,Avenir);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 4px;
  border: 1px solid var(--api-method-documentation-async-server-names-border-color,#506773);;
  padding: 4px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  word-break: auto-phrase;
  max-width: fit-content;
}

@media (max-width: 385px) {
  .async-servers .async-server-name {
    margin-bottom: 10px;
  }
}

.async-method-security{
  margin-top: 17px;
}

/* Enhanced API Method Documentation Styles */

/* Operation Summary */
.operation-summary {
  margin-bottom: 24px;
}

.operation-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.method-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

.method-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  display: inline-block;
}

/* HTTP Method Colors */
.method-badge.http-method-get {
  background-color: var(--api-method-documentation-method-get-color, #61affe);
}

.method-badge.http-method-post {
  background-color: var(--api-method-documentation-method-post-color, #49cc90);
}

.method-badge.http-method-put {
  background-color: var(--api-method-documentation-method-put-color, #fca130);
}

.method-badge.http-method-delete {
  background-color: var(--api-method-documentation-method-delete-color, #f93e3e);
}

.method-badge.http-method-patch {
  background-color: var(--api-method-documentation-method-patch-color, #50e3c2);
}

.method-badge.http-method-head {
  background-color: var(--api-method-documentation-method-head-color, #9012fe);
}

.method-badge.http-method-options {
  background-color: var(--api-method-documentation-method-options-color, #0d5aa7);
}

/* gRPC Badge */
.method-badge.grpc-badge {
  background-color: var(--api-method-documentation-grpc-color, #4285f4);
}

.stream-badge {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  background-color: var(--api-method-documentation-stream-badge-bg, #e8f0fe);
  color: var(--api-method-documentation-stream-badge-color, #1a73e8);
  border: 1px solid var(--api-method-documentation-stream-badge-border, #dadce0);
}

/* Enhanced Request/Response */
.no-request-body {
  color: var(--api-method-documentation-muted-color, #666);
  font-style: italic;
  margin: 8px 0;
}

.request-payload,
.enhanced-parameters,
.request-headers {
  margin: 16px 0;
}

.payload-item {
  border: 1px solid var(--api-method-documentation-border-color, #e0e0e0);
  border-radius: 4px;
  margin: 8px 0;
  overflow: hidden;
}

.payload-header {
  background-color: var(--api-method-documentation-payload-header-bg, #f5f5f5);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--api-method-documentation-border-color, #e0e0e0);
}

.media-type-badge {
  padding: 2px 6px;
  background-color: var(--api-method-documentation-media-type-bg, #e3f2fd);
  color: var(--api-method-documentation-media-type-color, #1976d2);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
}

.schema-name {
  font-weight: 600;
  color: var(--api-method-documentation-schema-name-color, #333);
}

/* gRPC Message Styles */
.grpc-message {
  padding: 12px;
}

.schema-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--api-method-documentation-schema-title-color, #333);
}

.schema-description {
  color: var(--api-method-documentation-description-color, #666);
  margin-bottom: 12px;
  font-size: 14px;
}

.message-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grpc-field {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background-color: var(--api-method-documentation-field-bg, #fafafa);
  border-radius: 3px;
}

.field-name {
  font-weight: 500;
  color: var(--api-method-documentation-field-name-color, #333);
}

.field-type {
  color: var(--api-method-documentation-field-type-color, #666);
  font-size: 12px;
  font-family: var(--arc-font-code-family, monospace);
}

.required-badge {
  padding: 1px 4px;
  background-color: var(--api-method-documentation-required-bg, #ff5722);
  color: white;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 500;
}

/* Enhanced Parameters */
.parameter-group {
  margin: 12px 0;
}

.parameter-group-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--api-method-documentation-param-group-color, #333);
}

.parameters-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.parameter-item {
  border: 1px solid var(--api-method-documentation-border-color, #e0e0e0);
  border-radius: 4px;
  padding: 8px;
}

.parameter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.parameter-name {
  font-weight: 500;
  color: var(--api-method-documentation-param-name-color, #333);
}

.parameter-type {
  color: var(--api-method-documentation-param-type-color, #666);
  font-size: 12px;
  font-family: var(--arc-font-code-family, monospace);
}

.parameter-description {
  color: var(--api-method-documentation-description-color, #666);
  font-size: 14px;
  margin: 4px 0;
}

.parameter-default,
.parameter-examples {
  font-size: 12px;
  color: var(--api-method-documentation-muted-color, #666);
  margin: 2px 0;
}

.parameter-default code,
.parameter-examples code {
  background-color: var(--api-method-documentation-code-bg, #f5f5f5);
  padding: 1px 3px;
  border-radius: 2px;
  font-family: var(--arc-font-code-family, monospace);
}

/* Examples */
.payload-examples,
.enhanced-examples {
  margin: 16px 0;
}

.examples-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--api-method-documentation-examples-title-color, #333);
}

.example-item {
  border: 1px solid var(--api-method-documentation-border-color, #e0e0e0);
  border-radius: 4px;
  margin: 8px 0;
  overflow: hidden;
}

.example-header {
  background-color: var(--api-method-documentation-example-header-bg, #f8f9fa);
  padding: 6px 8px;
  border-bottom: 1px solid var(--api-method-documentation-border-color, #e0e0e0);
}

.example-name {
  font-weight: 500;
  font-size: 12px;
  color: var(--api-method-documentation-example-name-color, #333);
}

.example-content {
  position: relative;
}

.example-content pre {
  margin: 0;
  padding: 12px;
  background-color: var(--api-method-documentation-code-bg, #f8f9fa);
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}

.example-content code {
  font-family: var(--arc-font-code-family, monospace);
  color: var(--api-method-documentation-code-color, #333);
}

.show-full-example {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 11px;
  padding: 4px 8px;
}

/* Enhanced Security */
.enhanced-security {
  margin: 24px 0;
}

.security-requirements {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Enhanced Metadata */
.enhanced-metadata {
  margin: 24px 0;
}

.metadata-content {
  padding: 16px;
}

.metadata-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 0;
}

.metadata-item.deprecated {
  align-items: center;
}

.metadata-label {
  font-weight: 600;
  color: var(--api-method-documentation-metadata-label-color, #333);
  min-width: 120px;
}

.metadata-value {
  color: var(--api-method-documentation-metadata-value-color, #666);
  font-family: var(--arc-font-code-family, monospace);
  font-size: 13px;
}

.metadata-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag-badge {
  padding: 2px 6px;
  background-color: var(--api-method-documentation-tag-bg, #e8f5e8);
  color: var(--api-method-documentation-tag-color, #2e7d32);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
}

.deprecated-badge {
  padding: 2px 6px;
  background-color: var(--api-method-documentation-deprecated-bg, #ffebee);
  color: var(--api-method-documentation-deprecated-color, #c62828);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid var(--api-method-documentation-deprecated-border, #ffcdd2);
}

.server-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.server-item {
  font-family: var(--arc-font-code-family, monospace);
  font-size: 12px;
  color: var(--api-method-documentation-server-color, #666);
  padding: 2px 4px;
  background-color: var(--api-method-documentation-server-bg, #f5f5f5);
  border-radius: 2px;
}

/* gRPC Examples Styles */
.grpc-examples {
  margin: 24px 0;
}

.example-section {
  margin: 16px 0;
}

.example-snippet {
  position: relative;
  border: 1px solid var(--api-method-documentation-border-color, #e0e0e0);
  border-radius: 4px;
  overflow: hidden;
}

.example-snippet pre {
  margin: 0;
  padding: 16px;
  background-color: var(--api-method-documentation-code-bg, #f8f9fa);
  overflow-x: auto;
  font-family: var(--arc-font-code-family, 'Consolas', 'Monaco', 'Courier New', monospace);
  font-size: 13px;
  line-height: 1.4;
}

.example-snippet code {
  color: var(--api-method-documentation-code-color, #333);
}

.grpcurl-command pre {
  background-color: var(--api-method-documentation-terminal-bg, #2d3748);
}

.grpcurl-command code {
  color: var(--api-method-documentation-terminal-color, #e2e8f0);
}

.example-snippet clipboard-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  --anypoint-button-background-color: var(--api-method-documentation-copy-button-bg, #ffffff);
  --anypoint-button-color: var(--api-method-documentation-copy-button-color, #333);
}

.server-info {
  margin: 20px 0;
  padding: 16px;
  background-color: var(--api-method-documentation-info-bg, #f0f8ff);
  border: 1px solid var(--api-method-documentation-info-border, #b3d9ff);
  border-radius: 4px;
}

.server-details p {
  margin: 4px 0;
  font-size: 14px;
}

.server-details strong {
  color: var(--api-method-documentation-label-color, #333);
}

.heading4 {
  font-size: 16px;
  font-weight: 600;
  margin: 8px 0;
  color: var(--api-method-documentation-heading4-color, #333);
}

/* Enhanced gRPC Badge Styles */
.grpc-badge {
  background: linear-gradient(135deg, #4285f4 0%, #34a853 100%) !important;
  color: white !important;
  box-shadow: 0 2px 4px rgba(66, 133, 244, 0.3);
}

.stream-badge {
  background: linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 100%);
  color: #1a73e8;
  border: 1px solid #dadce0;
  font-weight: 600;
  text-transform: capitalize;
}

/* gRPC Message Field Enhancements */
.grpc-field {
  border-left: 3px solid var(--api-method-documentation-grpc-accent, #4285f4);
}

.grpc-field .field-type {
  background-color: var(--api-method-documentation-type-bg, #f1f3f4);
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .operation-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .method-badges {
    align-self: flex-start;
  }
  
  .parameter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .metadata-item {
    flex-direction: column;
    gap: 4px;
  }
  
  .metadata-label {
    min-width: auto;
  }
  
  .example-snippet clipboard-copy {
    position: relative;
    top: auto;
    right: auto;
    margin: 8px;
  }
}
`;
