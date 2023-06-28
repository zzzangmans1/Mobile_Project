import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 
          name 은 페이지 이름을 설정할 수 있고
          component 는 페이지 js 파일
         */}
        <Stack.Screen name="Hey Don DonLogin" component={LoginScreen}  /> 
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
