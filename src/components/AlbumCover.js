import { StyleSheet, View, Image, Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get("screen").width;

export default function AlbumCover({albumCover}) {
  return (
    <View style={{margin: 20}}>
      <Image
        resizeMode="contain"
        source={{uri: albumCover}}
        style={{width: width, height: 200, borderRadius: 20}}
      />
    </View>
  )
}

const styles = StyleSheet.create({})