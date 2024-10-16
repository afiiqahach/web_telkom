'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig';  // Path ke konfigurasi Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const findEmailByUsername = async (username: string) => {
    try {
      const userRef = collection(db, "arina");
      const q = query(userRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data(); 
        if (userData && 'email' in userData) {
          return userData.email; 
        } else {
          throw new Error('Email not found for the given username');
        }
      } else {
        throw new Error('Username not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); 
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      let email = emailOrUsername;

      if (!email.includes('@')) {
        email = await findEmailByUsername(emailOrUsername);
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        throw new Error('Please verify your email before logging in.');
      }

      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg border-t-4 border-[#104C98] shadow-lg max-w-md w-full">
        <h2 className="text-center text-[#2e2e2e] text-[32px] font-semibold">
          Welcome to <span className="text-[#104C98]">ARINA</span>
        </h2>
        
        {error && <p className="text-[#104C98] text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username or email</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your username or email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="/forgotPassword" className="text-sm text-[#104C98]">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#104C98] text-white rounded-lg hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-gray-600">
          {"Don't have an account?"}
          <button onClick={() => router.push('/signUp')} className="text-[#104C98] font-semibold hover:underline ml-1">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
