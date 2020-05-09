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
  <div id="${ids.dodo.form}">
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

        .details-with-dialog > summary { list-style: none; }
        .details-with-dialog > summary::before { display: none; }
        .details-with-dialog > summary::-webkit-details-marker { display: none; }

        .details-with-dialog[open] > summary:before {
          content: " ";
          background: var(--yellow);
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
          grid-template-rows: min-content;
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
      <summary id="${ids.dodo.submit}">Create island tour</summary>
      <details-dialog>
        <style>
          * {
            box-sizing: border-box;
          }

          .dialog-contents {
            width: 32em;
            padding: 1.5em;
            box-shadow: var(--shadow);
            background: white;
            border-radius: 1em;
            box-sizing: border-box; 
            margin-top: 2em;
          }
          
          .dialog-padding {
            height: 2em;
            width: 1em;
          }
          
          fieldset {
            border: none;
            padding: 0;
            margin: 0;
          }
          
          .fieldset {
            padding: 1.5em 0 2em;
          }
          
          legend {
            font-weight: bold;
            padding: 0;
          }
          
          .fieldset.dodo {
            background: blue;
            margin: -1.5em;
            padding: 1.5em;
            margin-bottom: 1.5em;
            color: white;
            font-weight: bold;
            border-radius: 1em 1em 0 0 
          }
          
          .dodo label {
            display: grid;
            grid-template-columns: max-content 1fr;
            grid-template-rows: 2em;
            grid-gap: 1em;
            align-items: center;
          }

          input[type="text"] {            
            border: none;
            background: none;
            font-size: inherit;
            line-height: inherit;
            font-family: inherit;
            height: 100%;
            width: 100%;
          }

          .dodo input {
            border-top: 2px solid transparent;
            border-bottom: 2px solid white;
            color: white;
          }

          .dodo input::placeholder {
            color: rgba(255, 255, 255, .5);
            opacity: 1;
          }

          .fieldset.basics {
            padding-top: 1em;
            display: grid;
            grid-template-columns: 3fr 1fr 1fr;
            grid-gap: .5em;
            grid-template-rows: 2.5em;
            line-height: 2.5em;
            align-items: baseline;
          }

          .fieldset.basics label {
            height: 100%;
            width: 100%;
            font-size: inherit;
            line-height: inherit;
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: .5em;
          }

          .basics input[type="text"] {
            border-top: 2px solid transparent;
            border-bottom: 2px solid var(--blue);
            background: none;
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

          select {
            -webkit-appearance: none;
            border: 2px solid var(--blue);
            border-radius: 4px;
            font-size: inherit;
            align-self: stretch;
            justify-self: stretch;
            padding-right: 1em;
            padding-left: .5em;
          }

          .fieldset.stores {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1em;
          }

          .stores span {
            display: grid;
            grid-template-columns: 1.5em 1fr;
            grid-template-rows: 1.5em;
            align-items: center;
            grid-gap: .5em;
          }

          [type="checkbox"] {
            position: absolute;
            left: -9999px;
          }

          [type="checkbox"] + span::before {
            content: '';
            align-self: stretch;
            justify-self: stretch;
            border: 2px solid var(--blue);
            background: white;
            border-radius: 99px;
            display: grid;
            justify-items: center;
            font-family: auto;
            font-size: 1.5em;
            align-items: center;
            line-height: 0;
          }

          [type="checkbox"]:checked + span::before {
            background: #15F78A;
            content: '✓';
            color: var(--blue);
          }

          [type="checkbox"]:focus + span::before {
            background: #15F78A;
          }

          .VIP, .features {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: .5em;
            justify-items: center;
          }
          .features {
            /* hack to allow toggle-inputs to "float up" when opened */
            grid-template-rows: auto auto auto auto auto auto;
            grid-gap: 0 .5em;
          }
        </style>
        <div class="dialog-contents">
          <form id="${ids.dialog.form}">
            <fieldset>
              <div class="fieldset dodo">
                <label>
                  Dodo code
                  <input name="dodoCode"
                  type="text"  
                  maxlength="5"
                  placeholder="AAAAA"
                  required />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                Island basics
              </legend>
              <div class="fieldset basics">
                <label>
                  Island name
                  <input name="islandName"
                  id="islandName"
                  type="text"
                  placeholder="My island" />
                  
                </label>
                <div class="select-wrap">
                  <select name="fruit" required
                  aria-label="Island fruit">
                    <option>🍎</option>
                    <option>🍒</option>
                    <option>🍊</option>
                    <option>🍑</option>
                    <option>🍐</option>
                  </select>
                </div>
                <div class="select-wrap">
                  <select name="hemisphere" required
                  aria-label="Island hemisphere">
                    <option>North</option>
                    <option>South</option>
                  </select>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                Stores
              </legend>
              <div class="fieldset stores">
                <label>
                  <input type="checkbox" name="storeNook" required />
                  <span>Nook's Cranny (*required)</span>
                </label>
                <label>
                  <input type="checkbox" name="storeAble" />
                  <span>Able Sisters</span>
                </label>
                <label>
                  <input type="checkbox" name="storeNookPlus" />
                  <span>Nook's Cranny Upgraded</span>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                On your island now
              </legend>
              <div class="fieldset features">
                <toggle-input
                  label="Turnip price">
                  <input name="turnipPrice"
                    slot="input"
                    type="number"
                    max="999"
                    min="40"
                    placeholder="100"
                  />
                </toggle-input>
                <toggle-input
                  label="Villager DIY">
                  <input name="villagerDIY"
                    slot="input"
                    type="text"
                  />
                </toggle-input>
                <toggle-input
                  label="Rare items">
                  <input name="rareItems"
                    slot="input"
                    type="text"
                  />
                </toggle-input>
                <toggle-input
                  label="Weather">
                  <input name="weather"
                    slot="input"
                    type="text"
                    />
                </toggle-input>
                <toggle-input
                  label="Other">
                  <input name="other"
                    slot="input"
                    type="text"
                    />
                </toggle-input>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                VIP guests
              </legend>
              <div class="fieldset VIP">
                <checkbox-villager name="Sahara"></checkbox-villager>
                <checkbox-villager name="Celeste"></checkbox-villager>
                <checkbox-villager name="Kicks"></checkbox-villager>
                <checkbox-villager name="Leif"></checkbox-villager>
                <checkbox-villager name="Redd"></checkbox-villager>
              </fieldset>
              <fieldset>
                <style>
                  input[type="submit"] {
                    font-family: inherit;
                    font-size: inherit;
                    border: none;
                    width: 100%;
                    padding: 1em;
                    background: var(--blue);
                    color: white;
                    border-radius: 99px;
                  }
                </style>
                <input type="submit" name="nextStep" />
              </fieldset>
            </div>
          </form>
          <button type="button" data-close-dialog>Close</button>
        </div>
        <div class="dialog-padding">
        </div>
      </details-dialog>
    </details>
  </div>
`;

customElements.define('create-island', class CreateIsland extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let inputDodo = this.shadowRoot.getElementById(ids.dodo.input),
    errorDodo = this.shadowRoot.getElementById(ids.dodo.error),
    submitDodo = this.shadowRoot.getElementById(ids.dodo.submit);

    inputDodo.addEventListener("input", e => {
      errorDodo.innerHTML = "";
    });

    let dialog = this.shadowRoot.querySelector("details-dialog");
    dialog.addEventListener("click", e => {
      if (e.target.tagName == "DETAILS-DIALOG") {
        submitDodo.click(); // Close dialog
      }
    });

    let form = this.shadowRoot.getElementById(ids.dialog.form);
    submitDodo.addEventListener("click", e => {
      if (validateDodo(inputDodo.value) == false) {
        e.preventDefault();
        errorDodo.innerHTML = "Incorrect Dodo Code format. Please try again.";
      } else {
        form.elements["dodoCode"].value = inputDodo.value;
        setTimeout(() => form.elements["islandName"].focus(), 1);
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