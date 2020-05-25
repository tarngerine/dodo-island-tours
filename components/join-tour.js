// <join-tour>
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

    :host {
      display: inline-block;
    }

    .join-button {
      text-align: center;
    }

    .join-button::before {
      content: '';
      background-image: url("./img/toggle-input-plus.svg");
      background-size: 36px;
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      font-size: 36px;
      line-height: 32px;
      width: 48px;
      height: 48px;
      border-radius: 99px;
      box-shadow: var(--shadow);
      margin-bottom: .25em;
    }

    .contents {
      display: grid;
      grid-gap: 2px;
      grid-template-rows: auto auto 1fr;
      height: 100%;
      width: 24em;
    }

    .header {
      padding: 1em;
      font-weight: 800;
    }

    .schedule, form, .confirmation, .error {
      background: white;
      color: black;
      padding: 1em;
    }

    .name {
      line-height: 2.5em;
      padding-bottom: 1em;
    }

    label {
      height: 100%;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: .5em;
      font-size: inherit;
      line-height: inherit;
      align-items: center;
    }

    input[type="text"], button, input, label {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      border: none;
    }

    input[type="text"] {
      border-bottom: 2px solid var(--blue);
      border-top: 2px solid transparent;
      height: 100%;
    }

    textarea {
      width: 100%;
    }

    button {
      color: var(--blue);
      background: white;
      text-decoration: underline;
      border-radius: 99px;
      padding: 1em;
      display: inline-grid;
      text-align: center;
      align-items: center;
      cursor: default;
      font-weight: 800;
    }

    button[type="submit"] {
      background: var(--yellow);
      color: black;
      text-decoration: none;
      float: right;
    }

    .view-ticket {
      float: right;
    }
  </style>
  <island-dialog>
    <div class="join-button"
      slot="summary">
      Join
    </div>
    <div class="contents"
    slot="contents">
      <div class="header">
        <slot name="fruit"></slot>
        &nbsp;Ticket to
        <slot name="name"></slot>
      </div>
      <div class="schedule">
        <slot name="time"></slot>
      </div>
      <form>
        <div class="name">
          <label>
            In-game name:
            <input type="text" name="traveler" required />
          </label>
        </div>
        <button type="button" data-close-dialog>Cancel</button>
        <button type="submit">Confirm Tour</button>
      </form>
      <div class="confirmation" style="display: none">
        <p>
          Your spot is confirmed. At the start of the time slot, the Dodo code will be revealed. Please respect the tour schedule and be sure to leave through the airport by the end of the time slot.
        </p>
        <p>
          This link is your ticket to the tour — DO NOT LOSE IT. Click "Done" to be directed to it.
          <textarea class="ticket-link" rows="5"></textarea>
        </p>

        <button class="add-calendar">Add to Calendar</button>
        <button class="view-ticket">Done</button>
      </div>
      <div class="error" style="display: none">
        <p class="message">
          Unfortunately, the queue for that tour is full. Please refresh the page to find another tour.
        </p>
        <button class="refresh">Refresh</button>
      </div>
    </div>
  </island-dialog>
`;

customElements.define('join-tour', class JoinTour extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._tour = {};
  }

  set tour(value) {
    this._tour = value;
  }

  get tour() {
    return this._tour;
  }

  connectedCallback() {
    console.log(this._tour)
    let form = this.shadowRoot.querySelector("form");
    let conf = this.shadowRoot.querySelector(".confirmation");
    let ticketLink = this.shadowRoot.querySelector(".ticket-link");
    let error = this.shadowRoot.querySelector(".error");
    
    form.addEventListener("submit", e => {
      e.preventDefault();
      this.joinTour(this._tour.islandId, this._tour.tourId, form.elements["traveler"].value)
        .then(data => {
          console.log(data);
          if (data.hasOwnProperty('ticketId')) {
            form.style = "display: none";
            conf.style = "display: block";
            ticketLink.value = `${window.location.href}&ticketId=${data.ticketId}&tourId=${this._tour.tourId}`
          } else {
            form.style = "display: none";
            error.style = "display: block";
          }
        })
    })

    let refresh = this.shadowRoot.querySelector(".refresh");
    refresh.addEventListener("click", e => {
      window.location.reload();
    })

    let done = this.shadowRoot.querySelector(".view-ticket");
    done.addEventListener("click", e => {
      window.location = ticketLink.value;
    })

    // Dirty hack for closing the dialog
    let close = this.shadowRoot.querySelector("[data-close-dialog]");
    let d = this.shadowRoot.querySelector("island-dialog");
    close.addEventListener("click", e => {
      d.shadowRoot.querySelector("summary").click();
    })
  }

  joinTour(islandId, tourId, travelerName) {
    return fetch("https://julius-dodo.builtwithdark.com/requestTicket", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        islandId: islandId,
        tourId: tourId,
        travelerName: travelerName,
      }),
    }).then(response => {
      return response.json();
    });
  }
});