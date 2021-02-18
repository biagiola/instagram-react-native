import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import Axios from 'axios'
import { useStateValue } from '../StateProvider'
import Stories from './stories'
import Post from './Post'

const win = Dimensions.get('window')
console.log(win)

const styles = StyleSheet.create({
  posts: {
    marginTop: 5
  }
})

const Posts = () => {
  const [posts, setPosts] = useState([]) // posts comming from db
  //const [{ userName, userEmail, newPosts }] = useStateValue()

  const syncFeed = () => {
    Axios.get('http://192.168.100.52:9000/posts/retrieve/')
      .then(res => {
        console.log('res.data', res.data)
        setPosts(res.data)
      })
      .catch( err => console.log(err))
  }

  useEffect(() => {
    syncFeed()
    return () => clearInterval(syncFeed)
  }, [/* newPosts , userEmail*/])

  // filter post (from the dom)
  const handleFilter = (id) => {
    setPosts( posts.filter( postdata => (postdata._id !== id) ))
  }

  return (
    <View style={styles.posts}>
      <FlatList 
        keyExtractor={(item) => item._id}
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

export default Posts