import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Back from '../../assets/Back.png';

const styles = StyleSheet.create({
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

const Equipment = ({route, navigation}) => {
  const {player, weapon, shield, armor} = route.params;
  return (
    <ScrollView backgroundColor="black">
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('Landing', {
            player: player,
            weapon: weapon,
            shield: shield,
            armor: armor,
          })
        }>
        <Image style={styles.backIcon} source={Back} />
      </TouchableHighlight>
      <Text style={styles.labels}>{player.name}</Text>
      <Text style={styles.labels}>Weapon - {weapon.name} </Text>
      <Text style={styles.labels}>Armor - {armor.name} </Text>
      <Text style={styles.labels}>Shield - {shield.name} </Text>
    </ScrollView>
  );
};

export default Equipment;
