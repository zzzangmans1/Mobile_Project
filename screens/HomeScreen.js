import React from 'react';
import { View, Text, Button, SafeAreaView  } from 'react-native';

import styles from '../styles/style';

const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const onLogout = () => {
    // 로그아웃 로직 구현
    navigation.navigate('로그인');
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topview}>
          <Text>Welcome to {username} 님!</Text>
          <Button title="Logout" onPress={onLogout} />
          <Button title="마이페이지" />
        </View>
        <View style={styles.midview}>
        <Text style={styles.title}>Welcome to {username} 님!</Text>
        </View>
        <View style={styles.bottomview}>
        <Text style={styles.title}>Welcome to {username} 님!</Text>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
