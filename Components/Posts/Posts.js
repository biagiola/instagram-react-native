import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
/* import { useStateValue } from '../../StateProvider' */
import Stories from '../Stories/Stories'
import Post from './Post'

const Posts = () => {
  const [posts, setPosts] = useState([]) // posts comming from db
  //const [{ userName, userEmail, newPosts }] = useStateValue()

  /* retrieve posts from nodejs */
  const syncFeed = () => {
    axios.get('https://instagram-2021.herokuapp.com/posts/retrieve')
      .then(res => {
        setPosts(res.data)
      })
      .catch( err => console.log('there was an error'))
  }

  /* load every first time */
  useEffect(() => {
    syncFeed()
    return () => clearInterval(syncFeed)
  }, [])

  /* clean things up every new post */
  useEffect(() => {
    return () => clearInterval(syncFeed)
  }, [posts])

  /* implement socketIO from realtime rendering */
  useEffect(() => {
        
  }, [])

  /* delete post */
  const handleFilter = (id) => {
    setPosts( posts.filter( postdata => (postdata._id !== id) ))
  }

  return (
    <View style={styles.posts}>
      <FlatList 
        keyExtractor={item => item._id}
        data={posts}
        ListHeaderComponent={Stories}
        renderItem={ ({item}) => (
          <Post
            key={item._id}
            postId={item._id} 
            username={item.user}
            caption={item.caption}
            imageUrl={item.image}
            filterPost={ dato => handleFilter(dato) }
          />  
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  posts: {
    marginTop: 5,
    marginBottom: 180
  }
})

export default Posts