// <custom-select>
// Custom <select> style
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      display: contents;
    }

    .select-wrap {
      align-self: stretch;
      display: grid;
      align-items: center;
      position: relative;
      grid-template-columns: 1fr 0;
    }

    .select-wrap::after {
      content: '▾';
      margin-left: -1.25em;
      color: var(--blue);
      pointer-events: none;
    }

    ::slotted(select) {
      -webkit-appearance: none;
      border: 2px solid var(--blue);
      border-radius: 4px;
      font-size: inherit;
      align-self: stretch;
      justify-self: stretch;
      padding-right: 1em;
      padding-left: .5em;
      box-shadow: var(--shadow);
    }
  </style>
  <div class="select-wrap">
    <slot name="input" />
  </div>
</div>  
`;

customElements.define('custom-select', class CustomSelect extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }
})