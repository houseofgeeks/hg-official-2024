'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();


  function validateInputs() {
    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !role) {
      alert('All fields are required!');
      return false;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format!');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }

  
    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return false;
    }

    return true;
  }

 
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateInputs()) {
      alert(`Sign Up Successful!\nEmail: ${email}\nRole: ${role}`);
    
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg w-[90%] md:w-[50%] lg:w-[40%] p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">Create an Account</h2>
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

         
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

         
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-gray-700 font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Lead">Lead</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Member">Member</option>
            </select>
          </div>

         
          <button
            type="submit"
            className="bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        
        <p className="text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/signin')} 
            className="text-purple-600 font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
