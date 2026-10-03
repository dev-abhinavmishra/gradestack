import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || "ai-studio-49448c2c-5e60-4efd-9138-c1dbfa86a245",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

/* The app works fully offline (localStorage) when no Firebase
   config is present — auth and sync switch on once configured. */
export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app: FirebaseApp | null = null;
let firestore: Firestore | null = null;
let firebaseAuth: Auth | null = null;

if (firebaseEnabled) {
  try {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    firebaseAuth = getAuth(app);
  } catch (e) {
    console.error('Firebase failed to initialize — running offline.', e);
  }
}

export { app, firebaseAuth as auth, firestore as db };

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  if (!firebaseAuth) return Promise.reject(new Error('Firebase is not configured'));
  return signInWithPopup(firebaseAuth, googleProvider);
};
export const logOut = () => (firebaseAuth ? signOut(firebaseAuth) : Promise.resolve());
