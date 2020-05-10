// <list-island-item>
// List item for an island
//
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    li {
      display: grid;
      grid-template-rows: 3em 10em auto;
      grid-gap: 2px;
      background: var(--blue);
      border-radius: 1em;
      overflow: hidden;
      border: 2px solid var(--blue);
    }
    
    .header {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto auto auto 1fr;
      grid-gap: 1em;
      align-items: center;
      color: white;
      padding: 1em;
    }

    .name {
      font-size: 1.2em;
      font-weight: 700;
    }

    .schedule-link {
      justify-self: end;
    }

    a.schedule-link-anchor {
      color: white;
      text-decoration: none;
      font-weight: 700;
    }

    .features {
      display: grid;
      grid-template-columns: auto 1fr;
      background: grey;
      background-image: url("../img/nook-bg.png");
      background-size: 25%;
      background-repeat: repeat;
    }

    .features-wrap {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 300px;
      grid-auto-columns: min-content;
      grid-gap: 2px;
      padding-right: 2px;
      align-items: stretch;
      background: var(--blue);
    }

    .star-feature {
      background: white;
      padding: 1em;
    }

    .star-feature strong {
      color: var(--blue);
    }

    .star-feature span {
      font-size: 1.8em;
      line-height: 1.2em;
      font-weight: 500;
    }

    .feature {
      display: grid;
      grid-gap: 2px;
      grid-template-rows: auto 1fr;
      width: 150px;
    }

    .label, .value {
      background: white;
      padding: .5em;
    }

    .label {
      color: var(--blue);
      font-weight: 500;
    }

    img.vip {
      max-width: 3em;
      max-height: 3em;
    }

    .footer {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto 1fr auto;
      grid-gap: 1em;
      align-items: center;
      background: white;
      padding: 1em;
    }

    .fee {
      padding: .5em 1em;
      background: var(--green);
      border-radius: 99em;
      text-transform: uppercase;
    }

    .fee-note {
      font-size: .75em;
    }

    .next-tour-label {
      font-size: .75em;
    }

    .next-tour-time {
      color: var(--blue);
    }

    button {
      appearance: none;
      -webkit-appearance: none;
      border: none;
      background: var(--yellow);
      padding: 1em 1.5em;
      border-radius: 99em;
      font-size: inherit;
      font-weight: 700;
      width: 100%;
    }
  </style>
  <li>
    <div class="header">
      <div class="fruit">
        🍊
      </div>
      <div class="name">
      </div>
      <div class="hemisphere">
      </div>
      <div class="schedule-link">
        <a href="#"
          class="schedule-link-anchor">
          See full schedule ->
        </a>
      </div>
    </div>
    <div class="features">
      <div class="features-wrap">
      </div>
    </div>
    <div class="footer">
      <div class="fee">
      </div>
      <div class="fee-note">
        Desired Donations: star fragments or anything on my wishlist https://nook.exchange/u/sabrina/wishlist
      </div>
      <div class="next-tour">
        <span class="next-tour-label">Next available tour:</span>
        <br>
        <strong class="next-tour-time">
          <tour-time>
          </tour-time>
        </strong>
      </div>
      <div class="book">
        <button>Book now</button>
      </div>
    </div>
  </li>
`;

let featureTemplate = document.createElement('template');
featureTemplate.innerHTML = html`
  <div class="feature">
    <div class="label">
    </div>
    <div class="value">
    </div>
  </div>
`;

let featuredTemplate = document.createElement('template');
featuredTemplate.innerHTML = html`
  <div class="star-feature">
    <strong>Rare items</strong>
    <br>
    <span>Royal Crown @ Able's</span>
  </div>
`;

customElements.define('list-island-item', class ListIslandItem extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
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
    let island = this._island;
    console.log(island)
    this.shadowRoot.querySelector(".name").innerHTML = island.islandName;
    this.shadowRoot.querySelector(".fruit").innerHTML = island.fruit;
    // this.shadowRoot.querySelector(".hemisphere").innerHTML = island.hemisphere;
    let features = this.shadowRoot.querySelector(".features-wrap");
    
    let addFeature = (key, l) => {
      if (island[key] === null || island[key] === "") return;
      let f;
      if (island.featured === key) {
        f = featuredTemplate.content.cloneNode(true);
        f.querySelector("strong").innerHTML = l;
        f.querySelector("span").innerHTML = island[key];
        features.prepend(f);
      } else {
        f = featureTemplate.content.cloneNode(true);
        f.querySelector(".label").innerHTML = l;
        if (key === "VIPGuests") {
          let images = '';
          console.log(island[key])
          for(let v in island[key]) {
            if (island[key][v]) {
              images += `<img src="../img/${v}.webp" class="vip" />`
            }
          }
          f.querySelector(".value").innerHTML = images;
        } else { 
          f.querySelector(".value").innerHTML = island[key];
        }
        features.appendChild(f);
      }
    }

    addFeature("rareItems", "Rare items");
    addFeature("turnipPrice", "Turnips");
    addFeature("villagerDIY", "Villager DIY");
    addFeature("weather", "Weather");
    addFeature("other", "Other");
    addFeature("VIPGuests", "VIP");
    this.shadowRoot.querySelector(".fee").innerHTML = island.hasFee ? island.fee : "No fee";
    // this.shadowRoot.querySelector(".fee-note").innerHTML = this.getAttribute("feenote");
    let nextTour = island.tours[Object.keys(island.tours).sort()[0]];
    let tourTime = this.shadowRoot.querySelector("tour-time");
    tourTime.setAttribute("timeStart", nextTour.timeStart);
    tourTime.setAttribute("timeEnd", nextTour.timeEnd);
    tourTime.setAttribute("offset", island.islandTimeOffset);
  }
})