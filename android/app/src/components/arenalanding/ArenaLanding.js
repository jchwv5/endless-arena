import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Village from '../../assets/Village.png';
import CharacterScreen from '../character-screen/CharacterScreen';
import Equipment from '../equipment/Equipment';
import Inventory from '../inventory/Inventory';
import Menu from '../menu/Menu';
import BattleButton from '../../assets/BattleButton.png';
import BlacksmithButton from '../../assets/BlacksmithButton.png';
import TavernButton from '../../assets/TavernButton.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.75,
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
  battleButtonContainer: {
    marginTop: 260,
    marginBottom: 15,
    height: 50,
    width: 63,
    alignSelf: 'center',
  },
  blacksmithButtonContainer: {
    marginTop: 100,
    marginLeft: 100,
    height: 50,
    width: 63,
  },
  tavernButtonContainer: {
    marginTop: 50,
    marginLeft: 270,
    height: 50,
    width: 63,
  },
});

const ArenaLanding = ({route, navigation}) => {
  const {player} = route.params;
  const {inventoryItems} = route.params;
  const [characterModalVisible, setCharacterModalVisible] = useState(false);
  const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);
  const [inventoryModalVisible, setInventoryModalVisible] = useState(false);

  return (
    <ImageBackground source={Village} style={styles.village}>
      <View style={styles.container}>
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
        <View style={styles.battleButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CombatLanding', {
                player: player,
                inventoryItems: inventoryItems,
              })
            }>
            <Image source={BattleButton} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.blacksmithButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Combat', {
                player: player,
                rightWeapon: player.rightWeapon,
                leftWeapon: player.leftWeapon,
                armor: player.armor,
              })
            }>
            <Image source={BlacksmithButton} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.tavernButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Combat', {
                player: player,
                rightWeapon: player.rightWeapon,
                leftWeapon: player.leftWeapon,
                armor: player.armor,
              })
            }>
            <Image source={TavernButton} style={styles.logo} />
          </TouchableOpacity>
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

export default ArenaLanding;
