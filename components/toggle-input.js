// <toggle-input>
// A <button> that shows an <input> on click.
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      --toggle-opened-height: 24px;
      width: 100%;
      display: grid;
      justify-items: center;
      font-size: 1em;
      grid-row: -1/-1;
      -webkit-transform: translate3d(0,0,0);
    }

    * {
      box-sizing: border-box;
    }

    summary::marker {
      content: '';
    }

    details {
      color: var(--blue);
    }

    details:not([open]) .toggle::before {
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

    details:not([open]) .toggle {
      color: var(--blue);
      font-weight: bold;
      width: 72px;
      display: grid;
      grid-gap: 8px;
      justify-items: center;
      text-align: center;
    }

    details[open] {
      padding: 10px;
      margin-bottom: 2em;
      box-shadow: var(--shadow);
      border-radius: 99px;
      width: 100%;
      position: relative;
    }

    details[open] .toggle {
      position: absolute;
      display: grid;
      width: auto;
      top: 10px;
    }

    details[open] .toggle::before {
      content: '';
      width: var(--toggle-opened-height);
      height: var(--toggle-opened-height);
      background-image: url("./img/toggle-input-plus.svg");
      background-size: var(--toggle-opened-height);
      background-repeat: no-repeat;
      background-position: center;
      transform: rotate(45deg);
    }
    
    details > summary::-webkit-details-marker {
      display: none !important;
    }

    details[open] .toggle-label {
      display: none;
    }

    label {
      display: inline-grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      color: black;
      height: var(--toggle-opened-height);
    }

    .input-label {
      line-height: var(--toggle-opened-height);
    }

    .w100 {
      width: 100%;
      padding-left: 32px;
      display: grid;
      grid-template-columns: 1fr 20px;
      align-items: baseline;
    }

    [name="input"]::slotted(input) {
      font-family: inherit;
      box-sizing: border-box;
      font-size: inherit;
      border: none;
      padding: 0;
      height: var(--toggle-opened-height);
      line-height: var(--toggle-opened-height);
    }
  </style>
  <details>
    <summary>
      <div class="toggle">
        <span class="toggle-label"></span>
      </div>
    </summary>
    <div class="w100">
      <label>
        <span class="input-label"></span>
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
      toggle = this.shadowRoot.querySelector(".toggle-label"),
      label = this.shadowRoot.querySelector(".input-label");
    toggle.innerHTML = this.getAttribute('label') || '';
    label.innerHTML = this.getAttribute('label') || '';

    let observer = new MutationObserver((mutationList) => {
      mutationList.forEach(mutation => {
        if (mutation.target.open) {
          this.style.setProperty('grid-column', '1/-1');
          this.style.setProperty('grid-row', 'auto');
          let input = this.shadowRoot.querySelector('slot')
            .assignedElements()[0];
          input.focus();
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