// <toggle-input>
// A <button> that shows an <input> on click.
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    toggle-input {
      --toggle-opened-height: 24px;
      width: 100%;
      display: grid;
      justify-items: center;
      font-size: 1em;
      grid-row: -1/-1;
      -webkit-transform: translate3d(0,0,0);
    }

    toggle-input summary { list-style: none; }
    toggle-input summary::before { display: none; }
    toggle-input summary::-webkit-details-marker { display: none; }

    toggle-input details {
      color: var(--blue);
    }

    toggle-input details:not([open]) .toggle::before {
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

    toggle-input details:not([open]) .toggle {
      color: var(--blue);
      font-weight: bold;
      width: 72px;
      display: grid;
      grid-gap: 8px;
      justify-items: center;
      text-align: center;
    }

    toggle-input details[open] {
      padding: 10px;
      margin-bottom: 2em;
      box-shadow: var(--shadow);
      border-radius: 99px;
      width: 100%;
      position: relative;
    }

    toggle-input details[open] summary {
      position: absolute;
      top: 50%;
      margin-top: calc(var(--toggle-opened-height)/-2);
      overflow: hidden;
    }

    toggle-input details[open] .toggle {
      display: grid;
      align-items: center;
      height: 100%;
    }

    toggle-input details[open] .toggle::before {
      content: '';
      width: var(--toggle-opened-height);
      height: var(--toggle-opened-height);
      background-image: url("./img/toggle-input-plus.svg");
      background-size: var(--toggle-opened-height);
      background-repeat: no-repeat;
      background-position: center;
      transform: rotate(45deg);
    }
    
    toggle-input details > summary::-webkit-details-marker {
      display: none !important;
    }

    toggle-input details[open] .toggle-label {
      display: none;
    }

    toggle-input label {
      display: inline-grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      color: black;
      height: var(--toggle-opened-height);
    }

    toggle-input .input-label {
      line-height: var(--toggle-opened-height);
    }

    toggle-input .w100 {
      width: 100%;
      padding-left: 32px;
      display: grid;
      grid-template-columns: 1fr 1.5em;
      grid-gap: .5em;
      align-items: center;
    }

    toggle-input [type="text"],
    toggle-input [type="number"]  {
      font-family: inherit;
      box-sizing: border-box;
      font-size: inherit;
      border: none;
      padding: 0;
      height: var(--toggle-opened-height);
      line-height: var(--toggle-opened-height);
    }

    .checkbox-star {
      position: relative;
      height: 100%;
    }

    .checkbox-star::before {
      content: '';
      background: grey;
      mask-image: url("../img/star.svg");
      -webkit-mask: url("../img/star.svg");
      mask-size: cover;
      -webkit-mask-size: cover;
      width: 20px;
      height: 20px;
      display: block;
    }
    
    [type="checkbox"]:checked + .checkbox-star::before {
      background: var(--yellow);
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
        <slot name="input">
      </label>
      <label>
        <input type="checkbox"
          name="featured"
          aria-label="Feature this">
        <div class="checkbox-star"></div>
      </label>
    </div>
  </details>
`;

customElements.define('toggle-input', class ToggleInput extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let details = this.querySelector("details"),
      toggle = this.querySelector(".toggle-label"),
      label = this.querySelector(".input-label");

    // No <slot> in light DOM, so manually inserting
    let slot = this.querySelector("slot"),
      slotContent = this.firstElementChild;
    let slotParent = slot.parentElement;
    slotParent.appendChild(slotContent);
    slot.remove();

    let featured = this.querySelector('[name="featured"]');
    // featured.setAttribute("name", "featured-" + slotContent.getAttribute("name"));
    featured.addEventListener("click", e => {
      this.dispatchEvent(new CustomEvent('feature-checked', {
        bubbles: true,
        detail: {
          feature: slotContent.getAttribute("name"),
          checked: e.target.checked,
        },
      }));
    })

    toggle.innerHTML = this.getAttribute('label') || '';
    label.innerHTML = this.getAttribute('label') || '';

    let observer = new MutationObserver((mutationList) => {
      mutationList.forEach(mutation => {
        if (mutation.target.open) {
          this.style.setProperty('grid-column', '1/-1');
          this.style.setProperty('grid-row', 'auto');
          slotContent.focus();
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