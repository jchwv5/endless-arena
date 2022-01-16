import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Back from '../assets/Back.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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

const Inventory = ({route, navigation}) => {
  const {inventoryItems} = route.params;
  return (
    <ScrollView backgroundColor="black">
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('Loading', {
            target: 'Landing',
          })
        }>
        <Image style={styles.backIcon} source={Back} />
      </TouchableHighlight>
      <Text style={styles.labels}>Inventory</Text>
      {inventoryItems.map(inventoryItem => (
        <ScrollView>
          <Text style={styles.labels} key={inventoryItem.id}>
            {inventoryItem.item.name} x{inventoryItem.quantity}
          </Text>
        </ScrollView>
      ))}
    </ScrollView>
  );
};

export default Inventory;
