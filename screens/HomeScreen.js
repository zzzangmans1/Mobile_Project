import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import styles from '../styles/style';

const HomeScreen = ({ navigation, route }) => {
  const { userid } = route.params;
  const onLogout = () => {
    // 로그아웃 로직 구현
    navigation.navigate('로그인');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to {userid} 님!</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default HomeScreen;
