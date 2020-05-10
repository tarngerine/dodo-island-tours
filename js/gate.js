import { formatTourTime } from '../views/tourTime.js';

function getTicketInfo() {
  let tourId = new URLSearchParams(window.location.search).get("tourId");
  let ticketId = new URLSearchParams(window.location.search).get("ticketId");
  
  fetch(`https://julius-dodo.builtwithdark.com/getCode?tourId=${tourId}&ticketId=${ticketId}`, {
    method: 'GET',
    headers: {'Content-type': 'application/json'},
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      let html = '';
      html += `<p>Your tour schedule: ${formatTourTime(new Date(data.tour.timeStart), new Date(data.tour.timeEnd), data.island.islandTimeOffset)}</p>`
      if (data.hasOwnProperty('dodoCode')) {
        html += `
          ✈️Use this Dodo Code to get to ${data.island.islandName}!
          <pre>${data.dodoCode}</pre>
        `;
      } else if (data.hasOwnProperty('pending')) {
        html += "⏳Tour not started yet, check this page when the tour starts to get your Dodo Code. Start time may be off by ~10-20seconds depending on the difference between your local clock and our server clock";
        setTimeout((new Date(data.tour.timeStart) - new Date()), getTicketInfo);
      } else if (data.hasOwnProperty('finished')) {
        html += "✅Tour is complete! Hope you enjoyed your trip. <a href='/'>Find another tour</a>."
      }
      document.getElementById("ticket").innerHTML = html;
    });
}

getTicketInfo();