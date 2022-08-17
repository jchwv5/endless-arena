export default function fetchInventoryByPlayerId(
  setInventory,
  setLoadInventoryDone,
  id,
) {
  return fetch(`https://endless-arena.herokuapp.com/inventory/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setInventory(responseJson);
      setLoadInventoryDone(true);
    })
    .catch(error => {
      console.error(error);
    });
}
