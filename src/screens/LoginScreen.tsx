import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { LoginScreenNavigationProp } from '../types/navigation';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (true || username === 'admin' && password === 'password') {
      navigation.replace('HomeScreen');
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default LoginScreen;