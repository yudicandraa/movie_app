import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/HomeStackNavigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function Home(): JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Movie Detail"
        onPress={() => navigation.navigate('MovieDetail', { movieId: 1 })}
      />
    </View>
  );
}
