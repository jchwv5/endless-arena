export default function fetchInventoryByPlayerId(setInventory, id) {
  return fetch(`https://infinite-arena-api.herokuapp.com/inventory/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setInventory(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
