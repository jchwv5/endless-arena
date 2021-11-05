export default function fetchPlayerById(setPlayer, id) {
  return fetch(`https://oio--monsters-api.herokuapp.com/players/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      setPlayer(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
