'use client';

import {useEffect, useState} from 'react';
import {firebaseApp} from '@/firebase/config';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';

interface FirebaseClientProps {
  children: React.ReactNode;
}

export const FirebaseClient: React.FC<FirebaseClientProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firebaseApp) {
      console.error('Firebase app not initialized.');
      setIsLoading(false);
      return;
    }

    try {
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        initializeAppCheck(firebaseApp, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true,
        });
      }
    } catch (e) {
      console.error('Firebase App Check failed to initialize:', e);
    }

    const auth = getAuth(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <>{!isLoading && children}</>;
};
