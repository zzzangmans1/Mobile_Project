import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import styles from '../styles/style';

import firebaseConfig, {initializeApp,getDatabase, ref, set, push, query, orderByChild, equalTo, get } from "../fb";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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
      console.log(userid)
      navigation.navigate('Home', { userid });
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
    <View style={styles.container}>
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
