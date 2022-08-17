import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Back from '../../assets/Back.png';
import itemImages from '../equipment/ItemImages';

const styles = StyleSheet.create({
  inventoryMenu: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: 'blue',
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'white',
    flex: 1,
    maxHeight: 550,
  },

  inventoryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  inventoryItemContainer: {
    flexBasis: '25%',
    alignItems: 'center',
  },

  quantityLabel: {
    color: Colors.white,
    marginTop: 10,
    fontSize: 8,
    textAlign: 'center',
  },

  labels: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 25,
  },
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    height: 50,
    width: 50,
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
});

const Inventory = props => {
  const {inventoryItems} = props;
  const {inventoryModalVisible} = props;
  const {setInventoryModalVisible} = props;
  return (
    <View style={styles.inventoryMenu}>
      <TouchableHighlight
        onPress={() => setInventoryModalVisible(!inventoryModalVisible)}>
        <Image style={styles.backIcon} source={Back} />
      </TouchableHighlight>
      <Text style={styles.labels}>Inventory</Text>
      <View style={styles.inventoryContainer}>
        {inventoryItems.map(inventoryItem => (
          <View style={styles.inventoryItemContainer}>
            <Text style={styles.quantityLabel}>{inventoryItem.quantity}</Text>
            <Image
              style={styles.itemImage}
              source={itemImages(inventoryItem.item.name)}
            />
            <Text style={styles.itemName} key={inventoryItem.id}>
              {inventoryItem.item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Inventory;
