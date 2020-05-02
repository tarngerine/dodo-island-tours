// <toggle-input>
// A <button> that shows an <input> on click.
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
  </style>
  <button class="toggle-wrapper__open">
  </button>
  <div class="toggle-wrapper__wrapper"
    style="display: none">
    <button class="toggle-wrapper__close">
      ❌
    </button>
    <label>
      <slot name="input" />
    </label>
  </div>
`;

customElements.define('toggle-input', class ToggleInput extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let open = this.shadowRoot.querySelector(".toggle-wrapper__open"),
      close = this.shadowRoot.querySelector(".toggle-wrapper__close"),
      label = this.shadowRoot.querySelector("label"),
      wrapper = this.shadowRoot.querySelector(".toggle-wrapper__wrapper");
    open.innerHTML = this.getAttribute('label') || '';
    label.prepend(this.getAttribute('label') || '');
    open.addEventListener("click", e => {
      wrapper.style.setProperty('display', 'inline');
      open.style.setProperty('display', 'none');
    });
    close.addEventListener("click", e => {
      wrapper.style.setProperty('display', 'none');
      open.style.setProperty('display', 'inline');
    });
  }
})