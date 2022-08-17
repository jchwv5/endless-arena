export default async function fetchPlayerByEmail(
  setPlayer,
  setLoadPlayerDone,
  email,
) {
  return fetch(`https://endless-arena.herokuapp.com/players/${email}`)
    .then(response => response.json())
    .then(responseJson => {
      setPlayer(responseJson);
      setLoadPlayerDone(true);
    })
    .catch(error => {
      console.error(error);
    });
}
