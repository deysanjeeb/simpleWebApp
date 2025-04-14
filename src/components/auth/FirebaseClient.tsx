'use client';

import {useEffect, useState} from 'react';
import {firebaseApp} from '@/firebase/config';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';

interface FirebaseClientProps {
  children: React.ReactNode;
}

export const FirebaseClient: React.FC<FirebaseClientProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <>{!isLoading && children}</>;
};
