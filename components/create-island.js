import { html } from '../lib/toto.js';

const ids = {
  dodo: {
    form: "form-dodo-code",
    submit: "submit-dodo-code",
    input: "input-dodo-code",
    error: "error-dodo-code",
  },
  dialog: {
    dialog: "dialog-island-info",
    form: "form-island-info",
  }
}

const template = document.createElement('template');
template.innerHTML = html`
  <form id="${ids.dodo.form}">
    <label>
      Enter your Dodo Code:
      <input type="text"
        name="dodoCodeValidate"
        id="${ids.dodo.input}"
        minlength="5"
        maxlength="5"
        value="AAAAA"
      />
      <span id="${ids.dodo.error}"></span>
    </label>
    <details class="details-with-dialog">
      <style>
        .details-with-dialog {
          display: inline-block;
        }

        .details-with-dialog[open] > summary:before {
          content: " ";
          background: rgba(0,0,0,.5);
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
        }

        #${ids.dodo.submit} {
          background: var(--blue);
          color: white;
          border-radius: 99px;
          padding: 1em;
          display: inline-grid;
          align-items: center;
          cursor: default;
        }
      </style>
      <summary id="${ids.dodo.submit}">Open dialog</summary>
      <details-dialog>
        Clicking close works, clicking backdrop doesn't~
        <button type="button" data-close-dialog>Close</button>
      </details-dialog>
    </details>
  </form>
  </details>
`;

customElements.define('create-island', class CreateIsland extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let inputDodo = this.shadowRoot.getElementById(ids.dodo.input),
    submitDodo = this.shadowRoot.getElementById(ids.dodo.submit);


    let dialog = this.shadowRoot.querySelector(".details-with-dialog");

    submitDodo.addEventListener("click", e => {
      e.preventDefault();
      if (validateDodo(inputDodo.value)) {
        dialog.setAttribute("open", "");
      }
    })
  }
})

// Dumb validation since we don't have private API access
function validateDodo (code) {
  if (code.length != 5) return false;
  let valid = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "x", "c", "v", "b", "n", "m" ];
  return code.toLowerCase().split("")
    .every(c => valid.indexOf(c) > -1);
};