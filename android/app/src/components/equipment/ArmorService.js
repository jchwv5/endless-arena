export default function fetchArmorById(setArmor, setLoadPlayerDone, id) {
  return fetch(`https://endless-arena.herokuapp.com/items/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setArmor(responseJson);
      setLoadPlayerDone(true);
    })
    .catch(error => {
      console.error(error);
    });
}
