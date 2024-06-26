// src/navigation/types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your stack param list
export type RootStackParamList = {
  Search: undefined;
  MovieDetail: { id: number }; // Define the route with the expected parameters
};

// Navigation prop type
export type NavigationProps = StackNavigationProp<RootStackParamList, 'Search'>;

// Route prop type for MovieDetail
export type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;
