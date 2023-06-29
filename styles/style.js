import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
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
        width: 500,
        borderWidth: 1,
        borderColor: 'black',
    },
    button: {
        flexDirection: 'row',
    },
  });

  export default styles;