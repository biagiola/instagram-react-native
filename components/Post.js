import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Avatar } from '@material-ui/core'
import { MoreHoriz, Edit, DeleteOutline } from '@material-ui/icons'

const win = Dimensions.get('window')
console.log(win)

const Post = ({ postId, username, caption, imageUrl, /* filterPost */}) => {
  
  return (
    <View style={styles.post}>
      
      {/* header */}
      <View style={styles.header}>
        <View style={styles.left}>
          <Avatar alt={username} stlye={styles.avatar}/>
          <Text>{username}</Text>
          
        </View>
        <View style={styles.right}>
          <MoreHoriz/>
        </View>
      </View>

      {/* image */}
      <View style={styles.image}>
        <AutoHeightImage
          width={win.width}
          source={{ uri: imageUrl}}
        />
      </View>

      {/* comments */}
      <View style={styles.comments}>
        <View style={styles.caption}>
          <Text>{caption}</Text>  
        </View>

        <View style={styles.comments}>
          <Text>comments...</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    //border: '1px solid lightgray',
    width: 'fit-content',
    marginBottom: 45,
    backgroundColor: '#ffffff', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    //borderBottom: '1px solid lightgray',
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    color: '#212112',
    marginRight: 5
  },
  image: {
    flex: 1,
    width: win.width,
  },
  caption: {
    
  },
  comments: {
    padding: 10,
    
  }
})

export default Post
