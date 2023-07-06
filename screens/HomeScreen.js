import React, { useState,useEffect   } from 'react';
import { View, Text, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import styles from '../styles/style';

import {database, ref, get} from "../fb";

const dataRef = ref(database, "boards");   // 디비 설정

const HomeScreen = ({ navigation, route }) => {
  const { username, userid, carrier, isAdmin, newData } = route.params
  const [boardData, setBoardData] = useState([])
  const [carrierType, setCarrierType] = useState('')
  const [showButton, setShowButton] = useState(true)
  const [writeButton] = useState(isAdmin)
  const [isData, setIsData] = useState(false)

  useEffect(() => {
      readData()
  }); // }, [carrierType])carrierType 변경 시에만 readData 함수 호출;

  const onLogout = () => {  // 로그아웃 로직 구현
    navigation.navigate('로그인')
  }
  const onWriteBtn = () => {
    navigation.navigate('WriteBoard', { username, userid, carrier, isAdmin } )
  }
  const onPreBtn = () => {
    setShowButton(true)
    setCarrierType('')
  }
  const onSktBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false)
    setCarrierType("SKT")
  }
  const onKtBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false)
    setCarrierType('KT')
  }
  const onLGBtn = () => {  // SKT 버튼을 눌렀을 때
    setShowButton(false)
    setCarrierType('LG')
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
          const newData = keys
          .map((key) =>{
            const specificData = data[key];
            if(specificData.carrier === carrierType){
              return {
                key,
                carrier: specificData.carrier,
                author: specificData.author,
                title: specificData.title,
                description: specificData.description,
              };
            } 
          }) 
          if (JSON.stringify(newData) !== JSON.stringify(boardData)) {  // 값이 변경되었을 때만 setBoardData 호출
            setBoardData(newData);
          }
        });
      } else {
        // 데이터가 존재하지 않는 경우
        setIsData(false);
      }
    } catch (error) {
      console.error("데이터 읽기 실패:", error);
    }
  };

  const onBoardItem = (item) => {
    navigation.navigate('Board', { username, userid, isAdmin, carrier, boardId: item.key})
  }
  
  const renderBoard = ({item}) => {   // 게시판 렌더 함수
    if (item && item.carrier) {
      return(
        <TouchableOpacity onPress={() => onBoardItem(item)}>
          <View style={{ padding: 10 }}>
            <Text> {item.carrier}</Text>
            <Text> {item.title}</Text>
            <Text>작성자: {item.author}</Text>
            <Text> {item.description}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return null // item이 null이거나 'carrier' 속성이 없는 경우 아무것도 렌더하지 않음
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
              <>
                <Button title="게시글 작성" onPress={onWriteBtn} /> 
                <Button title="뒤로가기" onPress={onPreBtn} />
              </>
            )}
            {!isData && (
            <Text>아직 게시글이 존재하지 않습니다.</Text>
            )}
            {isData && ( // data에 데이터가 생성되면 renderItem 함수 실행
              <FlatList
                data={boardData}
                renderItem={renderBoard}
                keyExtractor={(item, index)=> {if (typeof index === 'number' && !isNaN(index)) {
                  return index.toString();
                } else {
                  return 'defaultKey';
                }}}
              />
            )}
          </View>
          )}
        <View style={styles.footer}>  
        </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
