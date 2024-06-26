// src/navigation/AppNavigator.tsx atau file navigasi lain yang sesuai
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
import MovieDetail from '../screens/MovieDetail';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
);

export default AppNavigator;
