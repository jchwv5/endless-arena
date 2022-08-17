/**
 * function to retrieve all patients from the database
 */
export default function fetchMonsterById(setMonster, id) {
  return fetch(`https://endless-arena.herokuapp.com/monsters/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setMonster(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
