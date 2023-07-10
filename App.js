import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import WriteBoardScreen from './screens/WriteBoardScreen';
import BoardScreen from './screens/BoardScreen'

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
        <Stack.Screen name="로그인" component={SignInScreen}  /> 
        <Stack.Screen name="회원가입" component={SignUpScreen}  /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WriteBoard" component={WriteBoardScreen} />
        <Stack.Screen name="Board" component={BoardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}