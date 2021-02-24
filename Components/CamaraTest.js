import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather as Icon } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const cam = useRef()

  const takePicture = async() => {
    if (cam.current) {
      const option = { quality: 1, base64: true, skipProccessing: false }

      let photo = await cam.current.takePictureAsync(option)

      console.log(cam.current.getSupportedRatiosAsync())
      const source = photo.uri
      //console.log('photo.base64', photo.base64)

      /* const imgForm = new FormData()
      imgForm.append('file', photo.base64, 'cameraroll')

      axios.post('http://localhost:9000/posts/upload/image', imgForm, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-type': `multipart/form-data; boundary=&`,
        }
      }).then( res => {
        console.log('response', res)
      }).catch( err => {
        console.log('error', err)
      }) */
  
      if(source) {
        cam.current.resumePreview()
        //save image
        handleSave(source)

        fetch(photo)
        .then(res => res.blob())
        .then(blob => {
          const fd = new FormData();
          const file = new File([blob], "filename.jpeg");
          fd.append('image', file)
          
          // Let's upload the file
          // Don't set contentType manually → https://github.com/github/fetch/issues/505#issuecomment-293064470
          const API_URL_HEROKU = 'https://facebook2021.herokuapp.com/posts/upload/image'
          const API_URL = 'http://localhost:9000/posts/upload/image'
          fetch(API_URL_HEROKU, { method: 'POST', body: fd })
          .then(res => res.json()) 
          .then(res => console.log(res))

        })
      }

    } else {
      console.log('error')
    }
    
  }

  async function takeAndUploadPhotoAsync() {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchCameraAsync({
      //allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
  
    if (result.cancelled) {
      return;
    }
  
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
  
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
    // Upload the image using the fetch and FormData APIs
    let imgForm = new FormData();
    // Assume "photo" is the name of the form field the server expects
    imgForm.append('file', { uri: localUri, name: filename, type }, filename);

    return await axios.post('http://192.168.100.52:9000/posts/upload/image', imgForm, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-type': `multipart/form-data; boundary=${imgForm._boundary}`,
      }
    }).then( res => {
      console.log(res.data)

      const postData = {
        user: 'Athens',
        email: '',
        imgName: res.data.filename,
        text: 'holix',
        avatar: '',
        like: false,
        timestamp: Date.now(),
        comments: []
      }
      console.log(postData)
      
      axios.post('http://192.168.100.52:9000/posts/upload/post', postData)
        .then(resp => {
         console.log('post saved resp:', resp)
        })
    })

    /* return await fetch('http://192.168.100.52:9000/posts/upload/image', {
      method: 'POST',
      body: formData,
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-type': 'multipart/form-data',
      },
    }); */
  }

  /* Save in device storage */
  const handleSave = async (photo) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    if(status === 'granted') {
      const assert = await MediaLibrary.createAssetAsync(photo)

      MediaLibrary.createAlbumAsync('Tutorial', assert, false)
      
    } else {
      console.log('Oh you missed to give permission')
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera ref={cam} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row', }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', alignItems: 'center' }}
                onPress={ () => takeAndUploadPhotoAsync() }>
                <Icon name="aperture" size={50} color='white' />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  camera: {
    
  },
  text: {
    height: 500,
    color: 'white'
  }
}); 