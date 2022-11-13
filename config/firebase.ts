import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native';

const firebaseConfig = {
  appId: Constants.manifest?.extra?.firebaseId,
  apiKey: Constants.manifest?.extra?.firebaseKey,
  projectId: Constants.manifest?.extra?.firebaseProject,
  authDomain: Constants.manifest?.extra?.firebaseDomain,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export default auth;

