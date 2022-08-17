import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Back from '../../assets/Back.png';

const styles = StyleSheet.create({
  equipmentMenu: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: 'blue',
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuPics: {
    height: 180,
    width: 180,
    margin: 10,
    marginBottom: 15,
    marginTop: 25,
  },
  labels: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 30,
  },
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    height: 50,
    width: 50,
  },
});

const Equipment = props => {
  const {player} = props;
  const {equipmentModalVisible} = props;
  const {setEquipmentModalVisible} = props;
  return (
    <View style={styles.equipmentMenu}>
      <TouchableHighlight
        onPress={() => setEquipmentModalVisible(!equipmentModalVisible)}>
        <Image style={styles.backIcon} source={Back} />
      </TouchableHighlight>
      <Text style={styles.labels}>{player.name}</Text>
      <Text style={styles.labels}>
        Right Weapon - {player.rightWeapon.name}{' '}
      </Text>
      <Text style={styles.labels}>Left Weapon - {player.leftWeapon.name} </Text>
      <Text style={styles.labels}>Armor - {player.armor.name} </Text>
    </View>
  );
};

export default Equipment;
