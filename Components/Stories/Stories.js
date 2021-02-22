import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Story from './Story'

const stories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      name: 'Sebastian',
      avatar: 'https://avatars2.githubusercontent.com/u/24712956?s=400&u=b71527e605ae1b748fc2d4157a842e57e427ad44&v=4'
    },
    {
      id: 2,
      name: 'Edu',
      avatar: 'https://miro.medium.com/fit/c/336/336/2*4lH0jftaq_sPRqQisUsVqw.jpeg'
    },
    {
      id: 3,
      name: 'Andres',
      avatar: 'https://avatars3.githubusercontent.com/u/41311088?s=460&u=cb78401b64bd7176ea16502ced22aeac939c907e&v=4'
    }
  ])

  return (
    <View style={styles.storyReel}>
      { stories.map ( item => (
        <Story 
          key={ item.id }
          name={ item.name }
          avatar={ item.avatar }
        />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  storyReel: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderBottomWidth: 0
  }
})

export default stories