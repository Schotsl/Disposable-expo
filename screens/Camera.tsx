import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { Buffer } from "buffer";
import { useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";

const domain = "api.dev.disposable-camera.app";
const version = "v1";
const protocol = "https";


const CameraScreen = () => {
  const camera = useRef(null);
  const [base64, setBase64] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
  );

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
    setType(
      (
        current,
      ) => (current === CameraType.back ? CameraType.front : CameraType.back),
    );
  }

  async function takePicture() {
    const pictureResponse = await camera.current.takePictureAsync({
      base64: true,
    });

    const spacesBase64 = `data:image/png;base64,${pictureResponse.base64}`;
    const spacesBuffer = Buffer.from(pictureResponse.base64, "base64");
    const spacesBlob = new Blob([spacesBuffer]);
    const spacesFile = new File([spacesBlob], "test.jpg", {
      type: "image/jpeg",
    });

    setBase64(spacesBase64);

    const disposableHeaders = { "Content-Type": "application/json" };
    const disposableMethod = "POST";
    const disposableBody = JSON.stringify({
      size: spacesFile.size,
      width: pictureResponse.width,
      height: pictureResponse.height,
    });

    console.log(`${protocol}://${domain}/${version}/image`);
    console.log(disposableBody);

    const disposableResponse = await fetch(
      `${protocol}://${domain}/${version}/image`,
      {
        headers: disposableHeaders,
        method: disposableMethod,
        body: disposableBody,
      },
    );
    const disposableParsed = await disposableResponse.json();
    const disposableUpload = disposableParsed.upload;
    console.log("WE HERE");
    fetch(disposableUpload, { method: "PUT", body: spacesFile });
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.buttonContainer}>
          {base64 !== null &&
            (
              <Image
                style={styles.image}
                source={{ uri: base64 }}
              />
            )}
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
      position: "absolute",
      right: 50,
      left: 50,
      height: 100,
      zIndex: 100,
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
  })

  export default CameraScreen;