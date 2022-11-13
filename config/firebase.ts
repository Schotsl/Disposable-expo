// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  appId: Constants.manifest?.extra?.firebaseId,
  apiKey: Constants.manifest?.extra?.firebaseKey,
  projectId: Constants.manifest?.extra?.firebaseProject,
  authDomain: Constants.manifest?.extra?.firebaseDomain,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
  });
  
  // export { auth };
  
  export default auth;

// export default app;

