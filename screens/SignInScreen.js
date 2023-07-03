import React, { useState } from 'react';
import { View, TextInput, Button, SafeAreaView } from 'react-native';

import styles from '../styles/style';

import {database ,ref, set, push,val, query, orderByChild, equalTo, get } from "../fb";



const SiginInScreen = ({ navigation }) => {

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const dataRef = ref(database, "members");   // 디비 설정

  const onSignIn = async () => {
    const idQuery = query(dataRef, orderByChild("userid"), equalTo(userid))
    const idRes = await get(idQuery);
    const passQuery = query(dataRef, orderByChild("password"), equalTo(password))
    const passRes = await get(passQuery);

    // 로그인 로직 구현
    if (idRes.exists() && passRes.exists()) {
      const userData  = idRes.val()
      const firstUserId = Object.keys(userData)[0];   // userData에서 첫 번쨰 uid 값을 가져와서 저장
      const username = userData[firstUserId].username;  // uid 값의 username 가져온다.
      const isAdmin = userData[firstUserId].isAdmin;
      navigation.navigate('Home', { username, isAdmin });

    } else {
      // 로그인 실패 처리
      alert('로그인에 실패하였습니다.');
    }
  };

  // 회원가입 로직 구현
  const onSignUp = () => {
    navigation.navigate('회원가입');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.textinput}
          placeholder="아이디를 입력해주세요."
          value={userid}
          onChangeText={setUserid}
        />
        <TextInput
          style={styles.textinput}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="로그인" onPress={onSignIn} />
        <Button title="회원가입" onPress={onSignUp} /> 
      </View>
      <View style={styles.footer}>
      </View>
    </SafeAreaView>
  );
};


export default SiginInScreen;
