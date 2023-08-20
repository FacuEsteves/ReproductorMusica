import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AlbumCover from '../src/components/AlbumCover';
import AlbumDetails from '../src/components/AlbumDetails';
import Controls from '../src/components/Controls';
import ReactPlayer from 'react-player';
import { firebase } from '../config';

const Player = ({ route }) => {
  const [pause, setPause] = useState(true);
  
  const initialSong = {
    id: "",
    title: "",
    artist: "",
    albumArtUrl: "",
    audioUrl: ""
  };

  const [song, setSong] = useState(initialSong);

  const getSongById = async (id) => {
    const dbRef = firebase.firestore().collection('canciones').doc(id);
    const doc = await dbRef.get();
    const song = doc.data();
    setSong({ ...song, id: doc.id });
  };

  useEffect(() => {
    getSongById(route.params.item.id);
  }, []);

  function onPlay() {
    setPause(false);
  }

  function onPause() {
    setPause(true);
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        {/* Album cover */}
        <AlbumCover albumCover={song.albumArtUrl} />

        {/* Album details */}
        <AlbumDetails
          trackName={song.title}
          artistName={song.artist}
        />

        {/* Controls */}
        <Controls {...{ pause, onPause, onPlay }} />

        <ReactPlayer
          url={song.audioUrl}
          playing={!pause}
          controls={true}
          width="0"
          height="0"
        />
      </View>
    </>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111436',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videostyle: {
    width: 0,
    height: 0,
  },
});
