import React from 'react';
import {Text, Alert} from 'react-native';
import {calculateDamage, endPlayerTurn} from '../combat/CombatHelpers';

const useSkill = (
  activeSkill,
  monsterHealth,
  setMonsterHealth,
  playerStatuses,
  monsterStatuses,
  monster,
  player,
  rightWeapon,
  leftWeapon,
  setPlayerTurn,
  setMonsterTurn,
  combatMessages,
  setActiveSkillCooldown,
  equippedSkill1Cooldown,
  setEquippedSkill1Cooldown,
  equippedSkill2Cooldown,
  setEquippedSkill2Cooldown,
  equippedSkill3Cooldown,
  setEquippedSkill3Cooldown,
  equippedSkill4Cooldown,
  setEquippedSkill4Cooldown,
  setSkillModalVisible,
) => {
  switch (activeSkill.skill.name) {
    case 'Backstab': {
      const stealth = playerStatuses.some(playerStatus => {
        if (playerStatus.name === 'Stealth') {
          const attackResult = calculateDamage(player, rightWeapon);
          const backstabDamage = attackResult.damage * 3 - monster.def;
          setMonsterHealth(monsterHealth - backstabDamage);
          if (attackResult.critResult) {
            combatMessages.push(
              <Text>
                {player.name} used Backstab on {monster.name} and critically hit
                for {backstabDamage} damage{'\n'}
              </Text>,
            );
          } else {
            combatMessages.push(
              <Text>
                {player.name} used Backstab on {monster.name} for{' '}
                {backstabDamage} damage{'\n'}
              </Text>,
            );
          }
          setSkillModalVisible(false);
          setActiveSkillCooldown(activeSkill.skill.cooldown);
          endPlayerTurn(
            equippedSkill1Cooldown,
            setEquippedSkill1Cooldown,
            equippedSkill2Cooldown,
            setEquippedSkill2Cooldown,
            equippedSkill3Cooldown,
            setEquippedSkill3Cooldown,
            equippedSkill4Cooldown,
            setEquippedSkill4Cooldown,
            playerStatuses,
            setPlayerTurn,
            setMonsterTurn,
          );
          return true;
        }
      });
      if (!stealth) {
        Alert.alert('Backstab can only be used when stealthed');
      }
      break;
    }
    case 'Vanish': {
      const stealth = playerStatuses.some(playerStatus => {
        if (playerStatus.name === 'Stealth') {
          Alert.alert('You are already stealthed!');
          return true;
        }
      });
      if (!stealth) {
        playerStatuses.push({name: 'Stealth', duration: 3});
        combatMessages.push(
          <Text>
            {player.name} used Vanish{'\n'}
          </Text>,
        );
        combatMessages.push(
          <Text>
            {player.name} gained Stealth{'\n'}
          </Text>,
        );
        setSkillModalVisible(false);
        setActiveSkillCooldown(activeSkill.skill.cooldown);
        endPlayerTurn(
          equippedSkill1Cooldown,
          setEquippedSkill1Cooldown,
          equippedSkill2Cooldown,
          setEquippedSkill2Cooldown,
          equippedSkill3Cooldown,
          setEquippedSkill3Cooldown,
          equippedSkill4Cooldown,
          setEquippedSkill4Cooldown,
          playerStatuses,
          setPlayerTurn,
          setMonsterTurn,
        );
      }
      break;
    }
    case 'Shield Bash': {
      if (leftWeapon.type === 'Shield' || rightWeapon.type === 'Shield') {
        let bashDamage =
          leftWeapon.blockChance + Math.round((player.str - 1) / 2);
        setMonsterHealth(monsterHealth - bashDamage);
        combatMessages.push(
          <Text>
            {player.name} used Shield Bash on {monster.name} for {bashDamage}{' '}
            damage{'\n'}
          </Text>,
        );
        monsterStatuses.push({name: 'Stun', duration: 4});
        combatMessages.push(
          <Text>
            {player.name} stunned {monster.name}!{'\n'}
          </Text>,
        );
        setSkillModalVisible(false);
        setActiveSkillCooldown(activeSkill.skill.cooldown);
        endPlayerTurn(
          equippedSkill1Cooldown,
          setEquippedSkill1Cooldown,
          equippedSkill2Cooldown,
          setEquippedSkill2Cooldown,
          equippedSkill3Cooldown,
          setEquippedSkill3Cooldown,
          equippedSkill4Cooldown,
          setEquippedSkill4Cooldown,
          playerStatuses,
          setPlayerTurn,
          setMonsterTurn,
        );
      }
      break;
    }
    case 'Double Strike': {
      const firstAttackResult = calculateDamage(player, rightWeapon);
      const secondAttackResult = calculateDamage(player, rightWeapon);
      const firstAttackDamage = Math.round(
        firstAttackResult.damage * 0.75 - monster.def,
      );
      const secondAttackDamage = Math.round(
        secondAttackResult.damage * 0.75 - monster.def,
      );
      if (firstAttackResult.critResult) {
        combatMessages.push(
          <Text>
            {player.name}'s' first attack critically hit {monster.name} for{' '}
            {firstAttackDamage} damage!
            {'\n'}
          </Text>,
        );
      } else {
        combatMessages.push(
          <Text>
            {player.name} first attack hit {monster.name} for{' '}
            {firstAttackDamage} damage!
            {'\n'}
          </Text>,
        );
      }
      if (secondAttackResult.critResult) {
        combatMessages.push(
          <Text>
            {player.name}'s' second attack critically hit {monster.name} for{' '}
            {secondAttackDamage} damge!
            {'\n'}
          </Text>,
        );
      } else {
        combatMessages.push(
          <Text>
            {player.name} second attack hit {monster.name} for{' '}
            {secondAttackDamage} damge!
            {'\n'}
          </Text>,
        );
      }
      setMonsterHealth(
        monsterHealth - (firstAttackDamage + secondAttackDamage),
      );
      setSkillModalVisible(false);
      setActiveSkillCooldown(activeSkill.skill.cooldown);
      endPlayerTurn(
        equippedSkill1Cooldown,
        setEquippedSkill1Cooldown,
        equippedSkill2Cooldown,
        setEquippedSkill2Cooldown,
        equippedSkill3Cooldown,
        setEquippedSkill3Cooldown,
        equippedSkill4Cooldown,
        setEquippedSkill4Cooldown,
        playerStatuses,
        setPlayerTurn,
        setMonsterTurn,
      );
      break;
    }
  }
};

export default useSkill;
