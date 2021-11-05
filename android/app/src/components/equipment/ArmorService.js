export default function fetchArmorById(setArmor, id) {
  return fetch(`https://oio--monsters-api.herokuapp.com/armor/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      setArmor(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
