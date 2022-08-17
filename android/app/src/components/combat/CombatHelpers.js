import {reduceStatusDurations} from './StatusHelpers';

export function critCheck(critChance) {
  if (Math.floor(Math.random() * 101) <= critChance) {
    return true;
  }
}

export function calculateDamage(attacker, weapon) {
  const attackResult = {
    damage: 0,
    critResult: false,
  };
  const atk = Math.round((attacker.str - 1) / 2);
  let weaponDamage = Math.floor(
    Math.random() * (weapon.maxAttack - weapon.minAttack + 1) +
      weapon.minAttack,
  );
  if (critCheck(weapon.critChance)) {
    weaponDamage = weaponDamage * 2;
    attackResult.critResult = true;
  }
  attackResult.damage = atk + weaponDamage;

  return attackResult;
}

export function endPlayerTurn(
  equippedSkill1Cooldown,
  setEquippedSkill1Cooldown,
  equippedSkill2Cooldown,
  setEquippedSkill2Cooldown,
  equippedSkill3Cooldown,
  setEquippedSkill3Cooldown,
  equippedSkill4Cooldown,
  setEquippedSkill4Cooldown,
  playerStatuses,
  setPlayerTurn,
  setMonsterTurn,
) {
  if (equippedSkill1Cooldown > 0) {
    setEquippedSkill1Cooldown(equippedSkill1Cooldown - 1);
  }
  if (equippedSkill2Cooldown > 0) {
    setEquippedSkill2Cooldown(equippedSkill2Cooldown - 1);
  }
  if (equippedSkill3Cooldown > 0) {
    setEquippedSkill3Cooldown(equippedSkill3Cooldown - 1);
  }
  if (equippedSkill4Cooldown > 0) {
    setEquippedSkill4Cooldown(equippedSkill4Cooldown - 1);
  }
  reduceStatusDurations(playerStatuses);
  setPlayerTurn(false);
  setMonsterTurn(true);
}
