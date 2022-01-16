import React from 'react';
import {StyleSheet, Text, Image, Button, View, ScrollView} from 'react-native';
import Swords from '../../assets/Swords.png';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  logo: {
    height: 180,
    width: 180,
    alignSelf: 'center',
    marginTop: 200,
    marginBottom: 15,
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 30,
  },
  login: {
    marginHorizontal: 75,
  },
});

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView backgroundColor="black">
      <Image source={Swords} style={styles.logo} />
      <Text style={styles.title}>Endless Arena</Text>
      <View style={styles.login}>
        <Button
          style={styles.login}
          title="Enter the Arena"
          color="#00FF00"
          onPress={() =>
            navigation.navigate('Loading', {
              target: 'Landing',
            })
          }
        />
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
