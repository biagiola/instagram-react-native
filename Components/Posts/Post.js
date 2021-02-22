import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Avatar } from 'react-native-paper'
import Menu, { MenuItem } from 'react-native-material-menu'
import Svg, { Circle, Path, Polyline } from 'react-native-svg'
import firebase from '../../firebase'
import PostComments from './Comments/PostComments'
import axios from 'axios'

const win = Dimensions.get('window')

const Post = ({ postId, username, caption, imageUrl, filterPost}) => {
  const [anchorEl, setAnchorEl] = useState(null) 
  const [postDeleted, setPostDeleted] = useState(false)
  const [comments, setComments] = useState({
      id: '', text: '', username:''
    }) // comming from db
  
  useEffect(() => {
    syncFeed()
    console.log('syncFeed comments', comments)
  }, [])

  /* retrieve comments */
  const syncFeed = () => {
    if (postId) {
      // comments from db (firebase)
      firebase.db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc") // id is timestamp
        .onSnapshot( querySnapshot => {
          const objs = []
          querySnapshot.docs.forEach(doc => {
            const { text, username, timestamp } = doc.data()
            console.log('syncFeed comments', text, username)
            objs.push({
              id: doc.id,
              text,
              username,
              timestamp
            })
          })
          console.log('syncFeed Post objs:', objs)
          setComments(objs)
        })
    }
  }

  let menu = null
  const setMenuRef = ref => {
    menu = ref
  }
  const hideMenu = () => {
    menu.hide()
  }
  const showMenu = () => {
    menu.show()
  }

  // Delete Post
  const handleDelete = () => {
    console.log('handleDelete ')
    axios.delete('http://instagram-2021.herokuapp.com/posts/delete/' + postId)
      .then( res => {
        console.log('article deleted!', res)
        //setPostDeleted(true)
        filterPost(res.data.id)
        //setAnchorEl(false) <-- close modal
      })
      .catch(error => console.log('something went wrong!', error))
  }

  const handlePost = (e) => {
    console.log('comment', comment)
    console.log('e.pageY', e.pageY)
    console.log('handlePost e',e)
  }

  const onPress = () => {
    console.log('onPress works')
  }

  return (
    <View style={styles.post}>
      
      {/* header */}
      <View style={styles.header}>
        
        {/* left */}
        <View style={styles.left}>
          <View style={styles.avatar}>
            <Avatar.Text size={32} label={username[0].toUpperCase()} />
          </View>
          
          <View style={styles.name}>
            <Text>{username}</Text>
          </View>
        </View>
        
        {/* right */}
        <View style={styles.right}>
          {/* more vertical */}
          <View style={{ borderRadius: 15, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={onPress}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                {/* open menu */}
                <Menu
                  ref={setMenuRef}
                  button={
                    <View style={styles.moreVerticalButton}> 
                      <Text onPress={showMenu}>
                        <Svg fill="#212121" width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><Circle cx="12" cy="12" r="2"></Circle><Circle cx="12" cy="5" r="2"></Circle><Circle cx="12" cy="19" r="2"></Circle></Svg>
                      </Text>  
                    </View>
                  }
                >
                  {/* delete item */}
                  <MenuItem onPress={ handleDelete }>
                    <View style={styles.menuDeleteIcon}>
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="#fafafa" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Polyline points="3 6 5 6 21 6"></Polyline><Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></Path></Svg>
                    </View>
                    <View style={styles.menuText}>
                      <Text>Delete</Text>
                    </View>
                  </MenuItem>

                </Menu>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>

      {/* image */}
      <View style={styles.image}>
        <AutoHeightImage
          width={win.width}
          source={{ uri: imageUrl}}
        />
      </View>

      {/* caption */}
      <View style={styles.caption}>
        <Text>{caption}</Text>  
      </View>
      
      {/* read comments */}
      <PostComments 
        comments={comments}
        postId={postId}
        username={username}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 30,
    backgroundColor: '#ffffff', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  left: {
    flexDirection: 'row',
  },
  avatar: {
    padding: 10,
  },
  name: {
    padding: 10,
    paddingTop: 15 
  },
  right: {
    marginRight: 5
  },
  moreVerticalButton: {
    borderRadius: 999,
    padding: 15,
  },
  menu: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  menuDeleteIcon: {
    paddingRight: 10
  },
  MuiListPadding: {
    paddingTop: '0',
    paddingBottom: '0'
  },
  delete: {
    fontSize: 15
  },
  image: {
    flex: 1,
    width: win.width,
  },
  caption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10
  },
})

export default Post
