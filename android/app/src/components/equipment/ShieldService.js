export default function fetchShieldById(setShield, id) {
  return fetch(`https://infinite-arena-api.herokuapp.com/items/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setShield(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
