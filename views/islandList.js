import listItem from './views/islandListItem.js'
import { joinIsland } from './js/visitor.js';

let getIslands = () => {
  fetch("https://julius-dodo.builtwithdark.com/islands")
    .then(response => {
      if (response.status !== 200) throw(response)
      return response.json()
    })
    .catch(e => console.log(e))
    .then(data => {
      let html = '';
    
      if (data.length == 0) {
        html += "No tours right now — host one of your own!"
      }

      data.forEach(island => {
        html += `
          <li>
            ${listItem(island, island.islandId)}
          </li>
        `;
      })
      document.getElementById("list-islands").innerHTML = html;

      document.querySelectorAll(".form-join").forEach(f => {
        f.addEventListener("submit", joinIsland);
      })
    })
}

export {getIslands};