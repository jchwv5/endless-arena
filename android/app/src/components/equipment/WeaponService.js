export default function fetchWeaponById(setWeapon, id) {
  return fetch(`https://endless-arena.herokuapp.com/items/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setWeapon(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
