// <checkbox-villager>
// A checkbox that has an image of a villager
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      --dim: 72px;
      display: block;
      width: var(--dim);
    }

    [type="checkbox"] {
      position: absolute;
      left: -9999px;
    }

    [type="checkbox"] + .wrap::after {
      content: '';
      position: absolute;
      left: -6px;
      bottom: 4px;
      width: 20px;
      height: 20px;
      border: 2px solid var(--blue);
      background: white;
      border-radius: 99px;
    }

    [type="checkbox"]:checked + .wrap::after {
      background: #15F78A;
      content: '✓';
      display: grid;
      align-items: center;
      justify-items: center;
      line-height: 1.25em;
      font-size: 1.25em;
      color: var(--blue);
    }

    [type="checkbox"]:checked + .wrap::before {
      background: #FFE600;
    }

    .wrap {
      width: var(--dim);
      position: relative;
    }

    .clip {
      height: calc(var(--dim) + 16px);
      border-radius: 0 0 999px 999px;
      overflow: hidden;
    }

    .wrap::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--dim);
      box-shadow: var(--shadow);
      border-radius: 9999px;
      background: white;
    }

    img {
      width: 100%;
      position: relative; /* so it's ordered properly without using z-index */
    }

    span {
      display: block;
      padding-top: 4px;
      text-align: center;
      font-weight: bold;
    }
  </style>
  <label>
    <input
      type="checkbox">
    <div class="wrap">
      <div class="clip">
        <img />
      </div>
    </div>
    <span></span>
  </label>
`;

customElements.define('checkbox-villager', class CheckboxVillager extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let checkbox = this.shadowRoot.querySelector("input"),
      img = this.shadowRoot.querySelector("img"),
      span = this.shadowRoot.querySelector("span");
    span.textContent = this.getAttribute('name') || '';
    img.src = `../img/${this.getAttribute('name').toLowerCase()}.webp`
    
   }
})