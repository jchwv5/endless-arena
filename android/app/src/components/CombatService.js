import constants from '../utils/constants';

/**
 * function to retrieve all patients from the database
 */
export default function fetchMonsterById(setMonster, id) {
  return fetch(`https://oio--monsters-api.herokuapp.com/monsters/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      setMonster(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
