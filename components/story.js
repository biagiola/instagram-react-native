import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from '@material-ui/core'
import RNBounceable from '@freakycoder/react-native-bounceable'

const story = ({ name, avatar }) => {
  return (
    <TouchableWithoutFeedback>
      <RNBounceable>
        <View style={styles.story}>
          <Avatar 
            src={ avatar }
            style={{ border: ' 3px solid #DC5399', alignSelf: 'center'}}
          />
          <Text style={styles.name}>{ name }</Text>
        </View>
      </RNBounceable>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  story: {
    margin: 5
  },
  name: {
    alignSelf: 'center'
  }
})

export default story