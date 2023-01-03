import Icon from "react-native-vector-icons/FontAwesome";
import auth from "../config/firebase";
import React from "react";

// TODO: Use react-native Button instead of react-native-elements
import { Button } from "react-native-elements";
import { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth/react-native";
import { signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, Text, TextInput, View } from "react-native";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
WebBrowser.maybeCompleteAuthSession();

// TODO: Get these from config
const proxyParams = { useProxy: true, projectNameForProxy: '@schotsl/disposable' };
const nativeParams = { native: "app.disposablecamera.disposable://" };

const selectedParams = Constants.appOwnership === 'expo' ? proxyParams : nativeParams;
const selectedRedirect = AuthSession.makeRedirectUri(selectedParams);

const SignInScreen = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    redirectUri: selectedRedirect,
    iosClientId: "107127868067-6666bnbvlcd2fvvojdtncq1h3bihkfjb.apps.googleusercontent.com",
    webClientId: "107127868067-t96a83429ou61k26fijep98i3a0ut4ak.apps.googleusercontent.com",
    expoClientId: "107127868067-t96a83429ou61k26fijep98i3a0ut4ak.apps.googleusercontent.com",
    androidClientId: "107127868067-e4t4bh092rcql1rit78tt7s279n47r6b.apps.googleusercontent.com",
  });

  const [value, setValue] = React.useState({
    email: "",
    error: "",
    password: "",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const token = response.params.id_token;
      const credential = GoogleAuthProvider.credential(token);

      signInWithCredential(auth, credential);
    }
  }, [response]);

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({ ...value, error: "Email and password are mandatory." });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({ ...value, error: error.message });
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signin screen!</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <TextInput
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
          placeholder="Password"
          style={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />

        <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />

        
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Icon name="google" size={16} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default SignInScreen;
