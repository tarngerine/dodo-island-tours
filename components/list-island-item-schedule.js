

// <list-island-item-schedule>
// Schedule for an island's list-item
//
import { html } from '../lib/toto.js';
import { joinIsland } from '../js/visitor.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    * {
      box-sizing: border-box;
    }

    ul, ol {
      padding: 0;
      margin: 0;
    }

    :host {
      display: block;
      background: white;
    }

    .schedule-header {
      padding: 1em;
      font-weight: 800;
    }

    .local-time {
      font-weight: 800;
    }

    .tour {
      color: var(--blue);
      border-bottom: 1px solid var(--blue);
      padding: 1em;
    }

    .tour details[open] {
      color: black;
    }

    .tour ul {
      padding: 1em;
    }

    .tour li {
      padding: 0 1em;
      list-style-type: none;
      display: inline-block;
    }

    .schedule-footer {
      font-size: .75em;
      text-align: center;
      padding: 1em;
    }

    .confirmed {
      display: inline-block;
      border-radius: 99em;
      background: var(--green);
      padding: .5em 1em;
      margin-left: .5em;
    }

    .traveler {
      display: inline-block;
      text-align: center;
    }

    .traveler.current {
      font-weight: 800;
    }

    .traveler::before {
      content: '';
      display: block;
      border: 2px solid rgba(0,0,0,.3);
      width: 48px;
      height: 48px;
      border-radius: 99px;
      box-shadow: var(--shadow);
      margin: 0 auto;
      margin-bottom: .25em;
    }

    .traveler.current::before {
      border-color: var(--green);
    }
  </style>
  <div class="schedule">
    <div class="schedule-header">
      Today's available tours
    </div>
    <ol class="schedule-list">
    </ol>
    <div class="schedule-footer">
      Hello!
    </div>
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
    Object.keys(this._island.tours).forEach((k, index) => {
      let t = this._island.tours[k];
      let tour = tourTemplate.content.cloneNode(true);

      let tourId = new URLSearchParams(window.location.search).get("tourId");
      let ticketId = new URLSearchParams(window.location.search).get("ticketId");
      let matchedTicket = t.travelers.find(tr => {
        return tr.ticketId === ticketId;
      })
      if (t.tourId === tourId && matchedTicket !== undefined) {
        tour.querySelector("details").setAttribute("open", "");
        let el = document.createElement("div");
        el.innerHTML = "You are confirmed for this tour";
        el.classList.add("confirmed");
        tour.querySelector("summary").appendChild(el);
      }
      let tourTime = tour.querySelector("tour-time");
      tourTime.setAttribute("timeStart", t.timeStart);
      tourTime.setAttribute("timeEnd", t.timeEnd);
      tourTime.setAttribute("offset", this._island.islandTimeOffset);

      let slots = tour.querySelector("ul");
      t.travelers.forEach(traveler => {
        let li = document.createElement("li");
        let el = travelerTemplate.content.cloneNode(true);
        el.querySelector(".traveler-name").innerHTML = traveler.travelerName;
        if (traveler.ticketId === ticketId) {
          el.querySelector(".traveler").classList.add("current");
        }
        li.appendChild(el);
        slots.appendChild(li);
      });

      for(let i = 0; i < t.maxVisitors - t.travelers.length; i++) {
        let li = document.createElement("li");
        let el = document.createElement("join-tour");
        el.innerHTML = `
          <span slot="fruit">${this._island.fruit}</span>
          <span slot="name">${this._island.islandName}</span>
          <span slot="time">
            <tour-time timeStart="${t.timeStart}" timeEnd="${t.timeEnd}" offset="${this._island.islandTimeOffset}">
          </span>
        `;
        el.tour = t;
        li.appendChild(el);
        slots.appendChild(li);
      }
      list.appendChild(tour);
    });
    
    // let button = this.shadowRoot.querySelector("button");
    // button.setAttribute("data-island-id", island.islandId);
    // button.setAttribute("data-tour-id", nextTourId);
    // button.addEventListener("click", joinIsland);
  }
});