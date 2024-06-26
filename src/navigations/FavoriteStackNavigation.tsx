// src/navigations/FavoriteStackNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import MovieDetail from '../screens/MovieDetail';

// Define the type for the stack param list
export type FavoriteStackParamList = {
  Favorite: undefined;
  MovieDetail: { id: number };
};

const Stack = createNativeStackNavigator<FavoriteStackParamList>();

export default function FavoriteStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Favorite">
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}
