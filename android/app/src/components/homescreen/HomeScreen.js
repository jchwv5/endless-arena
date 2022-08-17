import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Swords from '../../assets/Swords.png';
import Village from '../../assets/Village.png';
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
  village: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground source={Village} style={styles.village}>
      <ScrollView>
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
    </ImageBackground>
  );
};
export default HomeScreen;
