import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  CharacterDetailScreen: { characterId: number };
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

export type CharacterDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CharacterDetailScreen'
>;