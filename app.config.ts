import 'dotenv/config';

export default {
  expo: {
    extra: {
      apiDomain: process.env.API_DOMAIN,
      apiVersion: process.env.API_VERSION,
      apiProtocol: process.env.API_PROTOCOL,

      firebaseId: process.env.FIREBASE_ID,
      firebaseKey: process.env.FIREBASE_KEY,
      firebaseDomain: process.env.FIREBASE_DOMAIN,
      firebaseProject: process.env.FIREBASE_PROJECT,
    }
  }
};