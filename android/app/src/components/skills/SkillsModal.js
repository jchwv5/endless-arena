import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableHighlight} from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import skillImages from './SkillImageService';
import cooldownCounter from './CooldownCounter';

const styles = StyleSheet.create({
  skillsMenu: {
    marginTop: 350,
    maxHeight: 300,
    marginHorizontal: 5,
    backgroundColor: 'blue',
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillsText: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 15,
  },
  skillsContainer: {
    flexBasis: '50%',
    alignItems: 'center',
  },
  skillIcon: {
    alignSelf: 'center',
    marginTop: 25,
    height: 50,
    width: 50,
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  cooldownContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cooldownText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 30,
  },
  cooldownClock: {
    alignSelf: 'center',
    opacity: 0.75,
    height: 50,
    width: 50,
  },
});

const SkillsModal = props => {
  const {
    equippedSkill1,
    equippedSkill1Cooldown,
    useSkill1,
    equippedSkill2,
    equippedSkill2Cooldown,
    useSkill2,
    equippedSkill3,
    equippedSkill3Cooldown,
    useSkill3,
    equippedSkill4,
    equippedSkill4Cooldown,
    useSkill4,
    onClose,
  } = props;
  return (
    <Modal transparent={true}>
      <View style={styles.skillsMenu}>
        <View style={styles.skillsContainer}>
          <TouchableHighlight
            disabled={equippedSkill1Cooldown > 0}
            onPress={useSkill1}>
            <View>
              <ImageBackground
                source={skillImages(equippedSkill1.skill.name)}
                style={styles.skillIcon}>
                <View style={styles.cooldownContainer}>
                  {equippedSkill1Cooldown > 0 && (
                    <ImageBackground
                      source={cooldownCounter(
                        equippedSkill1Cooldown,
                        equippedSkill1.skill.cooldown,
                      )}
                      style={styles.cooldownClock}>
                      <Text style={styles.cooldownText}>
                        {equippedSkill1Cooldown}
                      </Text>
                    </ImageBackground>
                  )}
                </View>
              </ImageBackground>
              <Text style={styles.skillsText}>{equippedSkill1.skill.name}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={equippedSkill2Cooldown > 0}
            onPress={useSkill2}>
            <View>
              <ImageBackground
                source={skillImages(equippedSkill2.skill.name)}
                style={styles.skillIcon}>
                <View style={styles.cooldownContainer}>
                  {equippedSkill2Cooldown > 0 && (
                    <ImageBackground
                      source={cooldownCounter(
                        equippedSkill2Cooldown,
                        equippedSkill2.skill.cooldown,
                      )}
                      style={styles.cooldownClock}>
                      <Text style={styles.cooldownText}>
                        {equippedSkill2Cooldown}
                      </Text>
                    </ImageBackground>
                  )}
                </View>
              </ImageBackground>
              <Text style={styles.skillsText}>{equippedSkill2.skill.name}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.skillsContainer}>
          <TouchableHighlight
            disabled={equippedSkill3Cooldown > 0}
            onPress={useSkill3}>
            <View>
              <ImageBackground
                source={skillImages(equippedSkill3.skill.name)}
                style={styles.skillIcon}>
                <View style={styles.cooldownContainer}>
                  {equippedSkill3Cooldown > 0 && (
                    <ImageBackground
                      source={cooldownCounter(
                        equippedSkill3Cooldown,
                        equippedSkill3.skill.cooldown,
                      )}
                      style={styles.cooldownClock}>
                      <Text style={styles.cooldownText}>
                        {equippedSkill3Cooldown}
                      </Text>
                    </ImageBackground>
                  )}
                </View>
              </ImageBackground>
              <Text style={styles.skillsText}>{equippedSkill3.skill.name}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={equippedSkill4Cooldown > 0}
            onPress={useSkill4}>
            <View>
              <ImageBackground
                source={skillImages(equippedSkill4.skill.name)}
                style={styles.skillIcon}>
                <View style={styles.cooldownContainer}>
                  {equippedSkill4Cooldown > 0 && (
                    <ImageBackground
                      source={cooldownCounter(
                        equippedSkill4Cooldown,
                        equippedSkill4.skill.cooldown,
                      )}
                      style={styles.cooldownClock}>
                      <Text style={styles.cooldownText}>
                        {equippedSkill4Cooldown}
                      </Text>
                    </ImageBackground>
                  )}
                </View>
              </ImageBackground>
              <Text style={styles.skillsText}>{equippedSkill4.skill.name}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={[styles.button, styles.buttonClose]}
          onPress={onClose}>
          <Text style={styles.skillsText}>Cancel</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

export default SkillsModal;
