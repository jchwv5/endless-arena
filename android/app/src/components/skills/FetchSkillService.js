/**
 * function to retrieve all patients from the database
 */
export default function fetchSkillById(setSkill, id) {
  return fetch(`https://endless-arena.herokuapp.com/skills/${id}`)
    .then(response => response.json())
    .then(responseJson => {
      setSkill(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
