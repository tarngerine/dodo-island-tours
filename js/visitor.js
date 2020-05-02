export function joinIsland(e) {
  e.preventDefault();
  let islandId = e.target.getAttribute("data-island-id");
  let tourId = e.target.getAttribute("data-tour-id");

  fetch("https://julius-dodo.builtwithdark.com/requestTicket", {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      islandId: islandId,
      tourId: tourId,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.hasOwnProperty('ticketId')) {
        window.location = `gate.html?ticketId=${data.ticketId}&tourId=${tourId}`;
      } else {
        alert("No spots left, sorry!")
      }
    });
}