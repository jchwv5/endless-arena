import updateInventoryById from '../inventory/UpdateInventoryService';
import fetchInventoryByPlayerId from '../inventory/InventoryService';
import createInventory from '../inventory/CreateInventoryService';
import {v4 as uuidv4} from 'uuid';

export default function lootCheck(
  player,
  lootTableRolls,
  lootTable,
  loot,
  inventoryItems,
  setInventoryItems,
) {
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
        const found = loot.some(lootItem => {
          if (lootItem.item.id === entry.item.id) {
            lootItem.quantity = lootItem.quantity + 1;
            return true;
          }
        });
        if (!found) {
          loot.push({item: entry.item, quantity: 1});
        }
      }
    }
  }
  for (const entry of loot) {
    const found = inventoryItems.some(inventoryItem => {
      if (inventoryItem.item.id === entry.item.id) {
        inventoryItem.quantity = inventoryItem.quantity + entry.quantity;
        updateInventoryById(
          inventoryItem.id,
          player,
          inventoryItem.item,
          inventoryItem.quantity,
        );
        fetchInventoryByPlayerId(setInventoryItems, player.id);
        return true;
      }
    });
    if (!found) {
      inventoryItems.push({
        id: uuidv4(),
        player: player,
        item: entry.item,
        quantity: entry.quantity,
      });
      let newItem = inventoryItems[inventoryItems.length - 1];
      createInventory(
        newItem.id,
        newItem.player,
        newItem.item,
        newItem.quantity,
      );
      fetchInventoryByPlayerId(setInventoryItems, player.id);
    }
  }
}
