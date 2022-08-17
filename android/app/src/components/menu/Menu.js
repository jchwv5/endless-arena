import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  menu: {
    marginTop: 'auto',
    backgroundColor: 'blue',
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'white',
    height: 130,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  menuLeftContainer: {
    flex: 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterPortraitFrame: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  characterPortait: {
    alignSelf: 'center',
    height: 92,
    width: 84,
  },
  menuRightContainer: {
    flex: 0.7,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonColumnContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 0.5,
  },
  appButtonContainer: {
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
  },
  statsButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  inventoryButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  equipmentButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  skillsButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

const Menu = props => {
  const {characterModalVisible} = props;
  const {setCharacterModalVisible} = props;
  const {equipmentModalVisible} = props;
  const {setEquipmentModalVisible} = props;
  const {inventoryModalVisible} = props;
  const {setInventoryModalVisible} = props;
  return (
    <View style={styles.menu}>
      <View style={styles.menuContainer}>
        <View style={styles.menuLeftContainer}>
          <ImageBackground
            style={styles.characterPortraitFrame}
            source={require('../../assets/CharacterPortraitFrame.png')}>
            <Image
              style={styles.characterPortait}
              source={require('../../assets/CharacterPortrait.png')}
            />
          </ImageBackground>
        </View>
        <View style={styles.menuRightContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonColumnContainer}>
              <TouchableOpacity
                onPress={() =>
                  setCharacterModalVisible(!characterModalVisible)
                }>
                <LinearGradient
                  colors={['#1387d4', '#259399', '#0b466e']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.5}}
                  style={styles.appButtonContainer}>
                  <Text style={styles.statsButtonText}>Character</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setInventoryModalVisible(!inventoryModalVisible)
                }>
                <LinearGradient
                  colors={['#1387d4', '#259399', '#0b466e']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.5}}
                  style={styles.appButtonContainer}>
                  <Text style={styles.inventoryButtonText}>Inventory</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonColumnContainer}>
              <TouchableOpacity
                onPress={() =>
                  setEquipmentModalVisible(!equipmentModalVisible)
                }>
                <LinearGradient
                  colors={['#1387d4', '#259399', '#0b466e']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.5}}
                  style={styles.appButtonContainer}>
                  <Text style={styles.equipmentButtonText}>Equipment</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#1387d4', '#259399', '#0b466e']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.5}}
                  style={styles.appButtonContainer}>
                  <Text style={styles.skillsButtonText}>Skills</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Menu;
