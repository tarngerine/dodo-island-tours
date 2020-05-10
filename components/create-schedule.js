// <create-schedule>
// Form components that create and preview a schedule
//
import { html } from '../lib/toto.js';
import { formatTourTime, convertToIslandTime, localOffset } from '../views/tourTime.js';

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    * {
      box-sizing: border-box;
    }

    .inputs {
      padding-top: 1.5em;
    }
    
    .inputs label {
      display: grid;
      grid-template-columns: 4fr 1fr;
      grid-gap: 1.5em;
      align-items: start;
      padding-bottom: 1.5em;
    }

    strong {
      font-weight: 500;
    }
    
    .inputs strong {
      display: inline-block;
      padding-bottom: .5em;      
    }

    .note {
      font-size: .75em;
      line-height: .75em;
    }

    .inputs input {
      border: none;
      text-align: center;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      box-shadow: var(--shadow);
      border-radius: 99px;
      padding: .5em;
      width: 100%;
    }
    
    .custom-select-wrap {
      display: grid;
      grid-template-rows: 2.5em;
    }
    
    .timezone {
      padding: 1em;
      background: rgba(21, 247, 138, 0.25);
      border-radius: 4px;
    }
    
    .timezone-fields {
      padding-top: 1em;
      display: grid;
      grid-template-columns: 1.1fr 2fr 2fr;
      grid-gap: 1em;
    }
    
    .timezone strong {
      grid-column: 1 / -1;
    }
    
    .timezone input {
      border: none;
      border: 2px solid var(--blue);
      border-radius: 4px;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
      height: 2.5em;
      box-shadow: var(--shadow);
      width: 100%;
      padding: .5em;
    }
    
    .input-wrap {
      position: relative;
      align-self: flex-start;
    }

    .input-wrap::after {
      content: 'hrs';
      position: absolute;
      right: 1.5em;
      top: 0;
      bottom: 0;
      display: grid;
      align-items: center;
      line-height: 2.5em;
      pointer-events: none;
    }

    summary {
      color: var(--blue);
      padding-bottom: .5em;
      font-weight: bold;
    }
  </style>
  <div class="timezone">
    <strong>Off-set between your actual time and your island time:</strong>
    <div class="timezone-fields">
      <div class="input-wrap">
        <input type="number" id="islandTimeOffsetLocal" value="0">
        <input type="hidden" name="islandTimeOffsetUTC" value="0">
      </div>
      <div>
        <strong>Actual time:</strong>
        <br>
        <span id="actualTime"></span>
      </div>
      <div>
        <strong>Island time:</strong>
        <br>
        <span id="islandTime"></span>
      </div>
    </div>
  </div>
  <div class="inputs">
    <label>
      <span>
        <strong>
          How many people are allowed on your island at one time?
        </strong>
        <br>
        <span class="note">
          We recommend no more than 4 at a time to avoid interference.
        </span>
      </span>
      <input type="number"
        name="maxVisitors" value="4" min="1" max="8" />
    </label>

    <label>
      <span>
        <strong>
          How long should each group stay on your island?
        </strong>
        <br>
        <span class="note">
          This is in the interval in which your Dodo code will be revealed to each group of visitors. Factor in how many people will be visiting at a time, and how many things they will want to do on your island.
        </span>
      </span>
      <div class="custom-select-wrap">
        <custom-select>
          <select name="tourDuration" required
          aria-label="Tour duration"
          slot="input">
            <option>10m</option>
            <option>15m</option>
            <option>20m</option>
            <option>30m</option>
            <option>60m</option>
          </select>
        </custom-select>
      </div>
    </label>

    <label>
      <span>
        <strong>
          How long will you keep your island open, in hours?
        </strong>
      </span>
      <input type="number"
        name="sessionDuration"
        value="1" min="1" max="24" />
    </label>

    <details open>
      <summary>
        Preview tour schedule
      </summary>
      Tours start at the next 5-minute increment of the hour.
      <ol id="schedule-preview">
      </ol>
    </details>
  </div>
</div>  
`;

customElements.define('create-schedule', class CreateSchedule extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(template.content.cloneNode(true));
    this._tours = [];
  }

  set tours(value) {
    this._tours = value;
  }

  get tours() {
    return this._tours;
  }

  connectedCallback() {
    let offsetLocal = this.shadowRoot.getElementById("islandTimeOffsetLocal"),
      offsetUTC = this.shadowRoot.querySelector('[name="islandTimeOffsetUTC"]'),
      islandTime = this.shadowRoot.getElementById("islandTime"),
      actualTime = this.shadowRoot.getElementById("actualTime"),
      tourDuration = this.shadowRoot.querySelector('[name="tourDuration"]'),
      sessionDuration = this.shadowRoot.querySelector('[name="sessionDuration"]'),
      schedulePreview = this.shadowRoot.getElementById("schedule-preview");
    
    let handleIslandTime = () => {
      let opts = {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      offsetUTC.value = +offsetLocal.value + localOffset();
      this.setAttribute("offset", offsetUTC.value);
      islandTime.innerHTML = convertToIslandTime(
        new Date(), offsetUTC.value)
        .toLocaleTimeString([], opts);
      actualTime.innerHTML = new Date()
        .toLocaleTimeString([], opts)
      previewSchedule();
    }
    handleIslandTime();
    offsetLocal.addEventListener("change", handleIslandTime);
    offsetLocal.addEventListener("keyup", handleIslandTime);
    tourDuration.addEventListener("change", previewSchedule);
    tourDuration.addEventListener("keyup", previewSchedule);
    setInterval(handleIslandTime, 1000)
    setInterval(() => this._tours = genTours(), 1000)


    function genTours() {
      let startTime = new Date();
      let duration = parseInt(tourDuration.value);
      startTime.setMinutes(Math.ceil(startTime.getMinutes() / 10) * 10); // Start tours at next 5 min mark

      let tourSlots = sessionDuration.value * 60 / duration;
      let tours = [];
      for (let i = 0; i < tourSlots; i++) {
        let dur = duration * 60000;
        tours.push({
          timeStart: new Date(startTime.getTime() + (dur * i)),
          timeEnd: new Date(startTime.getTime() + (dur * (i + 1))),
        })
      }
      return tours;
    }

    function previewSchedule() {
      let html = '';
      genTours().forEach(t => {
        html += `
          <li>
            ${formatTourTime(t.timeStart, t.timeEnd, offsetUTC.value)}
          </li>
        `;
      })
      schedulePreview.innerHTML = html;
    }
  }
})