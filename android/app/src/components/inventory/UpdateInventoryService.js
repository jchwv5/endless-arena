export default function updateInventoryById(
  inventoryId,
  player,
  item,
  quantity,
) {
  return fetch(`https://endless-arena.herokuapp.com/inventory/${inventoryId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: inventoryId,
      player: player,
      item: item,
      quantity: quantity,
    }),
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}
