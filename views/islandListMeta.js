import listJSON from './listJSON.js'

export default data => {
  return `
    <table>
      <tr>
        <td>Host</td>
        <td>Fruit</td>
        <td>Stores</td>
        <td>Turnip price</td>
        <td>Shop items</td>
        <td>Visitors</td>
        <td>Recipes</td>
      </tr>
      <tr>
        <td>${data.hostName}</td>
        <td>${data.fruit}</td>
        <td>${listJSON(data.stores)}</td>
        <td>${data.turnipPrice}</td>
        <td>${listJSON(data.shopItems)}</td>
        <td>${listJSON(data.VIPGuests)}</td>
        <td>${listJSON(data.DIY)}</td>
      </tr>
    </table>

    <table>
      <tr>
      <td>Fee</td>
      <td>${listJSON(data.fee)}</td>
      </tr>
    </table>
  `;
}