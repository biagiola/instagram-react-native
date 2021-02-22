import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Alert, TextInput, View, TouchableOpacity, Dimensions } from 'react-native'
import IsolatedComment from './IsolatedComment'
import firebase from '../../../firebase'
const win = Dimensions.get('window')

const PostComments = ({ comments, postId, username }) => {
  const [comment, setComment] = useState('') // new comment from GUI

  /* add new comment */
  const handleCommentSave = () => {
    if(comment.length > 0) {
      try {
        firebase.db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .add({
            text: comment,
            username: username, // this must to come from reducer
            timestamp: Date.now()
          }).then( // res => { console.log('comment added res', res)
            setComment('') // clear the inputText
          ).catch( error => {
            console.log('error to add comment to firebase')
            Alert.alert(
              'Firebase',
              'Add comment error', 
              [
                { text: 'ok', onPress: () => console.log('error message alert gone', error)}
              ],
              {
                cancelable: true,
              }
            )
          })
        
      } catch (error) {
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
        console.log('Internet connection error', error.message)
      }
    }
  }

  /* clear things up every new comment added */
  useEffect(() => {
    return () => clearInterval(handleCommentSave)
  }, [setComment])

  const handlePost = (e) => {
    console.log('comment', comment)
    console.log('e.pageY', e.pageY)
    console.log('handlePost e',e)
  }

  return (
    <View>
      {/* read comments */}
      <View style={styles.comments}>
        {comments.length > 0 ? comments.map( comment => 
          <IsolatedComment 
            key={comment.id}
            postId={postId}
            comment={comment}
          /> 
        ) : <Text></Text>}
      </View>

      {/* add comment */}
      <View style={styles.addComment}>
        {/* input */}
        <View>
          <TextInput
            style={styles.inputComment}
            placeholder='Add new comment...'
            onChangeText={value => setComment(value)}
            value={comment}
            onPress={handlePost}
          />
        </View>
        {/* right icons */}
        <View style={styles.button}>
          <TouchableOpacity style={{ height: 35, marginTop: 10 }} onPress={handleCommentSave}>
            <Text style={{ color: '#999999'}}>POST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PostComments

const styles = StyleSheet.create({
  buttons: {
    marginRight: 10
  },
  inputComment: {
    height: 35,
    width: win.width*0.85,
    padding: 10,
    borderBottomWidth: 0
  },
  addComment: {
    flexDirection: 'row'
  }
})