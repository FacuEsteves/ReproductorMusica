import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Detallescancion = ({ route }) => {
    const navigation = useNavigation();
    const initialSong = {
        id: "",
        title: "",
        artist: "",
        albumArtUrl: "",
        audioUrl: ""
    };

    const [song, setSong] = useState(initialSong);

    const handleTextChange = (value, prop) => {
        setSong({ ...song, [prop]: value });
    };

    const getSongById = async (id) => {
        const dbRef = firebase.firestore().collection('canciones').doc(id);
        const doc = await dbRef.get();
        const songData = doc.data();
        setSong({ ...songData, id: doc.id });
    };

    const updateSong = async () => {
        const dbRef = firebase.firestore().collection('canciones').doc(song.id);
        await dbRef.set({
            title: song.title,
            artist: song.artist,
            albumArtUrl: song.albumArtUrl,
            audioUrl: song.audioUrl
        });
        setSong(initialSong);
        navigation.navigate("Lista cancion");
    };

    useEffect(() => {
        getSongById(route.params.item.id);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.formContainer}>
                <Text style={styles.text}>Detalles Cancion</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.subtext}>Titulo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Titulo"
                    placeholderTextColor="#aaaaaa"
                    value={song.title}
                    onChangeText={(value) => handleTextChange(value, "title")}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.subtext}>Artista</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Artista"
                    placeholderTextColor="#aaaaaa"
                    value={song.artist}
                    onChangeText={(value) => handleTextChange(value, "artist")}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.subtext}>URL imagen</Text>
                <TextInput
                    style={styles.input}
                    placeholder="URL imagen"
                    placeholderTextColor="#aaaaaa"
                    value={song.albumArtUrl}
                    onChangeText={(value) => handleTextChange(value, "albumArtUrl")}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.subtext}>URL cancion</Text>
                <TextInput
                    style={styles.input}
                    placeholder="URL cancion"
                    placeholderTextColor="#aaaaaa"
                    value={song.audioUrl}
                    onChangeText={(value) => handleTextChange(value, "audioUrl")}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.formContainerButton}>
                <TouchableOpacity style={styles.button} onPress={() => updateSong()}>
                    <Text style={styles.buttonText}>ACTUALIZAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Lista cancion')}>
                    <Text style={styles.buttonText}>REGRESAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        height: 50,
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
    text: {
        fontSize: 40,
        marginTop: 10,
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 20,
        marginBottom: 15,
        justifyContent: 'flex-start',
        fontWeight: 'bold',
    },
});

export default Detallescancion;

