import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView  } from 'react-native';

import styles from '../styles/style';

import {database ,ref, set, push, query, orderByChild, equalTo, get } from "../fb";

const dataRef = ref(database, "boards");   // 디비 설정

const HomeScreen = ({ navigation, route }) => {
  const { username, isAdmin } = route.params;

  const [showButton, setShowButton] = useState(true);
  const [writeButton] = useState(isAdmin)

  const onLogout = () => {  // 로그아웃 로직 구현
    navigation.navigate('로그인')
  }
  const onWrite = () => {
    navigation.navigate('Board', { username, isAdmin } )
  }

  const onSktBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false);
  }
  const onKtBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false);
  }
  const onLGBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false);
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text>Welcome to {username} 님!</Text>
          <Button title="Logout" onPress={onLogout} />
          <Button title="마이페이지" />
        </View>
        {showButton && (
        <View style={styles.content}>
          <Button title='LG' onPress={onLGBtn}/>
          <Button title='SKT' onPress={onSktBtn}/>
          <Button title='KT' onPress={onKtBtn}/>
        </View>
        )}
        {!showButton && (
          <View style={styles.content}>
            { writeButton && (    // isAdmin 이 True 여야만 게시글 작성 버튼이 생성
            <Button title="게시글 작성" onPress={onWrite} />
            )}
            <Text>아직 게시글이 존재하지 않습니다.</Text>
          </View>
          )}
        <View style={styles.footer}>  
          <Text style={styles.title}>Welcome to {username} 님!</Text>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
