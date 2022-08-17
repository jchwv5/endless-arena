import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import ColloseumBackground from '../../assets/ColloseumBackground.png';
import CharacterScreen from '../character-screen/CharacterScreen';
import Equipment from '../equipment/Equipment';
import Inventory from '../inventory/Inventory';
import Menu from '../menu/Menu';
import Back from '../../assets/Back.png';
import ForestButton from '../../assets/ForestButton.png';
import CaveButton from '../../assets/CaveButton.png';
import BossButton from '../../assets/BossButton.png';
import SwampButton from '../../assets/SwampButton.png';
import DesertButton from '../../assets/DesertButton.png';
import VolcanoButton from '../../assets/VolcanoButton.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.75,
  },
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    height: 50,
    width: 50,
  },
  menuContainer: {
    marginTop: 'auto',
    flex: 0.25,
  },
  village: {
    width: '100%',
    height: '100%',
  },
  logo: {
    height: 50,
    width: 63,
    alignSelf: 'center',
  },
  forestButtonContainer: {
    marginTop: 150,
    marginBottom: 15,
    height: 50,
    width: 63,
    alignSelf: 'center',
  },
  caveSwampBossButtonContainer: {
    marginTop: 50,
    marginBottom: 15,
    height: 50,
    width: '100%',
    alignSelf: 'center',
    flex: 0.25,
    flexDirection: 'row',
  },
  desertVolcanoButtonContainer: {
    marginTop: 50,
    marginBottom: 15,
    height: 50,
    width: '100%',
    alignSelf: 'center',
    flex: 0.25,
    flexDirection: 'row',
  },
  caveButtonContainer: {
    flex: 0.33,
    justifyContent: 'center',
  },
  bossButtonContainer: {
    flex: 0.33,
    justifyContent: 'center',
  },
  swampButtonContainer: {
    flex: 0.33,
    justifyContent: 'center',
  },
  desertButtonContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  volcanoButtonContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
});

const CombatLanding = ({route, navigation}) => {
  const {player} = route.params;
  const {inventoryItems} = route.params;
  const [characterModalVisible, setCharacterModalVisible] = useState(false);
  const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);
  const [inventoryModalVisible, setInventoryModalVisible] = useState(false);

  return (
    <ImageBackground source={ColloseumBackground} style={styles.village}>
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('Loading', {
              target: 'Landing',
            })
          }>
          <Image style={styles.backIcon} source={Back} />
        </TouchableHighlight>
        <Modal
          transparent={true}
          visible={characterModalVisible}
          onRequestClose={() => {
            setCharacterModalVisible(!characterModalVisible);
          }}>
          <CharacterScreen
            player={player}
            characterModalVisible={characterModalVisible}
            setCharacterModalVisible={setCharacterModalVisible}
          />
        </Modal>
        <Modal
          transparent={true}
          visible={equipmentModalVisible}
          onRequestClose={() => {
            setCharacterModalVisible(!characterModalVisible);
          }}>
          <Equipment
            player={player}
            equipmentModalVisible={equipmentModalVisible}
            setEquipmentModalVisible={setEquipmentModalVisible}
          />
        </Modal>
        <Modal
          transparent={true}
          visible={inventoryModalVisible}
          onRequestClose={() => {
            setInventoryModalVisible(!inventoryModalVisible);
          }}>
          <Inventory
            player={player}
            inventoryItems={inventoryItems}
            inventoryModalVisible={inventoryModalVisible}
            setInventoryModalVisible={setInventoryModalVisible}
          />
        </Modal>
        <View style={styles.forestButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Loading', {
                target: 'Combat',
              })
            }>
            <Image source={ForestButton} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.caveSwampBossButtonContainer}>
          <View style={styles.caveButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Combat', {
                  player: player,
                  rightWeapon: player.rightWeapon,
                  leftWeapon: player.leftWeapon,
                  armor: player.armor,
                })
              }>
              <Image source={CaveButton} style={styles.logo} />
            </TouchableOpacity>
          </View>
          <View style={styles.bossButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Combat', {
                  player: player,
                  rightWeapon: player.rightWeapon,
                  leftWeapon: player.leftWeapon,
                  armor: player.armor,
                })
              }>
              <Image source={BossButton} style={styles.logo} />
            </TouchableOpacity>
          </View>
          <View style={styles.swampButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Combat', {
                  player: player,
                  rightWeapon: player.rightWeapon,
                  leftWeapon: player.leftWeapon,
                  armor: player.armor,
                })
              }>
              <Image source={SwampButton} style={styles.logo} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.desertVolcanoButtonContainer}>
          <View style={styles.desertButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Combat', {
                  player: player,
                  rightWeapon: player.rightWeapon,
                  leftWeapon: player.leftWeapon,
                  armor: player.armor,
                })
              }>
              <Image source={DesertButton} style={styles.logo} />
            </TouchableOpacity>
          </View>
          <View style={styles.volcanoButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Combat', {
                  player: player,
                  rightWeapon: player.rightWeapon,
                  leftWeapon: player.leftWeapon,
                  armor: player.armor,
                })
              }>
              <Image source={VolcanoButton} style={styles.logo} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <Menu
            characterModalVisible={characterModalVisible}
            setCharacterModalVisible={setCharacterModalVisible}
            equipmentModalVisible={equipmentModalVisible}
            setEquipmentModalVisible={setEquipmentModalVisible}
            inventoryModalVisible={inventoryModalVisible}
            setInventoryModalVisible={setInventoryModalVisible}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default CombatLanding;
