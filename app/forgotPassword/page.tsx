'use client';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';  // Import your Firebase config
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Firebase function to send password reset email
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Please check your email.');

      //redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login')
      }, 3000)
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
      <div className="bg-white p-8 rounded-lg border-t-4 border-red-600 shadow-lg max-w-md w-full">
        <h2 className="text-center text-[#2e2e2e] text-[32px] font-semibold">
          Reset Password
        </h2>

        {/* Tampilkan pesan success atau error */}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Send Reset Link
          </button>
        </form>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-gray-600">
          Remember your password?{' '}
          <button onClick={() => router.push('/login')} className="text-red-500 font-semibold hover:underline ml-1">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
