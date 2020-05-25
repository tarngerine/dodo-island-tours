

// <list-island-item-schedule>
// Schedule for an island's list-item
//
import { html } from '../lib/toto.js';
import { joinIsland } from '../js/visitor.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      display: block;
      background: white;
    }

    .schedule-header {
      padding: 1em;
      font-weight: 600;
    }
  </style>
  <div class="schedule">
    <div class="schedule-header">
      Today's available tours
    </div>
    <ol class="schedule-list">
    </ol>
  </div>
`;

let tourTemplate = document.createElement('template');
tourTemplate.innerHTML = html`
  <div class="tour">
    <details>
      <summary>
        <tour-time>
        </tour-time>
      </summary>
      <ul>
      </ul>
    </details>
  </div>
`;

let travelerTemplate = document.createElement('template');
travelerTemplate.innerHTML = html`
  <div class="traveler">
    <span class="traveler-name">
    </span>
  </div>
`;

let joinTemplate = document.createElement('template');
joinTemplate.innerHTML = html`
  <div class="join">
    <button>Join</button>
  </div>
`;

customElements.define('list-island-item-schedule', class ListIslandItemSchedule extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._island = {};
  }

  set island(value) {
    this._island = value;
  }

  get island() {
    return this._island;
  }

  connectedCallback() {
    // let schedule = this._schedule;
    console.log(this._island)

    let list = this.shadowRoot.querySelector(".schedule-list");
    this._island.tours.forEach(t => {
      let tour = tourTemplate.content.cloneNode(true);
      let tourTime = tour.querySelector("tour-time");
      tourTime.setAttribute("timeStart", t.timeStart);
      tourTime.setAttribute("timeEnd", t.timeEnd);
      tourTime.setAttribute("offset", this._island.islandTimeOffset);

      let slots = tour.querySelector("ul");
      t.travelerIds.forEach(traveler => {
        let el = travelerTemplate.content.cloneNode(true);
        el.querySelector("traveler-name").innerHTML = traveler;
        slots.appendChild(el);
      });
      for(let i = 0; i < t.maxVisitors - t.travelerIds.length; i++) {
        let el = joinTemplate.content.cloneNode(true);
        slots.appendChild(el);
      }
      list.appendChild(tour);
    });
    
    // let button = this.shadowRoot.querySelector("button");
    // button.setAttribute("data-island-id", island.islandId);
    // button.setAttribute("data-tour-id", nextTourId);
    // button.addEventListener("click", joinIsland);
  }
});