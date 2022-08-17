/**
 * function to retrieve all patients from the database
 */
export default function fetchLootTableByMonsterId(setLootTable, id) {
  return fetch(`https://endless-arena.herokuapp.com/common/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setLootTable(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
