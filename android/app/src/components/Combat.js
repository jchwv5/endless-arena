/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, Image, View, Button, Alert} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Potion from '../assets/Potion.png';
import Scroll from '../assets/Scroll.png';

const styles = StyleSheet.create({
  monster: {
    marginTop: 20,
    marginLeft: 80,
    height: 180,
    width: 180,
    alignItems: 'center',
  },
  potion: {
    marginRight: 10,
    height: 25,
    width: 25,
  },
  scroll: {
    marginRight: 10,
    height: 25,
    width: 25,
  },
  monsterName: {
    color: Colors.white,
    marginTop: 170,
    textAlign: 'center',
  },
  playerName: {
    color: Colors.white,
    marginTop: 25,
    textAlign: 'center',
  },
  monsterHealthBar: {
    color: Colors.white,
    marginTop: 25,
    textAlign: 'center',
    marginBottom: 50,
  },
  playerHealthBar: {
    color: Colors.white,
    marginTop: 25,
    textAlign: 'center',
    marginBottom: 50,
  },
  inventory: {
    color: Colors.white,
  },
  inventoryContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    flexDirection:'row',
    alignItems:'center',
  },
  attackButton: {
    marginHorizontal: 75,
  },
  healButton: {
    marginHorizontal: 75,
  },

});
const Combat = () => {
  const [monsterName, setMonsterName] = useState('Slime');
  const [monsterMaxHealth, setMonsterMaxHealth] = useState(25);
  const [monsterHealth, setMonsterHealth] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerMaxHealth, setPlayerMaxHealth] = useState(50);
  const [potionCount, setPotionCount] = useState(3);
  const [scrollCount, setScrollCount] = useState(5);
  const [killCount, setKillCount] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [monsterTurn, setMonsterTurn] = useState(false);

useEffect(() => {
  setMonsterHealth(monsterMaxHealth);
  setPlayerTurn(true);
}, [monsterMaxHealth]);

useEffect(() => {
  setPlayerHealth(playerMaxHealth);
}, [playerMaxHealth]);

useEffect(() => {
  if (monsterTurn === true && monsterHealth >= 1) {
    setMonsterTurn(false);
    setPlayerHealth(playerHealth - 5);
    setPlayerTurn(true);
  }
}, [monsterHealth, monsterTurn, playerHealth]);

useEffect(() => {
  if (monsterHealth <= 0) {
    Alert.alert(`You defeated ${monsterName}`);
    setMonsterTurn(false);
    setMonsterHealth(monsterMaxHealth);
    setKillCount(killCount + 1);
  }
}, [monsterHealth, monsterMaxHealth, monsterName, killCount]);

useEffect(() => {
  if (playerHealth <= 0) {
    Alert.alert('You died', `You killed ${killCount} monsters`);
    setPlayerHealth(playerMaxHealth);
    setMonsterHealth(monsterMaxHealth);
    setScrollCount(5);
    setPotionCount(3);
    setKillCount(0);
  }
}, [playerHealth, playerMaxHealth, killCount, monsterMaxHealth]);

const playerAttack = () => {
  setMonsterHealth(monsterHealth - 5);
  setPlayerTurn(false);
  setMonsterTurn(true);
};

const playerSpell = () => {
  if (scrollCount > 0) {
  setMonsterHealth(monsterHealth - 10);
  setScrollCount(scrollCount - 1);
  setPlayerTurn(false);
  setMonsterTurn(true);
  }
};

const playerHeal = () => {
  if (potionCount > 0) {
  setPlayerHealth(playerHealth + 30);
  setPotionCount(potionCount - 1);
  setPlayerTurn(false);
  setMonsterTurn(true);
  }
};



  return (
    <View>
      <Text style={styles.monsterName}>
        {monsterName}
      </Text>
      <View style={styles.monster}>
      <Image
      style={styles.monster}
      source={require('../assets/Slime.png')} />
      </View>
      <Text style={styles.monsterHealthBar}>{monsterHealth}/{monsterMaxHealth}</Text>
      <View style={styles.attackButton}>
      <Button
      title="Attack"
      onPress={() => playerAttack()}/>
      </View>
      <View style={styles.attackButton}>
      <Button
      title="Heal"
      color="#00FF00"
      onPress={() => playerHeal()}/>
      </View>
      <View style={styles.attackButton}>
      <Button
      title="Spell"
      color="#FF0000"
      onPress={() => playerSpell()}/>
      </View>
      <View style={styles.attackButton}>
      <Text style={styles.playerName}>Player</Text>
      <Text style={styles.playerHealthBar}>{playerHealth}/{playerMaxHealth}</Text>
      </View>
      <View style={styles.inventoryContainer}>
      <Image
      source={Potion}
      style={styles.potion}/>
      <Text style={styles.inventory}>x{potionCount}</Text>
      </View>
      <View style={styles.inventoryContainer}>
      <Image
      source={Scroll}
      style={styles.scroll}/>
      <Text style={styles.inventory}>x{scrollCount}</Text>
      </View>
    </View>
  );
};
export default Combat;
