import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import styles from '../styles/style';

const SiginInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
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
    navigation.navigate('회원가입');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button title="로그인" onPress={onSignIn} />
        <Button title="회원가입" onPress={onSignUp} />  
      </View>
    </View>
  );
};


export default SiginInScreen;
