export default function fetchShieldById(setShield, id) {
  return fetch(`https://oio--monsters-api.herokuapp.com/shields/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      setShield(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
