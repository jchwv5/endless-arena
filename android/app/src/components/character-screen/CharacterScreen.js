import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Back from '../../assets/Back.png';

const styles = StyleSheet.create({
  statsMenu: {
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

const CharacterScreen = props => {
  const {player} = props;
  const {characterModalVisible} = props;
  const {setCharacterModalVisible} = props;
  return (
    <View style={styles.statsMenu}>
      <TouchableHighlight
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setCharacterModalVisible(!characterModalVisible);
        }}>
        <Image style={styles.backIcon} source={Back} />
      </TouchableHighlight>
      <Text style={styles.labels}>{player.name}</Text>
      <Text style={styles.labels}>Level - {player.level}</Text>
      <Text style={styles.labels}>Max Health - {player.health}</Text>
      <Text style={styles.labels}>Strength - {player.str}</Text>
      <Text style={styles.labels}>Agility - {player.agi}</Text>
      <Text style={styles.labels}>Intelligence - {player.intel}</Text>
      <Text style={styles.labels}>Willpower - {player.will}</Text>
      <Text style={styles.labels}>Constitution - {player.con}</Text>
      <Text style={styles.labels}>Experience - {player.exp}/100</Text>
    </View>
  );
};

export default CharacterScreen;
