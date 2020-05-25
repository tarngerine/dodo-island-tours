// <tour-time>
// LIGHT DOM, not shadow DOM
// Simple span containing a tour time
import { html } from '../lib/toto.js';

const template = document.createElement('template');
template.innerHTML = html`
  <span class="local-time">
  </span>
  <span class="island-time">
  </span>
`;

customElements.define('tour-time', class TourTime extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let localTime = this.querySelector(".local-time");
    let time = formatTourTime(
      new Date(this.getAttribute("timeStart")),
      new Date(this.getAttribute("timeEnd")),
      +this.getAttribute("offset"),
      );
    localTime.innerHTML = `${time.local.start} — ${time.local.end}`;
    if (time.island !== null) {
      let islandTime = this.querySelector(".island-time");
      islandTime.innerHTML = `Island time: ${time.island.start} — ${time.island.end} (${Math.abs(time.island.offset)} hour${time.island.offset === 1 || time.island.offset === -1 ? '' : 's'} ${time.island.offset < 0 ? 'behind' : 'ahead'})`;
    }

    function convertToIslandTime(time, islandOffset) {
      return new Date(time.getTime() + ((-localOffset() + +islandOffset) * 60 * 60 * 1000));
    }

    function formatTourTime(timeStart, timeEnd, offset) {
      let timeStr = (time) => {
        return time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }

      return {
        local: {
          start: timeStart.toLocaleTimeString([], {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          end: timeEnd.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          }),
        },
        island: offset != localOffset() ? {
          start: timeStr(convertToIslandTime(timeStart, offset)),
          end: timeStr(convertToIslandTime(timeEnd, offset)),
          offset: -localOffset() + +offset,
        } : null,
      }
    }

    // Returns local timezone offset in GMT, i.e. central time: -5
    function localOffset() {
      return -(new Date().getTimezoneOffset() / 60);
    }
  }
})