import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableNativeFeedback, TouchableOpacity, Dimensions } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Avatar } from 'react-native-paper'
import Svg, { Circle } from 'react-native-svg'

import firebase from '../firebase'
import axios from 'axios'

const win = Dimensions.get('window')

const Post = ({ postId, username, caption, imageUrl, filterPost}) => {
  const [anchorEl, setAnchorEl] = useState(null) 
  const [postDeleted, setPostDeleted] = useState(false)
  const [comments, setComments] = useState([]) // comming from db
  const [comment, setComment] = useState('') // new comment from GUI

  useEffect(() => {
    syncFeed()
  }, [])

  const syncFeed = () => {
    if (postId) {
      // comments from db (firebase)
      firebase.db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot( snapshot => {
          setComments(snapshot.docs.map(doc => doc.data()));
        })
    }

    console.log('comments',comments)
  }

  // modal opens
  const handleClick = event => {
    console.log('handleClick hola')
    setAnchorEl(event.currentTarget)
  }
  // modal close
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    console.log('handleDelete hola')
    axios.delete('http://192.168.100.52:9000/posts/delete/' + postId)
      .then( res => {
        console.log('article deleted!', res)
        //setPostDeleted(true)
        filterPost(res.data.id)
        setAnchorEl(false)
      })
      .catch(error => console.log('something went wrong!', error))
  }

  const handlePost = (e) => {
    console.log('comment', comment)
    console.log('hola', e.pageY)
    console.log('handlePost e',e)
  }

  const handleCommentSave = async() => {
    console.log('onPress detected')
    if(comment.length > 0) {
      await firebase.db
        .collection("posts")
        .doc(postId)
        .collection("comments").add({
          id: Date.now(),
          text: comment,
          username: username // this must to come from reducer
        })
    }
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
              <View style={styles.moreVerticalButton}> 
                <Svg 
                  fill="#212121" 
                  width={24} 
                  height={24} 
                  viewBox="0 0 24 24" 
                  /* stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" */><Circle cx="12" cy="12" r="2"></Circle><Circle cx="12" cy="5" r="2"></Circle><Circle cx="12" cy="19" r="2"></Circle></Svg>
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

      {/* read comments */}
      <View style={styles.comments}>
        <View style={styles.caption}>
          <Text>{caption}</Text>  
        </View>
        <View style={styles.comments}>
          {comments.map( comment => 
            <View style={styles.caption} key={comment.id}>
              <View>
                <Text style={styles.username}>{comment.username}</Text>
              </View>
              <View style={styles.text}>
                <Text>{comment.text}</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* add comments */}
      <View style={styles.addComment}>
        <View>
          <TextInput
            style={styles.inputComment}
            placeholder='Add new comment...'
            onChangeText={ value => setComment(value) }
            value={ comment }
            onPress={ handlePost }
          />
        </View>
        <View style={ styles.button }>
          <TouchableOpacity style={{ height: 100, marginTop: 10 }} onPress={() => handleCommentSave()}>
            <Text style={{ color: '#999999'}}>POST</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 45,
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
  moreVertical: {
    paddingTop: 10,
    color: '#212121',
  },
  moreVerticalButton: {
    borderRadius: 999,
    padding: 10,
  },
  menu: {
    paddingTop: '0',
    paddingBottom: '0',
    
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
    justifyContent: 'flex-start',
    marginTop: 10
  },
  username: {
    fontWeight: '900',
    marginRight: 5
  },
  comments: {
    padding: 10,
  },
  inputComment: {
    height: 35,
    width: win.width*0.85,
    padding: 10,
  },
  addComment: {
    flexDirection: 'row'
  }
})

export default Post
