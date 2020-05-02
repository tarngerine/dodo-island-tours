import { formatTourTime } from './tourTime.js'

export default (tours, offset, islandId) => {
  let html = '<ol>';
  for (let tourId in tours) {
    let t = tours[tourId];
    html += `
      <li>
        ${formatTourTime(new Date(t.timeStart), new Date(t.timeEnd), offset)}
        <br />
        ${t.travelerIds.length}/${t.maxVisitors} visitors queued

        ${(t.travelerIds.length < t.maxVisitors) ? `
          <form class="form-join" data-island-id="${islandId}" data-tour-id="${tourId}">
            <button type="submit">Join tour</button>
          </form>` : ''
        }

        
      </li>
    `;
  }
  html += '</ol>';
  return html;
}