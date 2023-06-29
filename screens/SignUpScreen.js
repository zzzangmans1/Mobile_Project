import React, { useState } from 'react';
import { View, TextInput, Button} from 'react-native';

import styles from '../styles/style';

import { getDatabase, ref, set, push, query, orderByChild, equalTo, onValue } from "firebase/database";

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
    
    const dataRef = ref(database, "members");   // 디비 설정

    // 아이디 중복인지 체크하는 함수
    const onCheckId = async () => {
        const idQuery = query(dataRef, orderByChild("userid"), equalTo(userid));
        // 쿼리 수행 및 결과 처리
        onValue(idQuery, (snapshot) => {
            if (snapshot.exists()) {
            // 아이디가 존재하는 경우
                alert("아이디가 이미 존재합니다.");
            } else {
                // 아이디가 존재하지 않는 경우
                alert("아이디를 사용할 수 있습니다.");
            }
        })
    };

    const onSignUpSec = () => {
        // 회원가입 실패 처리
        if (!userid || !password || !username || !phonenum || !birthday){
            alert('입력을 다해주세요.');
        }
        else if (phonenum.length > 0 && phonenum.length <= 11){ 
            const newUserRef = push(dataRef); // push : 고유한 해쉬값을 넣어준다.
            set(newUserRef, {                          // 디비 입력
                userid: userid,
                password: password, 
                username: username,
                phonenum: phonenum,
                birthday: birthday,
                uid: newUserRef.key,
            });
            alert('회원가입이 완료되었습니다. 로그인창으로 이동합니다.');
            navigation.navigate('로그인');
        }
        // 회원가입 성공 처리
        else { 
            alert('폰 번호를 제대로 입력해주세요.');
        }
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
                <Button title="아이디 검사" onPress={onCheckId}/>
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