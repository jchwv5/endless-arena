/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Image, View, Button, Modal, Alert, ScrollView, TouchableHighlight } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Flee from '../../assets/Flee.png';
import fetchMonsterById from '../monster/MonsterService';
import monsterImages from '../monster/MonsterImageService';
import updatePlayerById from '../player/UpdatePlayerService';
import lootCheck from './LootCheck';
import fetchLootTableByMonsterId from './LootService';
import fetchInventoryByPlayerId from '../inventory/InventoryService';
import itemImages from '../equipment/ItemImages';
import SkillsModal from '../skills/SkillsModal';
import useSkill from '../skills/UseSkill';
import { calculateDamage, endPlayerTurn } from './CombatHelpers';
import { reduceStatusDurations, stunCheck } from './StatusHelpers';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import statusImages from './StatusImageService';


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
    marginBottom: 10,
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
  inventoryElement: {

  },
  fleeContainer: {
    flex: 1,
    justifyContent: 'right',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
  inventoryItemContainer: {
    flexBasis: '25%',
    alignItems: 'center',
  },
  inventoryMenu: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: 'blue',
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'white',
  },
  quantityLabel: {
    color: Colors.white,
    marginTop: 10,
    fontSize: 8,
    textAlign: 'center',
  },
  itemImage: {
    marginTop: 5,
    height: 40,
    width: 40,
  },
  itemName: {
    color: Colors.white,
    marginBottom: 15,
    marginLeft: 5,
    marginTop: 5,
    fontSize: 8,
    textAlign: 'center',
  },
  statusIconContainer: {
    height: 20,
    marginBottom: 10,
  },
  statusIcon: {
    alignSelf: 'center',
    marginTop: 10,
    height: 15,
    width: 15,
  },
  statusDurationText: {
    alignSelf: 'center',
    color: '#ff0000',
    fontSize: 10,
  },
});

