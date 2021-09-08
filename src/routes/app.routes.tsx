import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Resume } from '../screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const { colors } = useTheme();

  return (
    <Navigator
      initialRouteName='Dashboard'
      tabBarOptions={{
        activeTintColor: colors.secondary,
        inactiveTintColor: colors.text,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'android' ? 0 : 20,
          height: 68,
        },
      }}
    >
      <Screen
        name='Dashboard'
        options={{
          title: 'Listagem',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          ),
        }}
        component={Dashboard}
      />
      <Screen
        name='Register'
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='attach-money' size={size} color={color} />
          ),
        }}
        component={Register}
      />
      <Screen
        name='Resume'
        options={{
          title: 'Resumo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='pie-chart' size={size} color={color} />
          ),
        }}
        component={Resume}
      />
    </Navigator>
  );
};
