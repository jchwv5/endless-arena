import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import fetchInventoryByPlayerId from '../../inventory/InventoryService';
import fetchPlayerById from '../player/FetchPlayerService';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const Loading = ({route, navigation}) => {
  const {target} = route.params;
  const [player, setPlayer] = useState(undefined);
  const [inventoryItems, setInventoryItems] = useState(undefined);
  const [weapon, setWeapon] = useState(undefined);
  const [shield, setShield] = useState(undefined);
  const [armor, setArmor] = useState(undefined);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchPlayerById(setPlayer, setWeapon, setShield, setArmor, setDone, 1);
    fetchInventoryByPlayerId(setInventoryItems, 1);
  }, []);

  useEffect(() => {
    if (target === 'Character' || 'Combat' || 'Landing') {
      if (
        player !== undefined &&
        armor !== undefined &&
        weapon !== undefined &&
        shield !== undefined
      ) {
        navigation.navigate(target, {
          player: player,
          weapon: weapon,
          shield: shield,
          armor: armor,
          setPlayer: setPlayer,
        });
      }
    }
    if (target === 'Inventory') {
      if (inventoryItems !== undefined) {
        navigation.navigate(target, {inventoryItems: inventoryItems});
      }
    }
  }, [armor, done, inventoryItems, navigation, player, shield, target, weapon]);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
