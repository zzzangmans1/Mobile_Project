import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button} from 'react-native';

import styles from '../styles/style';

import { getDatabase, ref, set, onValue } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfVkqOfkxzOehXuoUuJp0wRrFq3DZBnco",
  authDomain: "orderaphone.firebaseapp.com",
  projectId: "orderaphone",
  storageBucket: "orderaphone.appspot.com",
  messagingSenderId: "127130382614",
  appId: "1:127130382614:web:c022ca0c6684b447b86037",
  measurementId: "G-N3HVR0CCGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



const SignUpScreen = ({ navigation }) => {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phonenum, setPhonenum] = useState('');
    const [birthday, setBirthday] = useState('');

    const onSignUpSec = () => {
        // 회원가입 성공 처리
        const dataRef = ref(database, "members");
        set(dataRef, {
            userid: userid,
            password: password,
            username: username,
            phonenum: phonenum,
            birthday: birthday
        });
        
        // 회원가입 실패 처리
      };

    return (
        <View style={styles.container}>
            <View >
                <TextInput 
                    style={styles.textinput} 
                    placeholder="아이디"
                    value={userid}
                    onChangeText={setUserid}
                />
                {/* 
                onChangeText : TextInput 값이 변경될때마다 저장
               */} 
                <TextInput 
                    style={styles.textinput} 
                    placeholder="패스워드"
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.textinput} 
                    placeholder="이름"
                    value={username}
                    onChangeText={setUsername} 
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="핸드폰 번호"
                    value={phonenum}
                    onChangeText={setPhonenum} 
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="생년월일"
                    value={birthday}
                    onChangeText={setBirthday} 
                />
            </View>
            <View>
                <Button title="완료" onPress={onSignUpSec}/>
            </View>
        </View>
      );
};
export default SignUpScreen;