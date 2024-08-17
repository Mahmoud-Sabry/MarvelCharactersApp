import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { useTranslation } from 'react-i18next';
import './i18n/locals';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: t('loginTitle') }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: t('homeTitle') }}
            />
            <Stack.Screen
              name="CharacterDetailScreen"
              component={CharacterDetailScreen}
              options={{ title: t('characterDetailTitle') }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
