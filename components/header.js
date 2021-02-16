import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import { IconButton } from "@material-ui/core"
const win = Dimensions.get('window');
console.log('with of windos', win)

const header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.content}>
        
        <View style={styles.right}>
          <Image
            style={styles.logoHeader}
            source={{uri: "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"}}
          />
        </View>
        
        <View style={styles.left}>
          
          <View>
            <IconButton>
            <View style={styles.plusIcon}>
              <Text>a</Text>
            </View>
            </IconButton>
          </View>
          <View>
            <IconButton>
              <Text>b</Text>
            </IconButton>
          </View>
          <View>
            <IconButton>
            <Text>c</Text>
            </IconButton>
          </View>

        </View>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    marginLeft: 10
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
    top: -10,
  }
})

export default header