const Combat = ({ route, navigation }) => {
  const [fleeModalVisible, setFleeModalVisible] = useState(false);
  const [lootModalVisible, setLootModalVisible] = useState(false);
  const [skillModalVisible, setSkillModalVisible] = useState(false);
  const {player, rightWeapon, leftWeapon, armor, setPlayer, equippedSkill1, equippedSkill2, equippedSkill3, equippedSkill4, inventoryItems, setInventoryItems} = route.params;
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
  const [lootTable, setLootTable] = useState([]);
  const [loot, setLoot] = useState([]);
  const [playerStatuses] = useState([]);
  const [monsterStatuses] = useState([]);
  const [equippedSkill1Cooldown, setEquippedSkill1Cooldown] = useState(0);
  const [equippedSkill2Cooldown, setEquippedSkill2Cooldown] = useState(0);
  const [equippedSkill3Cooldown, setEquippedSkill3Cooldown] = useState(0);
  const [equippedSkill4Cooldown, setEquippedSkill4Cooldown] = useState(0);
  const scrollViewRef = useRef();

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    fetchInventoryByPlayerId(setInventoryItems, player.id);
    setPlayerLevel(player.level);
    setPlayerExperience(player.exp);
    setPlayerAtk(Math.round((player.str - 1) / 2));
    setPlayerDef(Math.round((player.con - 1) / 2));
    setPlayerMaxHealth(player.health);
  }, [player.con, player.exp, player.health, player.id, player.level, player.name, player.str]);

  useEffect(() => {
    const monsterId = randomIntFromInterval(1, 5);
    fetchMonsterById(setMonster, monsterId);
    fetchLootTableByMonsterId(setLootTable, monsterId);
    monsterStatuses.length = 0;
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
      scrollViewRef.current.scrollToEnd({ animated: true });
      let isStunned = stunCheck(monsterStatuses, monster.name, combatMessages);
      if (!isStunned) {let damage = (monster.atk - (playerDef + armor.def + leftWeapon.def));
      const blockCheck = Math.floor(Math.random() * 101);
      if (blockCheck <= leftWeapon.blockChance) {
        damage = Math.round(damage / 2);
        combatMessages.push(<Text>{player.name} blocked {monster.name}'s attack!'{'\n'}</Text>);
      }
      if (damage < 0) {
        damage = 0;
      }
      setPlayerHealth(playerHealth - damage);
      addCombatMessage(monster.name, 'attacked', player.name, damage);
    }
    if (monsterStatuses.length > 0){reduceStatusDurations(monsterStatuses);}
    setMonsterTurn(false);
    setPlayerTurn(true);
    }
  }, [monsterHealth, monsterTurn, playerHealth]);

  useEffect(() => {
    if (monsterHealth <= 0) {
      Alert.alert(`You defeated ${monster.name}`);
      setMonsterTurn(false);
      lootCheck(player, monster.commonLootTableRolls, lootTable, loot, inventoryItems, setInventoryItems);
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
    const attackResult = (calculateDamage(player, rightWeapon));
    setMonsterHealth(monsterHealth - (attackResult.damage  - monster.def));
    if (attackResult.critResult) {
      attackMessage = 'critically hit ';
    }
    addCombatMessage(player.name, attackMessage, monster.name, attackResult.damage);
    endPlayerTurn(
      equippedSkill1Cooldown,
      setEquippedSkill1Cooldown,
      equippedSkill2Cooldown,
      setEquippedSkill2Cooldown,
      equippedSkill3Cooldown,
      setEquippedSkill3Cooldown,
      equippedSkill4Cooldown,
      setEquippedSkill4Cooldown,
      playerStatuses,
      setPlayerTurn,
      setMonsterTurn,
      );
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
        visible={fleeModalVisible}
        onRequestClose={() => {
          setFleeModalVisible(!fleeModalVisible);
        }}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to flee?</Text>
            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              onPress={() => { navigation.navigate('Loading', {
                target: 'Landing',
              }); } }
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  setFleeModalVisible(!fleeModalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
        </Modal>
        {skillModalVisible && <SkillsModal
        transparent={true}
        equippedSkill1={equippedSkill1}
        equippedSkill1Cooldown={equippedSkill1Cooldown}
        useSkill1={() => useSkill(
          equippedSkill1,
          monsterHealth,
          setMonsterHealth,
          playerStatuses,
          monsterStatuses,
          monster,
          player,
          rightWeapon,
          leftWeapon,
          setPlayerTurn,
          setMonsterTurn,
          combatMessages,
          setEquippedSkill1Cooldown,
          equippedSkill1Cooldown,
          setEquippedSkill1Cooldown,
          equippedSkill2Cooldown,
          setEquippedSkill2Cooldown,
          equippedSkill3Cooldown,
          setEquippedSkill3Cooldown,
          equippedSkill4Cooldown,
          setEquippedSkill4Cooldown,
          setSkillModalVisible
          )}
        equippedSkill2={equippedSkill2}
        equippedSkill2Cooldown={equippedSkill2Cooldown}
        useSkill2={() => useSkill(
          equippedSkill2,
          monsterHealth,
          setMonsterHealth,
          playerStatuses,
          monsterStatuses,
          monster,
          player,
          rightWeapon,
          leftWeapon,
          setPlayerTurn,
          setMonsterTurn,
          combatMessages,
          setEquippedSkill2Cooldown,
          equippedSkill1Cooldown,
          setEquippedSkill1Cooldown,
          equippedSkill2Cooldown,
          setEquippedSkill2Cooldown,
          equippedSkill3Cooldown,
          setEquippedSkill3Cooldown,
          equippedSkill4Cooldown,
          setEquippedSkill4Cooldown,
          setSkillModalVisible
          )}
        equippedSkill3={equippedSkill3}
        equippedSkill3Cooldown={equippedSkill3Cooldown}
        useSkill3={() => useSkill(
          equippedSkill3,
          monsterHealth,
          setMonsterHealth,
          playerStatuses,
          monsterStatuses,
          monster,
          player,
          rightWeapon,
          leftWeapon,
          setPlayerTurn,
          setMonsterTurn,
          combatMessages,
          setEquippedSkill3Cooldown,
          equippedSkill1Cooldown,
          setEquippedSkill1Cooldown,
          equippedSkill2Cooldown,
          setEquippedSkill2Cooldown,
          equippedSkill3Cooldown,
          setEquippedSkill3Cooldown,
          equippedSkill4Cooldown,
          setEquippedSkill4Cooldown,
          setSkillModalVisible
          )}
        equippedSkill4={equippedSkill4}
        equippedSkill4Cooldown={equippedSkill4Cooldown}
        useSkill4={() => useSkill(
          equippedSkill4,
          monsterHealth,
          setMonsterHealth,
          playerStatuses,
          monsterStatuses,
          monster,
          player,
          rightWeapon,
          leftWeapon,
          setPlayerTurn,
          setMonsterTurn,
          combatMessages,
          setEquippedSkill4Cooldown,
          equippedSkill1Cooldown,
          setEquippedSkill1Cooldown,
          equippedSkill2Cooldown,
          setEquippedSkill2Cooldown,
          equippedSkill3Cooldown,
          setEquippedSkill3Cooldown,
          equippedSkill4Cooldown,
          setEquippedSkill4Cooldown,
          setSkillModalVisible
          )}
        onClose={() => setSkillModalVisible(false)} />}
        <Modal
        transparent={true}
        visible={lootModalVisible}
        onRequestClose={() => {
          setLootModalVisible(!lootModalVisible);
        }}>
          <View style={styles.inventoryMenu}>
          {loot.map(lootItem => (
            <View style={styles.inventoryItemContainer}>
              <Text style={styles.quantityLabel}>{lootItem.quantity}</Text>
              <Image
                style={styles.itemImage}
                source={itemImages(lootItem.item.name)}
              />
              <Text style={styles.itemName} key={lootItem.item.id}>
                {lootItem.item.name}
              </Text>
            </View>
          ))}
          <View style={styles.modalView}>
            <TouchableHighlight
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  {setLootModalVisible(!lootModalVisible); setLoot([]); }}
            >
              <Text style={styles.textStyle}>Collect</Text>
            </TouchableHighlight>
          </View>
        </View>
        </Modal>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Text style={styles.combatLog}>
          {combatMessages}
        </Text>
      </ScrollView>
      {loot.length === 0 && <View>
        <Text style={styles.monsterName}>
          {monster.name}
        </Text>
      <View style={styles.statusIconContainer}>
      {monsterStatuses.length > 0 && <View>
        {monsterStatuses.map(monsterStatus => (
          <ImageBackground
            source={statusImages(monsterStatus.name)}
            style={styles.statusIcon}
            >
            <Text style={styles.statusDurationText}>
              {monsterStatus.duration}
            </Text>
          </ImageBackground>
        ))}
      </View>
         }
         </View>
        <View style={styles.monster}>
          <Image
            style={styles.monster}
            source={monsterImages(monster.name)} />
        </View>
          <Text style={styles.monsterHealthBar}>{monsterHealth}/{monsterMaxHealth}</Text>
      </View>}
      { loot.length > 0 && <View>
        <View style={styles.monster}>
        <TouchableHighlight
            onPress={() => { setLootModalVisible(!lootModalVisible); } }>
          <Image
            style={styles.monster}
            source={require('../../assets/Loot.png')} />
        </TouchableHighlight>
        </View>
      </View>}
      <View style={styles.statusIconContainer}>
      {playerStatuses.length > 0 && <View>
        {playerStatuses.map(playerStatus => (
          <ImageBackground
            source={statusImages(playerStatus.name)}
            style={styles.statusIcon}
            >
            <Text style={styles.statusDurationText}>
              {playerStatus.duration}
            </Text>
          </ImageBackground>
        ))}
        </View>
         }
      </View>
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
        <Button
          title="Skill"
          color="#FF00FF"
          onPress={() => setSkillModalVisible(!skillModalVisible)} />
      </View>
      <View style={styles.attackButton}>
        <Text style={styles.playerName}>{player.name} - Level {player.level}</Text>
        <Text style={styles.playerHealthBar}>{playerHealth}/{playerMaxHealth}</Text>
        <Text style={styles.playerExperienceBar}>{playerExperience}/100</Text>
      </View>
      <View style={styles.inventoryContainer}>
        <View />
        <View>
        <TouchableHighlight
          onPress={() => setFleeModalVisible(!fleeModalVisible)}>
        <Image
          source={Flee}
          style={styles.flee} />
      </TouchableHighlight>
      </View>
      </View>
    </ScrollView>
  );
};
export default Combat;
