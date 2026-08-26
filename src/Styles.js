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
  flex: 1;
  font-family: var(--api-method-documentation-h2-font-family, var(--arc-font-subhead-font-family));
  color: var(--api-method-documentation-h2-font-color, var(--arc-font-subhead-color));
  font-size: var(--api-method-documentation-h2-font-size, 1.25rem) !important;
  font-weight: var(--api-method-documentation-h2-font-weight, var(--arc-font-subhead-font-weight));
  line-height: var(--api-method-documentation-h2-line-height, var(--arc-font-subhead-line-height));
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

/* Webhooks render only the event name in .url-value (no preceding "Channel"
   line), so the 8px top margin above just pushes it out of line with the
   method pill. Zero it when .url-server-value is the sole child; the isNotHttp
   case keeps the margin because .url-channel-value precedes it. */
.url-value > .url-server-value:first-child {
  margin-top: 0;
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

.method-label[data-method='query'],
.method-label[data-method='QUERY'] {
  background-color: var(
    --http-method-label-query-background-color,
    rgba(15, 157, 157, 0.12)
  );
  color: var(--http-method-label-query-color, #0f9d9d);
}

.method-label[data-method='copy'],
.method-label[data-method='COPY'] {
  background-color: var(
    --http-method-label-copy-background-color,
    rgba(92, 107, 192, 0.12)
  );
  color: var(--http-method-label-copy-color, #5c6bc0);
}

.method-label[data-method='move'],
.method-label[data-method='MOVE'] {
  background-color: var(
    --http-method-label-move-background-color,
    rgba(184, 134, 11, 0.12)
  );
  color: var(--http-method-label-move-color, #b8860b);
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
`;
