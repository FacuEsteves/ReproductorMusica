import { StyleSheet} from 'react-native'
import { ListItem, Avatar } from "react-native-elements";
import { TRACKS } from '../tracks-data';
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

export default function SongsList() {
    
    {TRACKS.map((track) => {
        return (
        <ScrollView>
            <ListItem key={track.title}>
                <ListItem.Chevron />
                <Avatar source={{uri: track.albumArtUrl}}/>
                <ListItem.Content>
                    <ListItem.Title>{track.title}</ListItem.Title>
                    <ListItem.Subtitle>{track.artist}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </ScrollView>
        );
      })}
}

const styles = StyleSheet.create({})