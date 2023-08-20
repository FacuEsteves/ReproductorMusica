import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [canciones, setCanciones] = useState([]);
  const cancionesRef = firebase.firestore().collection('canciones');
  const navigation = useNavigation();

  useEffect(() => {
    cancionesRef.orderBy('title', 'asc').onSnapshot(querySnapshot => {
      const canciones = [];
      querySnapshot.forEach(doc => {
        const { title } = doc.data();
        canciones.push({
          id: doc.id,
          title
        });
      });

      setCanciones(canciones);
    });
  }, []);

  // Borrar canción
  const deleteCancion = cancion => {
    cancionesRef
      .doc(cancion.id)
      .delete()
      .then(() => {
        alert("Deleted successfully"); // Mensaje de éxito
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Lista de Canciones</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Agregar cancion')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: 50 }}
        data={canciones}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>
                {item.title ? item.title[0].toUpperCase() + item.title.slice(1) : ''}
              </Text>
            </View>
            <View style={styles.innerContainerFin}>
              <FontAwesome 
                name='play'
                color='green'
                onPress={() => navigation.navigate('Reproductor', { item })}
                style={styles.playIcon}
              />
              <FontAwesome
                name='info'
                color='blue'
                onPress={() => navigation.navigate('Detalles', { item })}
                style={styles.playIcon}
              />
              <FontAwesome
                name='trash-o'
                color='red'
                onPress={() => deleteCancion(item)}
                style={styles.playIcon}
              />
            </View>
          </View>
        )}
      />
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
    justifyContent:'space-between',
  },
  innerContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  innerContainerFin: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 25,
    marginRight: 40,
  },
  formContainer: {
    flexDirection: 'row',
    height: 90,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
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
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  playIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 5,
    fontSize: 30,
    marginRight:10,
    marginLeft:10,
  },
  text: {
    fontSize: 40,
    marginTop: 10,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
