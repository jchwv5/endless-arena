import updatePlayerById from './UpdatePlayerService';

export default function levelCheck(
  player,
  playerExperience,
  setPlayer,
  setPlayerExperience,
) {
  if (playerExperience >= 100) {
    setPlayerExperience(playerExperience - 100);
    updatePlayerById(player, playerExperience, setPlayer);
  }
}
