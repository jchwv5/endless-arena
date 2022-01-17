export default function lootCheck(lootTableRolls, lootTable, loot) {
  const lootRolls = [];
  while (lootRolls.length < lootTableRolls) {
    let roll = Math.floor(Math.random() * 100) + 1;
    if (lootRolls.indexOf(roll) === -1) {
      lootRolls.push(roll);
    }
  }
  for (const entry of lootTable) {
    let dropChanceHigh = entry.dropChanceHigh;
    let dropChanceLow = entry.dropChanceLow;
    for (const roll of lootRolls) {
      if (roll >= dropChanceLow && roll <= dropChanceHigh) {
        loot.push(entry.item);
      }
    }
  }
}
