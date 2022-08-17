const cooldownCounter = (cooldown, maxCooldown) => {
  let cooldownRatio = cooldown / maxCooldown;
  if (cooldownRatio === 1) {
    return require('../../assets/CooldownFull.png');
  } else if (cooldownRatio > 0.75 && cooldownRatio < 1) {
    return require('../../assets/CooldownSevenEighths.png');
  } else if (cooldownRatio === 0.75) {
    return require('../../assets/CooldownThreeQuarters.png');
  } else if (cooldownRatio > 0.5 && cooldownRatio < 0.75) {
    return require('../../assets/CooldownFiveEighths.png');
  } else if (cooldownRatio === 0.5) {
    return require('../../assets/CooldownOneHalf.png');
  } else if (cooldownRatio > 0.25 && cooldownRatio < 0.5) {
    return require('../../assets/CooldownThreeEighths.png');
  } else if (cooldownRatio === 0.25) {
    return require('../../assets/CooldownOneQuarter.png');
  } else if (cooldownRatio < 0.25) {
    return require('../../assets/CooldownOneEighth.png');
  }
};

export default cooldownCounter;
