// <toggle-input>
// A <button> that shows an <input> on click.
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      width: 100%;
      display: grid;
      justify-items: center;
      font-size: 1em;
      grid-row: -1/-1;
    }

    * {
      box-sizing: border-box;
    }

    summary::marker {
      content: '';
    }

    details:not([open]) summary::before {
      content: '';
      background-image: url("./img/toggle-input-plus.svg");
      background-size: 36px;
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      font-size: 36px;
      line-height: 32px;
      width: 48px;
      height: 48px;
      border-radius: 99px;
      box-shadow: var(--shadow);
    }

    details {
      color: var(--blue);
    }

    details[open] {
      padding: 10px;
      margin-bottom: 2em;
      box-shadow: var(--shadow);
      border-radius: 99px;
      width: 100%;
      position: relative;
    }

    summary {
      color: var(--blue);
      font-weight: bold;
      width: 72px;
      display: grid;
      grid-gap: 8px;
      justify-items: center;
      text-align: center;
    }


    details[open] summary {
      position: absolute;
      width: auto;
      top: 10px;
    }

    details[open] summary::before {
      content: '';
      width: 24px;
      height: 24px;
      background-image: url("./img/toggle-input-plus.svg");
      background-size: 24px;
      background-repeat: no-repeat;
      background-position: center;
      transform: rotate(45deg);
    }

    details[open] span {
      display: none;
    }

    button {
      -webkit-appearance: none;
      appearance: none;
      border: 0;
      background: none;
      font-size: inherit;
      text-align: center;
    }

    label {
      display: inline-grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      color: black;
      height: 24px;
      margin-top: 1px;
      margin-bottom: -1px;
    }

    .w100 {
      width: 100%;
      padding-left: 32px;
      display: grid;
      grid-template-columns: 1fr 20px;
    }

    [name="input"]::slotted(input) {
      font-size: inherit;
      border: none;
      padding: 0;
      margin-top: -4px;
    }
  </style>
  <details>
    <summary>
      <span></span>
    </summary>
    <div class="w100">
      <label>
        <slot name="input" />
      </label>
      <input type="checkbox">
    </div>
  </details>
`;

customElements.define('toggle-input', class ToggleInput extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let details = this.shadowRoot.querySelector("details"),
      open = this.shadowRoot.querySelector("span"),
      label = this.shadowRoot.querySelector("label");
    open.innerHTML = this.getAttribute('label') || '';
    label.prepend(this.getAttribute('label') || '');

    let observer = new MutationObserver((mutationList) => {
      mutationList.forEach(mutation => {
        if (mutation.target.open) {
          this.style.setProperty('grid-column', '1/-1');
          this.style.setProperty('grid-row', 'auto');
        } else {
          this.style.removeProperty('grid-column');
          this.style.setProperty('grid-row', '-1/-1');
        }
      })
    });
    observer.observe(details, {
      attributeFilter: ["open"]
    })
  }
})