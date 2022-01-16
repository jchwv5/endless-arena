export default function fetchArmorById(setArmor, setDone, id) {
  return fetch(`https://infinite-arena-api.herokuapp.com/items/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setArmor(responseJson);
      setDone(true);
    })
    .catch(error => {
      console.error(error);
    });
}
