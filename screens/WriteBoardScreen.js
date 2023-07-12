import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { View, SafeAreaView, Text, Button, TextInput, Pressable, Image  } from 'react-native';
import { database, storage, ref,storageRef, set , uploadBytes, push } from "../fb"
import styles from '../styles/style';

const dataRef = ref(database, "boards");   // 디비 설정
const newPostRef = push(dataRef)

const titleRegex = /^(?!\s)[a-zA-Z0-9가-힣\s!@#$%^&*(),.?":{}|<>]+(?<!\s)$/;
const descriptionRegex = /^(?!\s)[a-zA-Z0-9가-힣\s!@#$%^&*(),.?":{}|<>]+(?<!\s)$/;

const WriteBoardScreen = ({ navigation, route }) => {

    const { username, userid, carrier, isAdmin } = route.params;
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [author] = useState(userid);
    // 권한 요청을 위한 hooks
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [imageUrl, setImageUrl] = useState('')    // 현재 이미지 경로
    const [ImageWidth, setImageWidth] = useState('');   // 이미지 Width
    const [ImageHeight, setImageHeight] = useState(''); // 이미지 Height

    // 시간 관련
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const currenttime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

    const onSaveImage = async (data) => {
        const response = await fetch(data);
        const blob = await response.blob();

        const metadata = {
        contentType: 'image/jpeg'
        };

        const ref = storageRef(storage,`BoardImages/${newPostRef.key}/1.jpeg` );
        uploadBytes(ref, blob, metadata);
        console.log('이미지 업로드 완료');
        
    }

    const onUploadImage = async () => {
        // 권한 확인 코드: 권한이 없으면 물어보고, 승인하지 않으면 함수 종료
        if (!status?.granted){
            const permission = await requestPermission();
            if(!permission.granted){
                return null
            }
        }
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1]
        })
        if(res.canceled){  // 이미지 업로드 취소한 경우
            return null 
        } else if (res.assets && res.assets.length > 0) {
            const selectedAsset = res.assets[0]
            selectedAsset.fileName
            const { width, height } = selectedAsset // 이미지 크기 가져오기
            setImageHeight(height)
            setImageWidth(width)
            // 선택한 이미지의 크기 출력
            //alert(`이미지 크기: ${width} x ${height}`)
            // 이미지 업로드 결과 및 이미지 경로 이벤트
            setImageUrl(selectedAsset.uri)
            onSaveImage(selectedAsset.uri)
        }
    }

    const onWriteSuc = () => {  // 게시판 완료
        if(!title || !description){
            alert(`제목과 본문을 입력해주세요.`)
        } else if (!(titleRegex.test(title))){
            alert(`제목을 제대로 입력해주세요.`)
            setTitle('')
        } else if (!(descriptionRegex.test(description))){
            alert(`본문을 제대로 입력해주세요.`)
            setDescription('')
        }else {
            try {
                set(newPostRef, {                          // 디비 입력
                    carrier: carrier,
                    title: title,
                    description: description,
                    author: author,
                    time: currenttime,
                    images: newPostRef.key,
                    imagescount : 0
                })
                alert('게시글 작성이 완료되었습니다.')
                navigation.navigate('Home', { username, userid,carrier, isAdmin, 
                    newData: {
                    carrier: carrier,
                    title: title,
                    description: description,
                    author: author,
                    time: currenttime,
                  } })
            }
            catch (error){
                alert('게시글 작성이 실패하였습니다.', error)
            }
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={onUploadImage} style={{
        justifyContent: 'center',
        alignItems: 'center',}}>
                    <Text>이미지 업로드하기</Text>
                </Pressable>
                <Image source={{ uri: imageUrl }} style={styles.image}/>
            </View>
            <View style={styles.content}>
                <TextInput
                    placeholder="제목을 입력해주세요."
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="본문을 입력해주세요."
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={styles.footer}>  
                <Button title="완료" onPress={onWriteSuc}/>
            </View>
        </SafeAreaView>
    )
}
export default WriteBoardScreen;