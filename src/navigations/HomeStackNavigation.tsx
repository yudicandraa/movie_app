import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

// Define the type for the stack param list
export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}
