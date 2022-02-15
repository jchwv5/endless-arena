const itemImages = name => {
  switch (name) {
    case 'Rusted Armor':
      return require('../../assets/RustedArmor.png');
    case 'Rusted Shield':
      return require('../../assets/RustedShield.png');
    case 'Broken Sword':
      return require('../../assets/BrokenSword.png');
    case 'Healing Potion':
      return require('../../assets/Potion.png');
    case 'Mana Potion':
      return require('../../assets/ManaPotion.png');
    case 'Green Goo':
      return require('../../assets/GreenGoo.png');
    case 'Copper Ore':
      return require('../../assets/CopperOre.png');
    case 'Iron Ore':
      return require('../../assets/IronOre.png');
    case 'Healing Potion':
      return require('../../assets/Potion.png');
    case 'Wolf Fang':
      return require('../../assets/WolfFang.png');
    case 'Wolf Pelt':
      return require('../../assets/WolfPelt.png');
    case 'Bone':
      return require('../../assets/Bone.png');
    case 'Skull':
      return require('../../assets/Skull.png');
  }
};

export default itemImages;
