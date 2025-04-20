'use client';

import {firebaseApp} from '@/firebase/config';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const GoogleSignIn = () => {
  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <button onClick={signInWithGoogle} className="google-sign-in">
      Sign In with Google
    </button>
  );
};

export default GoogleSignIn;
