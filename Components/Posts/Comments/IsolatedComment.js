import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, TouchableNativeFeedback, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import Svg, { Circle, Path, Polyline, Line, Polygon } from 'react-native-svg'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import firebase from '../../../firebase'
const win = Dimensions.get('window')

const IsolatedComment = ({ comment, postId }) => {
  const [editBox, setEditBox] = useState(false)
  const [editedComment, setEditedComment] = useState(comment.text)
  let menu = null
  
  console.log('IsolatedComment comment', comment)
  
  const setMenuRef = ref => {
    menu = ref
  }
  const hideMenu = () => {
    menu.hide()
  }
  const showMenu = () => {
    menu.show()
  }
  
  const onPress = () => {
    console.log('onPress works')
  }

  const handleDelete = async() => {
    console.log('delete commentId', comment.id)
    //hideMenu()
    try {
      await firebase.db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(comment.id).delete()
    } catch(error) {
      Alert.alert(
        'Firebase',
        'Internet connection error', 
        [
          { text: 'ok', onPress: () => console.log('error message alert gone', error)}
        ],
        {
          cancelable: true,
        }
      )
    }
  }

  const handleUpdate = async() => {
    console.log('update commentId')
    
    try {
      setEditedComment('')
      setEditBox(!editBox)

        await firebase.db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(comment.id).update({
          text: editedComment,
        })
      
    } catch(error) {
      Alert.alert(
        'Firebase',
        'Internet connection error', 
        [
          { text: 'ok', onPress: () => console.log('error message alert gone', error)}
        ],
        {
          cancelable: true,
        }
      )
    }
  }

  const toggleEditBox = () => {
    hideMenu()
    setEditBox(!editBox)
  }

  useEffect(() => {
    return () => clearInterval(handleUpdate)
  }, [editBox, editedComment])

  useEffect(() => {
    return () => clearInterval(handleDelete)
  }, [comment])

  return (
    <View style={styles.commentBox} key={comment.id}>
      {/* Comment */}
      <View style={styles.comment}>
        {/* left side */}
        <View style={styles.commentsInfo}>
          {/* username */}
          <View>
            <Text style={styles.username}>{comment.username}</Text>
          </View>
          {/* caption */}
          <View style={styles.text}>
            <Text>{comment.text}</Text>
          </View>
        </View>
        
        {/* right side */}
        <View style={styles.icons}>
          {/* moreHorizontal */}
          <View style={{ borderRadius: 15, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={onPress}>
              <View style={ styles.buttons }>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                  ref={setMenuRef}
                  button={
                    <View style={styles.moreVerticalButton}> 
                      <Text onPress={showMenu}>
                        <Svg width={18} height={18} viewBox="0 0 24 24" fill="#212121" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Circle cx="12" cy="12" r="2"></Circle><Circle cx="19" cy="12" r="2"></Circle><Circle cx="5" cy="12" r="2"></Circle></Svg>
                      </Text>  
                    </View>
                  }
                >
                  {/* delete option */}
                  <MenuItem onPress={handleDelete}>
                    {/* icon */}
                    <View style={styles.menuIcon}>
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="#fafafa" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Polyline points="3 6 5 6 21 6"></Polyline><Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></Path></Svg>
                    </View>
                    {/* text */}
                    <View style={styles.menuText}>
                      <Text>Delete</Text>
                    </View>
                  
                  </MenuItem>
                  
                  
                  {/* update option */}
                  <MenuItem onPress={ () => toggleEditBox(!editBox) }>
                    {/* icon */}
                    <View style={styles.menuIcon}>
                      <Svg width={18} height={18} viewBox="0 0 24 24" fill="#fafafa" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></Path></Svg>
                    </View>
                    {/* text */}
                    <View style={styles.menuText}>
                      <Text>Update</Text>
                    </View>
                  </MenuItem>

                </Menu>
              </View>
                
              </View>
            </TouchableNativeFeedback>
          </View>
        
          {/* heart icon */}
          <View style={{ borderRadius: 15, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={onPress}>
              <View style={styles.buttons}>
                <Svg width={18} height={18} viewBox="0 0 24 24"  fill="none"  stroke="#212121"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round" ><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></Path></Svg>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>

      {/* Edit Comment box */}
      {
        editBox ? 
          <View style={styles.editBox}>
            {/* input */}
            <View >
              <TextInput 
                type="text" 
                autoFocus={true}
                value={editedComment}
                onChangeText={val => setEditedComment(val)} 
                style={styles.inputEdit}
              />
            </View>
            {/* buttons */}
            <View style={styles.buttonEdit}>
              {/* send */}
              <TouchableOpacity style={styles.iconEdit} onPress={handleUpdate}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="#fafafa" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="22" y1="2" x2="11" y2="13"></Line><Polygon points="22 2 15 22 11 13 2 9 22 2"></Polygon></Svg>
              </TouchableOpacity>
              {/* cancel */}
              <TouchableOpacity style={styles.iconEdit} onPress={() => setEditBox(!editBox)}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="#fafafa" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="18" y1="6" x2="6" y2="18"></Line><Line x1="6" y1="6" x2="18" y2="18"></Line></Svg>
              </TouchableOpacity>
            </View>
          </View>
        :
          <View></View>
      }
      
    </View>
  )
}

export default IsolatedComment

const styles = StyleSheet.create({
  commentBox: {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  commentsInfo: {
    flexDirection: 'row'
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5
  },
  icons: {
    flexDirection: 'row',
  },
  menuIcon: {
    marginRight: 5,
    paddingRight: 5
  },
  buttons: {
    marginRight: 10
  },
  editBox: {
    flexDirection: 'row',
  },
  inputEdit: {
    width: win.width*0.82,
    borderBottomWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#fbfbfb'
  },
  buttonEdit: {
    flexDirection: 'row',
    marginRight: 5
  },
  iconEdit: {
    marginTop: 10,
    padding: 2,

  }
})

