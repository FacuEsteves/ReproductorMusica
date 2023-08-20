import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const cancionesRef = firebase.firestore().collection('canciones');
  const [addTitle, setAddTitle] = useState('');
  const [addArtist, setAddArtist] = useState('');
  const [addalbumArtUrl, setAddAlbumArtUrl] = useState('');
  const [addaudioUrl, setAddAudioUrl] = useState('');
  const navigation = useNavigation();

  // Agregar una canción
  const addCancion = () => {
    // Verificar si se ingresó un título válido
    if (addTitle && addTitle.length > 0) {
      // Obtener la marca de tiempo
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        title: addTitle,
        artist: addArtist,
        albumArtUrl: addalbumArtUrl,
        audioUrl: addaudioUrl
      };
      cancionesRef
        .add(data)
        .then(() => {
          setAddTitle('');
          setAddArtist('');
          setAddAlbumArtUrl('');
          setAddAudioUrl('');
          // Ocultar el teclado
          Keyboard.dismiss();
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Agregar Cancion</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          placeholderTextColor="#aaaaaa"
          onChangeText={title => setAddTitle(title)}
          value={addTitle}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Artista"
          placeholderTextColor="#aaaaaa"
          onChangeText={artist => setAddArtist(artist)}
          value={addArtist}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="URL imagen"
          placeholderTextColor="#aaaaaa"
          onChangeText={albumArtUrl => setAddAlbumArtUrl(albumArtUrl)}
          value={addalbumArtUrl}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="URL cancion"
          placeholderTextColor="#aaaaaa"
          onChangeText={audioUrl => setAddAudioUrl(audioUrl)}
          value={addaudioUrl}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formContainerButton}>
        <TouchableOpacity style={styles.button} onPress={addCancion}>
          <Text style={styles.buttonText}>AGREGAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Lista cancion')}
        >
          <Text style={styles.buttonText}>REGRESAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: 'column',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  formContainerButton: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 26,
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 48,
    borderRadius: 5,
    backgroundColor: 'green',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  button2: {
    height: 48,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  text: {
    fontSize: 40,
    marginTop: 10,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
