"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "@/api/axios";
import { AxiosError } from "axios";
import { UserRole } from "@/utils/enums";

interface SignupRequest {
  email: string;
  password: string;
  name: string;
  username: string;
  role: UserRole;
}

interface FormData {
  role: UserRole;
  email: string;
  password: string;
  name: string;
  username: string;
}

const Signup = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as FormData;

    try {
      const res = await axios.post<SignupRequest>(
        "/api/v1/signup",
        {
          email: data.email,
          password: data.password,
          name: data.name,
          username: data.username,
          role: data.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);

      router.push("/auth/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="space-y-6 p-8 w-[calc(100%-1.25rem)] my-auto max-w-[25rem] mx-auto font-spaceGrotesk"
    >
      <h2 className="text-3xl font-bold text-white text-center">Sign Up</h2>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded text-center">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Image
              src="/assets/icons/profile.png"
              alt="name"
              height={15}
              width={15}
            />
          </span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="block w-full pl-10 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border-2 focus:outline-none border-zinc-200"
            disabled={loading}
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Image
              src="/assets/icons/profile.png"
              alt="username"
              height={15}
              width={15}
            />
          </span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="block w-full pl-10 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border-2 focus:outline-none border-zinc-200"
            disabled={loading}
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Image
              src="/assets/icons/profile.png"
              alt="email"
              height={15}
              width={15}
            />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="block w-full pl-10 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border-2 focus:outline-none border-zinc-200"
            disabled={loading}
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Image
              src="/assets/icons/padlock.png"
              alt="password"
              height={15}
              width={15}
            />
          </span>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            minLength={6}
            className="block w-full pl-10 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border-2 focus:outline-none border-zinc-200"
            disabled={loading}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
          >
            {passwordVisible ? (
              <Image
                src="/assets/icons/view.png"
                alt="show password"
                height={15}
                width={15}
              />
            ) : (
              <Image
                src="/assets/icons/hide.png"
                alt="hide password"
                height={15}
                width={15}
              />
            )}
          </span>
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Image
              src="/assets/icons/profile.png"
              alt="role"
              height={15}
              width={15}
            />
          </span>
          <select
            name="role"
            required
            className="block w-full pl-10 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border-2 focus:outline-none border-zinc-200"
            disabled={loading}
          >
            <option value={UserRole.STUDENT} className="text-black">Student</option>
            <option value={UserRole.COORDINATOR} className="text-black">Coordinator</option>
            <option value={UserRole.LEAD} className="text-black">Lead</option>
            <option value={UserRole.ADMIN} className="text-black">Admin</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-white text-black font-semibold text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"
        disabled={loading}
      >
        {loading ? "Creating account..." : "SIGN UP"}
      </button>

      <div className="text-center mt-4 text-white">
        <p>
          Already have an account?{" "}
          <a href="/auth/login" className="font-bold underline">
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default Signup;