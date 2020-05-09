// <toggle-input>
// A <button> that shows an <input> on click.
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
  </style>
  <details>
    <summary>
      <div class="toggle">
        This is not tabbable
      </div>
    </summary>
    Hi
  </details>
`;

customElements.define('test-component', class TestComponent extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }
})