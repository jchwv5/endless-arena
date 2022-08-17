import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Combat from './android/app/src/components/combat/Combat';
import HomeScreen from './android/app/src/components/homescreen/HomeScreen';
import ArenaLanding from './android/app/src/components/arenalanding/ArenaLanding';
import CharacterScreen from './android/app/src/components/character-screen/CharacterScreen';
import Equipment from './android/app/src/components/equipment/Equipment';
import Loading from './android/app/src/components/loading/Loading';
import Inventory from './android/app/src/components/inventory/Inventory';
import Menu from './android/app/src/components/menu/Menu';
import CombatLanding from './android/app/src/components/combatlanding/CombatLanding';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Landing"
          component={ArenaLanding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Character"
          component={CharacterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Equipment"
          component={Equipment}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Combat"
          component={Combat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CombatLanding"
          component={CombatLanding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
