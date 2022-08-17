import React from 'react';
import {Text} from 'react-native';

export function stunCheck(statuses, name, combatMessages) {
  return statuses.some(status => {
    if (status.name === 'Stun') {
      combatMessages.push(
        <Text>
          {name} is Stunned!{'\n'}
        </Text>,
      );
      return true;
    } else {
      return false;
    }
  });
}

export function reduceStatusDurations(statuses) {
  for (status of statuses) {
    status.duration = status.duration - 1;
    if (status.duration <= 0) {
      statuses.splice(statuses.indexOf(status));
    }
  }
}
