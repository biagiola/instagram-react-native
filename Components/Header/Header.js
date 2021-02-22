import React from 'react';
import { View, StyleSheet, Dimensions, TouchableNativeFeedback } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image'
import Svg, { Path, Rect, Line } from 'react-native-svg'
const win = Dimensions.get('window')

const header = () => {

  const onPress = () => {
    console.log('onPress works')
  }
  return (
    <View style={styles.header}>
      <View style={styles.content}>
        
        <View style={styles.right}>
          <AutoHeightImage
            width={win.width/3.1}
            source={{ uri: "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"}}
          />
        </View>

        <View style={styles.left}>
          
          {/* add */}
          <View style={{ borderRadius: 15, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={onPress}>
              <View style={styles.buttons}>
                <Svg width={28}height={28}viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ><Rect x="3" y="3" width="18" height="18" rx="2" ry="2"></Rect><Line x1="12" y1="8" x2="12" y2="16"></Line><Line x1="8" y1="12" x2="16" y2="12"></Line></Svg>
              </View>
            </TouchableNativeFeedback>
          </View>
          
          {/* heart */}
          <View style={{ borderRadius: 15, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={onPress}>
              <View style={styles.buttons}>
                <Svg width={28} height={28} viewBox="0 0 24 24"  fill="none"  stroke="#212121"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round" ><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></Path></Svg>
              </View>
            </TouchableNativeFeedback>
          </View>
          
          {/* messenger */}
          <View style={{ borderRadius: 15, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={onPress}>
              <View style={styles.buttons}>
                <Svg fill="#212121" width={25} height={25} viewBox="0 0 48 48"><Path d="M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0 .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0 41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2 34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z"></Path></Svg>
              </View>
            </TouchableNativeFeedback>
          </View>

        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    marginLeft: 10,
    marginBottom: 10
  },
  buttons: {
    backgroundColor: "#fafafa",
    borderRadius: 999,
    padding: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logoHeader: {
    width: 110,
    height: 31
  },
  plusIcon: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(33, 33, 33)'
  },
  left: {
    flexDirection: 'row',
    top: -5,
  }
})

export default header
