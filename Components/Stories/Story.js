import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-paper'
//import LinearGradient from 'react-native-linear-gradient'
//import { LinearGradient } from 'expo-linear-gradient'

const story = ({ name, avatar }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.story}>
        {/* <LinearGradient 
          style={{ borderColor: ['#E1306C', 'yellow']}}
          colors={['#E1306C', 'yellow']}
          start={[0.5, 0.2]} 
        > */}
        <View style={styles.avatarBorderPink}>
          <View style={styles.avatarBorderWhite}>
            <Avatar.Image size={48} source={{ uri: avatar}} />
          </View>
        </View>
        
        <View>
          <Text style={styles.name}>{ name }</Text>
        </View>
        
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
  avatarBorderPink: {
    borderWidth: 2,
    borderColor: '#E1306C',
    borderStyle: 'solid',
    borderRadius: 999
  },
  avatarBorderWhite: {
    borderWidth: 2,
    borderColor: '#fafafa',
    borderStyle: 'solid',
    borderRadius: 999
  },  
  name: {
    alignSelf: 'center'
  },
})

export default story