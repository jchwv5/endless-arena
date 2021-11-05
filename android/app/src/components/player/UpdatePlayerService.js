export default function updatePlayerById(player, playerExperience, setPlayer) {
  const playerId = player.id;
  const newLevel = player.level + 1;
  const newHealth = player.health + 5;
  const newAtk = player.atk + 1;
  const newAgi = player.agi + 1;
  const newIntel = player.intel + 1;
  const newWill = player.will + 1;
  const newCon = player.con + 1;
  const newExp = playerExperience - 100;
  return fetch(`https://oio--monsters-api.herokuapp.com/players/${playerId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: playerId,
      name: player.name,
      level: newLevel,
      health: newHealth,
      atk: newAtk,
      agi: newAgi,
      intel: newIntel,
      will: newWill,
      con: newCon,
      exp: newExp,
      weaponId: player.weaponId,
      shieldId: player.shieldId,
      armorId: player.armorId,
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
