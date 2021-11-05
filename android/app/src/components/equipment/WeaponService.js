export default function fetchWeaponById(setWeapon, id) {
  return fetch(`https://oio--monsters-api.herokuapp.com/weapons/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      setWeapon(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
