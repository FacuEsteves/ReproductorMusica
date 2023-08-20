import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AlbumDetails({trackName, artistName}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{artistName}</Text>
      <Text style={styles.text}>{trackName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
  });