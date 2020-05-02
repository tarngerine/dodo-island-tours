import { getIslands } from './views/islandList.js';
import { formatTourTime, convertToIslandTime, localOffset } from './views/tourTime.js';

let form = document.getElementById("form-island");
form.addEventListener('submit', handleFormHost);

function handleFormHost(e) {
  e.preventDefault();
  let payload = {};
  for (let el of e.target.elements) {
    if (el.type == "submit") break;
    switch (el.type) {
      case 'submit':
        break;
      case 'checkbox':
        payload[el.name] = el.checked;
        break;
      case 'number':
        payload[el.name] = parseInt(el.value);
        break;
      default:
        payload[el.name] = el.value;
    }
  }
  payload.tours = genTours();
  newHost(payload);
}

function newHost(payload) {
  fetch("https://julius-dodo.builtwithdark.com/newIsland", {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(payload),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      window.location = `host.html?islandId=${data.islandId}`;
    });
}


function handleIslandTime() {
  form.elements["islandTimeOffsetUTC"].value = +form.elements["islandTimeOffsetLocal"].value + localOffset();
  document.getElementById("islandTime").innerHTML = `Island time is ${convertToIslandTime(
    new Date(),
    form.elements["islandTimeOffsetUTC"].value)
      .toLocaleTimeString([], {
        month:"short",
        day:"2-digit",
        hour:"2-digit",
        minute:"2-digit",
      })}`;
  previewSchedule();
}

setInterval(handleIslandTime, 1000)

handleIslandTime();
form.elements["islandTimeOffsetLocal"].addEventListener("change", handleIslandTime);
form.elements["islandTimeOffsetLocal"].addEventListener("keyup", handleIslandTime);
form.elements["tourDuration"].addEventListener("change", previewSchedule);
form.elements["tourDuration"].addEventListener("keyup", previewSchedule);


function genTours() {
  let startTime = new Date();
  let duration = form.elements["tourDuration"].value;
  startTime.setMinutes(Math.ceil(startTime.getMinutes()/10) * 10); // Start tours at next 5 min mark
  
  let tourSlots = form.elements["sessionDuration"].value * 60 / duration;
  let tours = [];
  for (let i = 0; i < tourSlots; i++) {
    let dur = duration * 60000;
    tours.push({
      timeStart: new Date(startTime.getTime() + (dur * i)),
      timeEnd: new Date(startTime.getTime() + (dur * (i+1))),
    })
  }
  return tours;
}

function previewSchedule() {
  let html = '';
  genTours().forEach(t => {    
    html += `
      <li>
        ${formatTourTime(t.timeStart, t.timeEnd, form.elements["islandTimeOffsetUTC"].value)}
      </li>
    `;
  })
  document.getElementById("schedule-preview").innerHTML = html;
}

form.elements["sessionDuration"].addEventListener("change", previewSchedule);
previewSchedule();
getIslands();