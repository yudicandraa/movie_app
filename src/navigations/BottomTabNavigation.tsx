// src/navigations/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import Search from '../screens/Search';
import FavoriteStackNavigation from './FavoriteStackNavigation'; // Import FavoriteStackNavigation

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeStackNavigation}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Feather name="home" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Feather name="search" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Favorite"
      component={FavoriteStackNavigation} // Use FavoriteStackNavigation here
      options={{
        tabBarIcon: ({ color }: { color: string }) => (
          <Feather name="heart" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
