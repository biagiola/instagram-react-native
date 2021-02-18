import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-paper'

const story = ({ name, avatar }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.story}>
        <View style={styles.avatarBorder}>
          <Avatar.Image size={32} source={{ uri: avatar}} />
        </View>
        <Text style={styles.name}>{ name }</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  story: {
    margin: 5,
    alignSelf: 'center',
    alignItems: 'center'
  },
  avatarBorder: {
    borderWidth: 2,
    borderColor: '#E1306C',
    borderStyle: 'solid',
    borderRadius: 999
  },
  name: {
    alignSelf: 'center'
  },
})

export default story