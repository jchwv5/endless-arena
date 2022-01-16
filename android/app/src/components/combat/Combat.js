/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Image, View, Button, Modal, Alert, ScrollView, TouchableHighlight } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Potion from '../../assets/Potion.png';
import Scroll from '../../assets/Scroll.png';
import Flee from '../../assets/Flee.png';
import fetchMonsterById from '../monster/MonsterService';
import monsterImages from '../monster/MonsterImageService';
import updatePlayerById from '../player/UpdatePlayerService';


const styles = StyleSheet.create({
  monster: {
    marginTop: 20,
    marginLeft: 80,
    height: 180,
    width: 180,
    alignItems: 'center',
  },

  scrollView: {
    marginTop: 15,
    backgroundColor: 'grey',
    marginHorizontal: 40,
    height: 80,
    borderColor: 'white',
    borderWidth: 3,
  },

  potion: {
    marginRight: 10,
    height: 25,
    width: 25,
  },
  flee: {
    marginRight: 10,
    marginLeft: 250,
    height: 50,
    width: 50,
  },
  scroll: {
    marginLeft: 10,
    marginRight: 10,
    height: 25,
    width: 25,
  },
  monsterName: {
    color: Colors.white,
    marginTop: 40,
    textAlign: 'center',
  },
  playerName: {
    color: Colors.white,
    marginTop: 25,
    textAlign: 'center',
  },
  combatLog: {
    color: Colors.white,
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
    marginBottom: 15,
  },

  playerExperienceBar: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 25,
  },

  inventory: {
    color: Colors.white,
  },
  inventoryContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fleeContainer: {
    flex: 1,
    justifyContent: 'right',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attackButton: {
    marginHorizontal: 75,
  },
  healButton: {
    marginHorizontal: 75,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});
const Combat = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {player, weapon, shield, armor, setPlayer} = route.params;
  const [combatMessages, setCombatMessages] = useState([]);
  const [monster, setMonster] = useState({});
  const [playerLevel, setPlayerLevel] = useState(0);
  const [playerMaxHealth, setPlayerMaxHealth] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerAtk, setPlayerAtk] = useState(0);
  const [playerDef, setPlayerDef] = useState(0);
  const [playerExperience, setPlayerExperience] = useState(0);
  const [monsterMaxHealth, setMonsterMaxHealth] = useState(25);
  const [monsterHealth, setMonsterHealth] = useState(1);
  const [potionCount, setPotionCount] = useState(3);
  const [scrollCount, setScrollCount] = useState(5);
  const [killCount, setKillCount] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [monsterTurn, setMonsterTurn] = useState(false);
  const scrollViewRef = useRef();

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    setPlayerLevel(player.level);
    setPlayerExperience(player.exp);
    setPlayerAtk(Math.round((player.str - 1) / 2));
    setPlayerDef(Math.round((player.con - 1) / 2));
    setPlayerMaxHealth(player.health);
  }, [player.con, player.exp, player.health, player.level, player.name, player.str]);

  useEffect(() => {
    const monsterId = randomIntFromInterval(1, 5);
    fetchMonsterById(setMonster, monsterId);
  }, [killCount]);

  useEffect(() => {
    setMonsterMaxHealth(monster.health);
    setMonsterHealth(monsterMaxHealth);
    setCombatMessages([<Text>A wild {monster.name} appeared!{'\n'}</Text>]);
    setPlayerTurn(true);
  }, [killCount, monster.health, monster.name, monsterMaxHealth]);

  useEffect(() => {
    setPlayerHealth(playerMaxHealth);
  }, [playerMaxHealth]);

  useEffect(() => {
    if (monsterTurn === true && monsterHealth >= 1) {
      setMonsterTurn(false);
      let damage = (monster.atk - (playerDef + armor.def + shield.def));
      const blockCheck = Math.floor(Math.random() * 101);
      if (blockCheck <= shield.blockChance) {
        damage = Math.round(damage / 2);
        combatMessages.push(<Text>{player.name} blocked {monster.name}'s attack!'{'\n'}</Text>);
      }
      if (damage < 0) {
        damage = 0;
      }
      setPlayerHealth(playerHealth - damage);
      addCombatMessage(monster.name, 'attacked', player.name, damage);
      setPlayerTurn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monsterHealth, monsterTurn, playerHealth]);

  useEffect(() => {
    if (monsterHealth <= 0) {
      Alert.alert(`You defeated ${monster.name}`);
      setMonsterTurn(false);
      setMonsterHealth(monsterMaxHealth);
      setKillCount(killCount + 1);
      setPlayerExperience(playerExperience + monster.exp);
    }
  }, [monsterHealth, monsterMaxHealth, killCount, monster.name, playerExperience, playerLevel, playerMaxHealth, playerAtk, playerDef, monster.exp]);

  useEffect(() => {
    if (killCount !== 0 ){
    let levelUp = false;
    if (playerExperience >= 100) {
      levelUp = true;
    }
    updatePlayerById(player, playerExperience, levelUp, setPlayer);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [killCount]);

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

  const addCombatMessage = (
    attacker,
    attack,
    defender,
    damage,
  ) => {
    combatMessages.push(
      <Text>{attacker} {attack} {defender} for {damage} damage{'\n'}</Text>
    );
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const playerAttack = () => {
    if (playerTurn === true){
    let attackMessage = 'attacked';
    const critCheck = Math.floor(Math.random() * 101);
    let weaponDamage = Math.floor(Math.random() * (weapon.maxAttack - weapon.minAttack + 1) + weapon.minAttack);
    if (critCheck <= weapon.critChance) {
      weaponDamage = weaponDamage * 2;
      attackMessage = 'critically hit';
    }
    const damage = (playerAtk + weaponDamage) - monster.def;
    setMonsterHealth(monsterHealth - damage);
    addCombatMessage(player.name, attackMessage, monster.name, damage);
    setPlayerTurn(false);
    setMonsterTurn(true);
  }
  };

  const playerSpell = () => {
    if (scrollCount > 0) {
      setMonsterHealth(monsterHealth - 10);
      setScrollCount(scrollCount - 1);
      setPlayerTurn(false);
      setMonsterTurn(true);
      addCombatMessage(player.name, 'used a spell on', monster.name, '10');
    }
  };

  const playerHeal = () => {
    if (potionCount > 0) {
      if ((playerHealth + 30) > playerMaxHealth) {
        setPlayerHealth(playerMaxHealth);
      } else {
        setPlayerHealth(playerHealth + 30);
      }
      setPotionCount(potionCount - 1);
      setPlayerTurn(false);
      setMonsterTurn(true);
      addCombatMessage(player.name, 'healed', 'themself', '30');
    }
  };

  return (
    <ScrollView backgroundColor="black">
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to flee?</Text>
            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  navigation.navigate('Loading', {
                target: 'Landing',
              })}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
        </Modal>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Text style={styles.combatLog}>
          {combatMessages}
        </Text>
      </ScrollView>
      <Text style={styles.monsterName}>
        {monster.name}
      </Text>
      <View style={styles.monster}>
        <Image
          style={styles.monster}
          source={monsterImages(monster.name)} />
      </View>
      <Text style={styles.monsterHealthBar}>{monsterHealth}/{monsterMaxHealth}</Text>
      <View style={styles.attackButton}>
        <Button
          title="Attack"
          onPress={() => playerAttack()} />
      </View>
      <View style={styles.attackButton}>
        <Button
          title="Heal"
          color="#00FF00"
          onPress={() => playerHeal()} />
      </View>
      <View style={styles.attackButton}>
        <Button
          title="Spell"
          color="#FF0000"
          onPress={() => playerSpell()} />
      </View>
      <View style={styles.attackButton}>
        <Text style={styles.playerName}>{player.name} - Level {player.level}</Text>
        <Text style={styles.playerHealthBar}>{playerHealth}/{playerMaxHealth}</Text>
        <Text style={styles.playerExperienceBar}>{playerExperience}/100</Text>
      </View>
      <View style={styles.inventoryContainer}>
        <Image
          source={Potion}
          style={styles.potion} />
        <Text style={styles.inventory}>x{potionCount}</Text>
        <Image
          source={Scroll}
          style={styles.scroll} />
        <Text style={styles.inventory}>x{scrollCount}</Text>
      </View>
      <View style={styles.inventoryContainer}>
      <TouchableHighlight
            onPress={() => setModalVisible(!modalVisible)}>
        <Image
          source={Flee}
          style={styles.flee} />
      </TouchableHighlight>
      </View>
    </ScrollView>
  );
};
export default Combat;
