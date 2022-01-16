export default function fetchWeaponById(setWeapon, id) {
  return fetch(`https://infinite-arena-api.herokuapp.com/items/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setWeapon(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
