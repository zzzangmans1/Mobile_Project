import React, { useState,useEffect   } from 'react';
import { View, Text, Button, SafeAreaView, FlatList } from 'react-native';

import styles from '../styles/style';

import {database ,ref, set, push, query, orderByChild, equalTo, get } from "../fb";

const dataRef = ref(database, "boards");   // 디비 설정

const HomeScreen = ({ navigation, route }) => {

  useEffect(() => {
    readData(); // HomeScreen 컴포넌트가 처음 렌더링될 때 readData 함수 실행
  });
  
  const { username, isAdmin } = route.params;
  const [boardData, setBoardData] = useState([]);

  const [showButton, setShowButton] = useState(true)
  const [writeButton] = useState(isAdmin)
  const [isData, setIsData] = useState(false)

  const onLogout = () => {  // 로그아웃 로직 구현
    navigation.navigate('로그인')
  }
  const onWrite = () => {
    navigation.navigate('Board', { username, isAdmin } )
  }

  const onSktBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false);
    readData()
  }
  const onKtBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false);
    readData()
  }
  const onLGBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false);
    readData()
  }
  const readData = async () => {
    try {
      const snapshot = await get(dataRef); // 데이터 읽기
      if (snapshot.exists()) {
        // 데이터가 존재하는 경우
        setIsData(true)
        const data = snapshot.val();
        const keys = Object.keys(data); // 모든 고유 키 값 가져오기
        keys.forEach(key => {           // push()로 넣은 값을 다 가져온다.
          const newData = keys.map((key) =>{
            const specificData = data[key];
            return {
              key,
              author: specificData.author,
              title: specificData.title,
              description: specificData.description,
            };
          }) 
          setBoardData(newData);
        });
      } else {
        // 데이터가 존재하지 않는 경우
        console.log("데이터가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("데이터 읽기 실패:", error);
    }
  };
  
  const renderBoard = ({item}) => {   
    const { key, author, title,  description } = item;
    return(
    <View style={{ padding: 10 }}>
      <Text> {title}</Text>
      <Text>작성자: {author}</Text>
      <Text> {description}</Text>
    </View>)
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
            {!isData && (
            <Text>아직 게시글이 존재하지 않습니다.</Text>
            )}
            {isData && (
              <FlatList
                data={boardData}
                renderItem={renderBoard}
                keyExtractor={(item, index)=> index.toString()}
              />
            )}
          </View>
          )}
        <View style={styles.footer}>  
          <Text style={styles.title}>Welcome to {username} 님!</Text>
        </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
