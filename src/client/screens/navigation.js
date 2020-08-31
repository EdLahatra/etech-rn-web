import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateCompteScreen from './Compte';
import EntityScreen from './Home';
import Operation from './Operation';
import MapsScreen from './Maps';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Operation}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Maps"
          component={MapsScreen}
          options={{
            tabBarLabel: 'Maps',
          }}
        />
        <Tab.Screen
          name="Entity"
          component={EntityScreen}
          options={{
            tabBarLabel: 'Entity',
          }}
        />
        <Tab.Screen
          name="Compte"
          component={CreateCompteScreen}
          options={{
            tabBarLabel: 'Compte',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
