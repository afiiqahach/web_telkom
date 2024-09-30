'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logika login di sini
    console.log({ email, password, remember });

    if (email === "admin@gmail.com" && password === "admin123") {
      router.push('/dashboard');
    } else {
      alert("Login failed.")
    }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* <div className="w-[914px] h-[914px] bg-[#f82e2e] rounded-full ml-3.5"/> */}
      <div className="bg-white p-20 w- rounded-lg border-t-4 border-red-600 shadow-lg w-[940px] h-[600px] flex-shrink-0 max-w-md">
        
        <h2 className="text-center text-[#2e2e2e]
                        text-[40px]
                        font-semibold
                        ">
          Welcome to <span className="text-red-500"><br/>ARINA</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mt-6">Username or email</label>
            <input
              type="email"
              className=" w-full p-3 border border-gray-300 rounded-lg"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <a href="#" className="text-sm text-red-500">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Sign in
          </button>
        </form>

        <hr className='my-6 border-gray-300'/>

        {/*Sign-up Section */}
        <p className='text-center text-gray-600'>
          {"Don't have an account?"}
          <button onClick={() => router.push('/signUp')} className='text-red-500 font-semibold hover:underline ml-1'>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}