import React from 'react';
import Constants from 'expo-constants';

import { Button } from 'react-native-elements';
import { useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CameraScreen = () => {
  const camera = useRef(null);
  const [base64, setBase64] = useState<string>();

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    const pictureResponse = await camera.current.takePictureAsync({ base64: true, quality: 1 });
    const pictureBase64 = `data:image/png;base64,${pictureResponse.base64}`;

    setBase64(pictureBase64);

    const spacesRespond = await fetch(pictureResponse.uri);
    const spacesBlob = await spacesRespond.blob();

    const disposableHeaders = { "Content-Type": "application/json" };
    const disposableMethod = "POST";
    const disposableBody = JSON.stringify({
      size: spacesBlob.size,
      width: pictureResponse.width,
      height: pictureResponse.height,
    });

    const apiDomain = Constants.manifest?.extra?.apiDomain;
    const apiVersion = Constants.manifest?.extra?.apiVersion;
    const apiProtocol = Constants.manifest?.extra?.apiProtocol;

    const disposableResponse = await fetch(`${apiProtocol}://${apiDomain}/${apiVersion}/image`, { headers: disposableHeaders, method: disposableMethod, body: disposableBody });
    const disposableParsed = await disposableResponse.json();
    const disposableUpload = disposableParsed.upload;

    fetch(disposableUpload, { method: "PUT", body: spacesBlob });
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camera} ratio="16:9">
        {base64 !== null &&
          (
            <Image
              style={styles.image}
              source={{ uri: base64 }}
            />
          )
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take picture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
     
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
      width: 100,
      margin: 24,
      height: "auto",
      position: "absolute",
      aspectRatio: 2/3,
    },
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      width: "100%",
      margin: 24,
      flexDirection: "row",
    },
    button: {
      flex: 1,
      alignSelf: "flex-end",
    },
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
  })

  export default CameraScreen;