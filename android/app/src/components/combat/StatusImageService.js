const statusImages = name => {
  switch (name) {
    case 'Stun':
      return require('../../assets/Stun.png');
    case 'Bleeding':
      return require('../../assets/Bleeding.png');
    case 'Stealth':
      return require('../../assets/Stealth.png');
  }
};

export default statusImages;
