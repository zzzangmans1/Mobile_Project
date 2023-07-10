import { StyleSheet, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        backgroundColor: 'yellow',
        height: '20%',
        width: '100%',
        flexDirection: 'row',
    },
    content:{
        backgroundColor: 'white',
        height: '60%',
        width: '100%',
    },
    footer:{
        backgroundColor: 'green',
        height: '20%',
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    textinput: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderWidth: 1,
        borderColor: 'black',
    },
    button: {
        flexDirection: 'row',
    },
    board: {
        backgroundColor: '#CCE5FF',
        padding: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10, 
        marginLeft: 10, 
        backgroundColor: 'grey',
    }
  });

  export default styles;