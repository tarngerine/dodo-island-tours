import { html } from '../lib/toto.js';

const ids = {
  dodo: {
    form: "form-dodo-code",
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
        name="dodoCode"
        id="${ids.dodo.input}"
        minlength="5"
        maxlength="5"
      />
      <span id="${ids.dodo.error}"></span>
    </label>
    <button type="submit">
      Submit
    </button>
  </form>
  <dialog id="${ids.dialog.dialog}" open>
    <form id="${ids.dialog.form}">
      <fieldset>
        <label>
          Dodo code
          <input name="dodoCode"
            type="text"  
            maxlength="5"
            required />
        </label>
      </fieldset>
      <fieldset>
        <legend>
          Island basics
        </legend>
        <label>
          Island name
          <input name="islandName"
            type="text" />
        </label>
        <select name="fruit" required
          aria-label="Island fruit">
          <option>🍎</option>
          <option>🍒</option>
          <option>🍊</option>
          <option>🍑</option>
          <option>🍐</option>
        </select>
        <select name="hemisphere" required
          aria-label="Island hemisphere">
          <option>North</option>
          <option>South</option>
        </select>
        <fieldset class="form-island-info-stores">
          <legend>
            Stores
          </legend>
          <label>
            Nook's Cranny (*required)
            <input type="checkbox" name="storeNook" required />
          </label>
          <label>
            Able Sisters
            <input type="checkbox" name="storeAble" />
          </label>
          <label>
            Nook's Cranny Upgraded
            <input type="checkbox" name="storeNookPlus" />
          </label>
        </fieldset>
      </fieldset>
      <fieldset>
        <legend>
          On your island now
        </legend>
        <toggle-input
          label="Turnip price">
          <input name="turnipPrice"
            slot="input"
            type="number"
            max="999"
            min="40"
            value="0"
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
      </fieldset>
    </form>
  </dialog>
`;

customElements.define('create-island', class CreateIsland extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }
})