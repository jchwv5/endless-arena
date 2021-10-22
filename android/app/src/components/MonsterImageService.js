const monsterImages = name => {
  switch (name) {
    case 'Slime':
      return require('../assets/Slime.png');
    case 'Bat':
      return require('../assets/Bat.png');
    case 'Skeleton':
      return require('../assets/Skeleton.png');
    case 'Wolf':
      return require('../assets/Wolf.png');
    case 'Goblin':
      return require('../assets/Goblin.png');
  }
};

export default monsterImages;
