const skillImages = name => {
  switch (name) {
    case 'Backstab':
      return require('../../assets/Backstab.png');
    case 'Shield Bash':
      return require('../../assets/Shield-Bash.png');
    case 'Double Strike':
      return require('../../assets/Double-Strike.png');
    case 'Vanish':
      return require('../../assets/Vanish.png');
  }
};

export default skillImages;
