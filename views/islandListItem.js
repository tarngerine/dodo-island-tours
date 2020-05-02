import islandListMeta from './islandListMeta.js';
import islandListTours from './islandListTours.js';

export default (data) => {
  console.log(data)
  return `
    <h3>${data.islandName}</h3>
    <p>${data.description}</p>
    ${islandListMeta(data)}
    ${islandListTours(data.tours, data.islandTimeOffset, data.islandId)}
  `;
};
