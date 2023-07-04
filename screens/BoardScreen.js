import { View, Text, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import styles from '../styles/style';


const BoardScreen = ({ navigation, route }) => {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            <View style={styles.content}>
                <Text>보더 스크린입니다.</Text>
            </View>
            <View style={styles.footer}>  
            </View>
        </SafeAreaView>
    )   
} 
export default BoardScreen;