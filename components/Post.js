import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { Avatar } from 'react-native-paper'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { MoreHoriz, Edit, DeleteOutline } from '@material-ui/icons'
import { Feather } from '@expo/vector-icons'
import { db } from '../firebase'
import axios from 'axios'

const win = Dimensions.get('window')

const Post = ({ postId, username, caption, imageUrl, filterPost}) => {
  const [anchorEl, setAnchorEl] = useState(null) 
  const [postDeleted, setPostDeleted] = useState(false)
  const [comments, setComments] = useState([]) // comming from db
  const [comment, setcomment] = useState('') // new comment from GUI

  useEffect(() => {
    syncFeed()
  }, [])

  const syncFeed = () => {
    if (postId) {
      // comments from db (firebase)
      db
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

  const handleComment = val => {
    setcomment(val)
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
          <View style={styles.more}>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick }> 
                <Feather name="more-horizontal" size={24} color="#4d4d4d" />
              </IconButton>
          </View>
        </View>
      </View>

      <Menu
        id="simple-menu"
        anchorEl={ anchorEl }
        keepMounted
        open={ Boolean(anchorEl) }
        onClose={ handleClose }
        MenuListProps={{ disablePadding: true }}
      >
        <View onClick={ handleDelete }>
          <MenuItem pt={ 2 } pb={ 2 }>
            <DeleteOutline/>
            <View>
              <Text style={styles.delete}>Delete</Text>
            </View>
          </MenuItem>
        </View>
      </Menu>

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
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        console.log('dismissed');
      }}>
        <View>
          <form className='post__commentBox'>
            <TextInput
              style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
              placeholder='Add new comment...'
              onChangeText={ handleComment }
              value={ comment }
              onPress={ handlePost }
            />
          </form>
        </View>
      </TouchableWithoutFeedback>
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
    color: '#212112',
    marginRight: 5
  },
  more: {
    paddingTop: 0,
  },
  moreIcon: {
    color: 'gray'
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
  inputContainer: {

  }
})

export default Post
