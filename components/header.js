import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import {  Button, /*Avatar, makeStyles, Modal, Input, */ IconButton/* , Backdrop, Fade */ } from "@material-ui/core"
import { FavoriteBorder, Explore, Home } from '@material-ui/icons'

const win = Dimensions.get('window');
console.log('with of windos', win)

const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    marginLeft: 10
  },
  content: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logoHeader: {
    width: 110,
    height: 31
  },
  left: {
    flexDirection: 'row',
    top: -10,
  }
})

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
              <Home style={{ color: "#212112" }} />
            </IconButton>
          </View>
          <View>
            <IconButton>
              <FavoriteBorder style={{ color: "#212112" }}/> 
            </IconButton>
          </View>
          <View>
            <IconButton>
              <Explore style={{ color: "#212112" }}/>
            </IconButton>
          </View>

        </View>

      </View>

    </View>

  )
}

export default header
