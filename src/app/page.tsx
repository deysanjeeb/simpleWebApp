"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postData } from "@/services/api-service";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/firebase/config';

export default function Home() {
  const [text, setText] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [user] = useAuthState(getAuth(firebaseApp));
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (user && user.displayName) {
      const nameParts = user.displayName.split(' ');
      setFirstName(nameParts[0]);
    } else {
      setFirstName('');
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const response = await postData({ text }, '/api/submit');
      if (response.success) {
        setConfirmationMessage(response.message);
      } else {
        setConfirmationMessage('Submission failed.');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setConfirmationMessage('Submission failed due to an error.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <div className="absolute top-4 right-4">
        {user ? (
          <p className="mb-4">Welcome, {firstName}!</p>
        ) : (
          <GoogleSignIn />
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">PostAuth App</h1>

      <Input
        type="text"
        placeholder="Enter text"
        className="mb-4 w-full max-w-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit} className="bg-accent text-primary-foreground hover:bg-primary">Submit</Button>
      {confirmationMessage && (
        <div className="mt-4 p-4 bg-secondary-foreground text-background rounded-md">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
}
