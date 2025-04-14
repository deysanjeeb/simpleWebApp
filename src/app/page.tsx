
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postData } from "@/services/api-service";
import GoogleSignIn from "@/components/auth/GoogleSignIn";

export default function Home() {
  const [text, setText] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

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
      <GoogleSignIn />
    </div>
  );
}

