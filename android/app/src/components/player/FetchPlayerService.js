import fetchWeaponById from '../equipment/WeaponService';
import fetchShieldById from '../equipment/ShieldService';
import fetchArmorById from '../equipment/ArmorService';

export default async function fetchPlayerByEmail(
  setPlayer,
  setWeapon,
  setShield,
  setArmor,
  setDone,
  email,
) {
  return fetch(`https://infinite-arena-api.herokuapp.com/players/${email}`)
    .then(response => response.json())
    .then(responseJson => {
      setPlayer(responseJson);
      fetchWeaponById(setWeapon, responseJson.weaponId);
      fetchShieldById(setShield, responseJson.shieldId);
      fetchArmorById(setArmor, setDone, responseJson.armorId);
    })
    .catch(error => {
      console.error(error);
    });
}
