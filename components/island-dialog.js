// <dialog>
// Convenience component wrapper for <details-dialog>
//
import { html } from '../lib/toto.js';
import { joinIsland } from '../js/visitor.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    * {
      box-sizing: border-box;
    }
  </style>
  <details class="details-with-dialog details-button">
    <style>
      .details-with-dialog {
        display: inline-block;
      }

      .details-button > summary { list-style: none; }
      .details-button > summary::before { display: none; }
      .details-button > summary::-webkit-details-marker { display: none; }

      .details-with-dialog[open] > summary:before {
        content: " ";
        background:rgba(0,0,0,.5);
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
      }

      details-dialog {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        outline: none;
        overflow: auto;
        display: grid;
        justify-items: center;
        align-items: center;
      }

      .details-button > summary {
        /* width: 100%;
        background: var(--blue);
        color: white;
        border-radius: 99px;
        padding: 1em;
        display: inline-grid;
        text-align: center;
        align-items: center;
        cursor: default; */
      }

      .details-button[open] > summary.hide-on-open {
        display: none;
      }
      </style>
    <summary class="dialog-summary">
      <slot name="summary" />
    </summary>
    <details-dialog>
      <style>
        .dialog-contents {
          box-shadow: var(--shadow);
          background: var(--blue);
          border: 2px solid var(--blue);
          color: white;
          border-radius: 1em;
          overflow: hidden;
          box-sizing: border-box; 
          margin-top: 2em;
        }
        
        .dialog-padding {
          /* height: 2em;
          width: 1em; */
          display: none;
        }
      </style>
      <div class="dialog-contents">
        <slot name="contents"></slot>
        <!-- <button type="button" data-close-dialog>Close</button> -->
      </div>
      <div class="dialog-padding"></div>
    </details-dialog>
  </details>
`;

customElements.define('island-dialog', class IslandDialog extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Click backdrop to close modal for <details-dialog>
    let dialog = this.shadowRoot.querySelector("details-dialog");
    dialog.addEventListener("click", e => {
      if (e.target.tagName == "DETAILS-DIALOG") {
        this.shadowRoot.querySelector(".dialog-summary").click(); // Close dialog
      }
    });
  }
});