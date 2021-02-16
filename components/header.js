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
              <svg width="19px" height="19px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></g></g></svg>
            </View>
            </IconButton>
          </View>
          <View>
            <IconButton>
              <svg aria-label="Activity Feed" className="_8-yf5 " fill="#212121" width="20" height="20" viewBox="0 0 48 48"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            </IconButton>
          </View>
          <View>
            <IconButton>
              <svg aria-label="Messenger" className="_8-yf5 " fill="#212121" width="20" height="20" viewBox="0 0 48 48"><path d="M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0 .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0 41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2 34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z"></path></svg><div className="KdEwV"><div className="J_0ip  Vpz-1  TKi86 "></div></div>
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
    //flex: 1,
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
