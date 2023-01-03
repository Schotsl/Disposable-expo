import "dotenv/config";

export default {
  expo: {
    name: "Disposable",
    slug: "Disposable",
    version: "1.0.0",
    android: {
      package: "app.disposable_camera.disposable",
    },
    ios: {
      bundleIdentifier: "app.disposable-camera.disposable",
    },
    scheme: "app.disposable_camera.disposable",
    extra: {
      apiDomain: process.env.API_DOMAIN,
      apiVersion: process.env.API_VERSION,
      apiProtocol: process.env.API_PROTOCOL,

      firebaseId: process.env.FIREBASE_ID,
      firebaseKey: process.env.FIREBASE_KEY,
      firebaseDomain: process.env.FIREBASE_DOMAIN,
      firebaseProject: process.env.FIREBASE_PROJECT,
      eas: {
        projectId: "4ad482b5-f97d-4cc9-8642-86e507b6b81d",
      },
    },
  },
};
