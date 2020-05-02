// Turns a JSON blob into a list

export default json => {
  let html = '<ul>';
  for (let k in json) {
    if (json[k] == null) continue;
    if (typeof json[k] == "string" && json[k] == "") continue;
    if (typeof json[k] == "boolean" && json[k] != true) continue;
    html += `
      <li>
        ${Array.isArray(json) ? '' : `${k}:`}
        ${typeof json[k] == 'boolean' ?
          json[k] ? '✅' : '❌' :
          json[k]
        }
      </li>
    `;
  }
  return html;
}