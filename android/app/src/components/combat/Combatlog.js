export default function addCombatMessage(
  combatMessages,
  attacker,
  attack,
  defender,
  damage,
) {
  combatMessages.push(
    `${attacker} ${attack} on ${defender} for ${damage} damage`,
  );
}
