// <tour-time>
// Simple span containing a tour time
//
import { html } from '../lib/toto.js';
import { joinIsland } from '../js/visitor.js';

const template = document.createElement('template');
template.innerHTML = html`
  <span>
  </span>
`;

customElements.define('tour-time', class TourTime extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let span = this.querySelector("span");
    span.innerHTML = formatTourTime(
      new Date(this.getAttribute("timeStart")),
      new Date(this.getAttribute("timeEnd")),
      +this.getAttribute("offset"),
    )

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

      return `
        ${timeStart.toLocaleTimeString([], {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        —
        ${timeEnd.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })}
        ${
            offset != localOffset() ?
              `(Island time:
          ${timeStr(convertToIslandTime(timeStart, offset))}
          —
          ${timeStr(convertToIslandTime(timeEnd, offset))}
          )` : ''
            }
      `;
    }

    // Returns local timezone offset in GMT, i.e. central time: -5
    function localOffset() {
      return -(new Date().getTimezoneOffset() / 60);
    }
  }
})