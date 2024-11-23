'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
  function validateInputs() {
    if (!email.trim() || !password.trim()) {
      alert('Email and Password are required!');
      return false;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format!');
      return false;
    }

    return true;
  }

  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateInputs()) {
      alert(`Welcome back, ${email}!`);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg w-[90%] md:w-[50%] lg:w-[35%] p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">Sign In</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

    
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

    
          <button
            type="submit"
            className="bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Sign In
          </button>
        </form>


        <p className="text-gray-600 mt-4 text-center">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push('/signup')} 
            className="text-purple-600 font-medium hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
