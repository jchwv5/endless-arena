export default function updatePlayerById(
  player,
  playerExperience,
  levelUp,
  setPlayer,
) {
  const playerId = player.id;
  let newLevel = player.level;
  let newHealth = player.health;
  let newStr = player.str;
  let newAgi = player.agi;
  let newIntel = player.intel;
  let newWill = player.will;
  let newCon = player.con;
  let newExp = playerExperience;
  if (levelUp === true) {
    newLevel = player.level + 1;
    newHealth = player.health + 5;
    newStr = player.str + 1;
    newAgi = player.agi + 1;
    newIntel = player.intel + 1;
    newWill = player.will + 1;
    newCon = player.con + 1;
    newExp = playerExperience - 100;
  }
  return fetch(`https://endless-arena.herokuapp.com/players/${playerId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: playerId,
      name: player.name,
      email: player.email,
      level: newLevel,
      health: newHealth,
      str: newStr,
      agi: newAgi,
      intel: newIntel,
      will: newWill,
      con: newCon,
      exp: newExp,
      rightWeapon: player.rightWeapon,
      leftWeapon: player.leftWeapon,
      armor: player.armor,
      equippedSkill1: player.equippedSkill1,
      equippedSkill2: player.equippedSkill2,
      equippedSkill3: player.equippedSkill3,
      equippedSkill4: player.equippedSkill4,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      setPlayer(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}
