/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import fetchInventoryByPlayerId from '../inventory/InventoryService';
import fetchPlayerByEmail from '../player/FetchPlayerService';
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
  const [equippedSkill1, setEquippedSkill1] = useState(undefined);
  const [equippedSkill2, setEquippedSkill2] = useState(undefined);
  const [equippedSkill3, setEquippedSkill3] = useState(undefined);
  const [equippedSkill4, setEquippedSkill4] = useState(undefined);
  const [loadPlayerDone, setLoadPlayerDone] = useState(undefined);
  const [loadInventoryDone, setLoadInventoryDone] = useState(undefined);

  useFocusEffect(
    React.useCallback(() => {
      fetchPlayerByEmail(setPlayer, setLoadPlayerDone, 'jchwv5@gmail.com');
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (player !== undefined && (target === 'Combat' || 'Landing')) {
        fetchInventoryByPlayerId(
          setInventoryItems,
          setLoadInventoryDone,
          player.id,
        );
      }
    }, [loadPlayerDone]),
  );

  useEffect(() => {
    if (player !== undefined) {
      setEquippedSkill1({skill: player.equippedSkill1, cooldown: 0});
      setEquippedSkill2({skill: player.equippedSkill2, cooldown: 0});
      setEquippedSkill3({skill: player.equippedSkill3, cooldown: 0});
      setEquippedSkill4({skill: player.equippedSkill4, cooldown: 0});
    }
  }, [loadPlayerDone]);

  useEffect(() => {
    if (target === 'Combat' || 'Landing') {
      if (player !== undefined && inventoryItems !== undefined) {
        navigation.navigate(target, {
          player: player,
          rightWeapon: player.rightWeapon,
          leftWeapon: player.leftWeapon,
          armor: player.armor,
          inventoryItems: inventoryItems,
          setInventoryItems: setInventoryItems,
          equippedSkill1: equippedSkill1,
          equippedSkill2: equippedSkill2,
          equippedSkill3: equippedSkill3,
          equippedSkill4: equippedSkill4,
          setPlayer: setPlayer,
        });
      }
    }
    if (target === 'Inventory') {
      if (inventoryItems !== undefined) {
        navigation.navigate(target, {inventoryItems: inventoryItems});
      }
    }
  }, [loadPlayerDone, loadInventoryDone, player, inventoryItems]);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
