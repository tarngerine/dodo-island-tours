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
      <list-island-item>Hello</list-island-item>
    </ol>
  </div>
</div>  
`;

customElements.define('list-island', class ListIsland extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {

  }
})