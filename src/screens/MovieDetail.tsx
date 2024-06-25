import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigations/HomeStackNavigation';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

export default function MovieDetail(): JSX.Element {
  const route = useRoute<MovieDetailRouteProp>();
  const { movieId } = route.params;

  return (
    <View>
      <Text>Movie Detail</Text>
      <Text>Movie ID: {movieId}</Text>
    </View>
  );
}
