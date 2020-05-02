import islandListItem from '../views/islandListItem.js'

let getIsland = () => {
  let islandId = new URLSearchParams(window.location.search).get("islandId");
  fetch("https://julius-dodo.builtwithdark.com/island/" + islandId)
    .then(response => {
      if (response.status !== 200) throw(response)
      return response.json()
    })
    .catch(e => console.log(e))
    .then(data => {
      let html = '';
      html += islandListItem(data);
      document.getElementById("island").innerHTML = html;
    })
}

getIsland();