import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // 로그인 로직 구현
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Home', { username });
    } else {
      // 로그인 실패 처리
      alert('Invalid username or password');
    }
  };

  // 회원가입 로직 구현
  const onSignUp = () => {

  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button title="Login" onPress={onLogin} />
        <Button title="Signin" onPress={onLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%', //
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
  },
});

export default LoginScreen;
