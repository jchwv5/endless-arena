import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Shield from '../../assets/Shield.png';
import Pack from '../../assets/Pack.png';
import Spellbook from '../../assets/Spellbook.png';
import Skills from '../../assets/Skills.png';
import Knight from '../../assets/Knight.png';
import Slime from '../../assets/Slime.png';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
});

const ArenaLanding = ({route, navigation}) => {
  const {player, weapon, shield, armor} = route.params;

  return (
    <ScrollView backgroundColor="black">
      <View style={styles.container}>
        <View>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Equipment', {
                player: player,
                weapon: weapon,
                shield: shield,
                armor: armor,
              })
            }>
            <Image style={styles.menuPics} source={Shield} />
          </TouchableHighlight>
          <Text style={styles.labels}>Equipment</Text>
        </View>
        <View>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Loading', {target: 'Inventory'})
            }>
            <Image style={styles.menuPics} source={Pack} />
          </TouchableHighlight>
          <Text style={styles.labels}>Inventory</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Image style={styles.menuPics} source={Spellbook} />
          <Text style={styles.labels}>Spells</Text>
        </View>
        <View>
          <Image style={styles.menuPics} source={Skills} />
          <Text style={styles.labels}>Skills</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Character', {
                player: player,
                weapon: weapon,
                shield: shield,
                armor: armor,
              })
            }>
            <Image style={styles.menuPics} source={Knight} />
          </TouchableHighlight>
          <Text style={styles.labels}>Character</Text>
        </View>
        <View>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Loading', {
                target: 'Combat',
              })
            }>
            <Image style={styles.menuPics} source={Slime} />
          </TouchableHighlight>
          <Text style={styles.labels}>Battle</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default ArenaLanding;
