import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'; 

export default function Control({pause, onPlay, onPause, onNext, onBack}) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.controlWrapper}>
        
          {/* play/pause btn */}
        {pause ? (
          <TouchableOpacity style={styles.playContainer} onPress={onPlay}>
            <AntDesign name="playcircleo" size={32} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.playContainer} onPress={onPause}>
            <AntDesign name="pausecircleo" size={32} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.formContainerButton}>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Lista cancion')}>
          <Text style={styles.buttonText}>REGRESAR</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  controlWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  playContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderColor: '#1B1246',
    borderWidth: 16,
    width: 126,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#1B1246',
    shadowOpacity: 0.5,
    elevation: 0.2,
    shadowRadius: 30,
  },
  formContainerButton: {
    flexDirection: 'row',
    height: 80,
    marginLeft:10,
    marginRight:10,
    marginTop:40,
    justifyContent:'space-between'
  },
  button2: {
    height: 48,
    borderRadius:5,
    backgroundColor: '#788eec',
    width:150,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
