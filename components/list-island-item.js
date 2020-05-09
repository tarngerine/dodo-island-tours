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
      font-size: 2em;
      line-height: 1.2em;
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

    img.vip {
      max-width: 3em;
      max-height: 3em;
    }

    .footer {
      display: grid;
      grid-auto-flow: column;
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
        Marmalade
      </div>
      <div class="hemisphere">
        Northern Hemisphere
      </div>
      <div class="schedule-link">
        See full schedule ->
      </div>
    </div>
    <div class="features">
      <div class="features-wrap">
        <div class="star-feature">
          <strong>Rare items</strong>
          <br>
          <span>Royal Crown @ Able's</span>
        </div>
        <div class="feature">
          <div class="label">
            Turnips
          </div>
          <div class="value">
            568 bells/turnip
          </div>
        </div>
        <div class="feature">
          <div class="label">
            DIY
          </div>
          <div class="value">
            Pitfall seed - house with pink flowers outside
          </div>
        </div>
        <div class="feature">
          <div class="label">
            VIP
          </div>
          <div class="value">
            <img src="../img/celeste.webp" class="vip"/>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="fee">
        No fee
      </div>
      <div class="fee-note">
        Desired Donations: star fragments or anything on my wishlist https://nook.exchange/u/sabrina/wishlist
      </div>
      <div class="next-tour">
        Next available tour:
        <br>
        <strong class="next-tour-time">4:15-4:35PM</strong>
      </div>
      <div class="book">
        <button>Book now</button>
      </div>
    </div>
  </li>
`;

customElements.define('list-island-item', class ListIslandItem extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // this.this.getAttribute('')
  }
})