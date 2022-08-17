export default function createInventory(inventoryId, player, item, quantity) {
  return fetch('https://endless-arena.herokuapp.com/inventory', {
    method: 'POST',
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
