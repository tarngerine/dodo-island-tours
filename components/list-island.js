// <list-island>
// List of all islands
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
  </style>
  <div class="">
    <ol id="list-island">
    </ol>
  </div>
`;

customElements.define('list-island', class ListIsland extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let list = this.shadowRoot.getElementById("list-island");
    fetch("https://julius-dodo.builtwithdark.com/islands")
      .then(response => {
        if (response.status !== 200) throw (response);
        return response.json();
      })
      .catch(e => console.error(e))
      .then(data => {
        let html = '';
        if (data.length == 0) {
          html += "No tours right now — host one of your own!"
        }

        data.forEach(island => {
          let item = document.createElement("list-island-item");
          item.island = island;
          list.appendChild(item);
        });

        // document.querySelectorAll(".form-join").forEach(f => {
        //   f.addEventListener("submit", joinIsland);
        // })
      })
  }
})