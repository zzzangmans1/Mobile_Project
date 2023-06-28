import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const handleLogout = () => {
    // 로그아웃 로직 구현
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to {username}!</Text>
      <Button title="Logout" onPress={handleLogout} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomeScreen;
