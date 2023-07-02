import React, { useState } from 'react';
import { View, TextInput, Button, SafeAreaView} from 'react-native';

import styles from '../styles/style';
import {database ,ref, set, push, query, orderByChild, equalTo, get } from "../fb";


// 정규식
const isNum = /[0-9]/; //숫자
const isArp = /[a-zA-Z]/; //영어
const isPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,12}$/
const isHangeul = /^[가-힣]{2,6}$/; // 2~6 글자 한글
const isPhone = /^010\d{4}\d{4}$/;
const isBirth = /\d{4}\d{2}\d{2}$/;
const SignUpScreen = ({ navigation }) => {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [username, setUsername] = useState('');
    const [phonenum, setPhonenum] = useState('');
    const [birthday, setBirthday] = useState('');
    
    const [isCheckID, setIsCheckID] = useState(false);
    const [isCheckPass, setIsCheckPass] = useState(false);

    const dataRef = ref(database, "members");   // 디비 설정

    const onSignUpSuc = () => {
        // 회원가입 실패 처리
        console.log(`여기는 onSignUpSuc() ${isCheckPass}`)
        if (!userid || !password || !username || !phonenum || !birthday){
            alert('입력을 다해주세요.')
        } else if (!isCheckID) {
            alert('아이디 중복을 체크해주세요.')
        } else if (!isPhone.test(phonenum)){ 
            alert('폰 번호를 제대로 입력해주세요.');
        } else if (!(isHangeul.test(username))) {
            alert('이름을 제대로 입력해주세요.')
        } else if (!(isBirth.test(birthday))){
            alert('생년월일을 제대로 입력해주세요.')
        } else if (!(isPass.test(password))){
            alert('특수문주와 숫자를 조합하여 8~12자리를 만들어 입력해주세요.')
        } else if (!isCheckPass){
            alert('패스워드가 같지 않습니다 다시 입력해주세요.')
        } else { // 회원가입 성공 처리
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
    };
    // 아이디 중복, 정규식 체크하는 함수
    const onCheckId = async () => {
        const idQuery = query(dataRef, orderByChild("userid"), equalTo(userid))
        const snapshot = await get(idQuery)
        // 쿼리 수행 및 결과 처리
        if (snapshot.exists()) {
            alert("아이디가 이미 존재합니다.");
            setIsCheckID(false)
        }else if (!userid) {
            alert('아이디를 입력해주세요.')
        }else if (!(userid.length > 6 && userid.length < 13)){
            alert('아이디의 길이를 7~12자로 맞춰주세요')
        }else if(!(isNum.test(userid) && isArp.test(userid))) {
            alert('아이디를 영어와 숫자를 조합하여 만들어주세요.')
        }else {
            alert(`아이디를 ${userid} 사용할 수 있습니다.`)
            setIsCheckID(true)
        }
    }
    const onChangePass = (text) => {
        setRePassword(text)
        if((password === text) && !isCheckPass){
            setIsCheckPass(true)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
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
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="패스워드 검사"
                    value={repassword}
                    secureTextEntry={true}
                    onChangeText={onChangePass}
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
                <Button title="휴대폰 검사" onPress={onCheckId}/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder="생년월일"
                    value={birthday}
                    onChangeText={setBirthday} 
                />
            </View>
            <View style={styles.content}>
                <Button title="완료" onPress={onSignUpSuc}/>
            </View>
            <View style={styles.footer}>
            </View>
        </SafeAreaView>
      );
};
export default SignUpScreen;