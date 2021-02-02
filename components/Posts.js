import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native'
///import axios from '../../axios'
import axios from 'axios'
import { useStateValue } from '../StateProvider'
import Post from './Post'

const win = Dimensions.get('window');
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
    axios.get('http://localhost:9000/posts/retrieve/')
      .then(res => {
        console.log(res.data)
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
  
  //console.log('posts are >>>', posts)
  //console.log('newPosts are >>>', newPosts)

  return (
    <View style={styles.posts}>

      <FlatList 
        keyExtractor={(item) => item._id}
        data={posts}
        renderItem={ ({item}) => (
          <Post
            key={item._id}
            postId={item._id} 
            username={item.user}
            caption={item.caption}
            imageUrl={item.image}
            //filterPost={ dato => handleFilter(dato) }
          />  
        )}
      />

      {/* {newPosts.length > 0 ? newPosts.map( response => (
        <Post
          key={response._id}
          postId={response._id} 
          username={response.user}
          caption={response.caption}
          imageUrl={response.image}
          filterPost={ dato => handleFilter(dato) }
        />
        )) : ''
      } */}
      
    </View>
  )
}

export default Posts