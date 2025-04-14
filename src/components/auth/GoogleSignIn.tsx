'use client';

import {firebaseApp} from '@/firebase/config';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {Button} from "@/components/ui/button";

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
    <Button onClick={signInWithGoogle} variant="outline">
      Sign In with Google
    </Button>
  );
};

export default GoogleSignIn;
