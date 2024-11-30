"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/userAtom";
import axios from "@/api/axios";
import { AxiosError } from "axios";
import AuthLayout from "../layout";
import Link from "next/link";
import Image from "next/image";
import AnimatingText from "@/components/AnimatingText";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define interfaces for the component
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  role: string;
  username: string;
  message?: string;
}

interface FormData {
  email: string;
  password: string;
}

interface User {
  id: string;
  role?: string;
  isAuthenticated: boolean;
  username?: string;
}

interface ErrorResponse {
  message: string;
}

const Login = () => {
  const [error, setError] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const setUser = useSetRecoilState<User>(userAtom);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: FormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await axios.post<LoginResponse>(
        "/api/v1/signin",
        {
          email: data.email,
          password: data.password,
        } as LoginRequest,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Type guard to ensure response data has required fields
      if (!response.data.role || !response.data.username) {
        throw new Error("Invalid response from server");
      }

      // Update user state with the response data
      setUser({
        id: response.data.id,
        isAuthenticated: true,
        role: response.data.role,
        username: response.data.username,
      });

      router.push("/");
    } catch (err) {
      console.log(err, " is our ERRRRRRRORRRRRRRRRRRR")
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6 p-8 w-[calc(100%-1.25rem)] my-auto max-w-[25rem] mx-auto font-spaceGrotesk"
    >
      <h2 className="text-3xl font-bold text-white text-center">Login</h2>
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
              alt="username"
              height={15}
              width={15}
            />
          </span>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="email"
            required
            aria-required="true"
            className="block w-full pl-10 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border-2 focus:outline-none border-zinc-200"
            disabled={loading}
            aria-disabled={loading}
          />
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Image
              src="/assets/icons/padlock.png"
              alt="username"
              height={15}
              width={15}
            />
          </span>
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="password"
            required
            aria-required="true"
            className="block w-full pl-10 py-2 rounded-lg bg-transparent text-white placeholder-gray-400 border-2 focus:outline-none border-zinc-200"
            disabled={loading}
            aria-disabled={loading}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
          >
            {passwordVisible ? (
              <Image
                src="/assets/icons/view.png"
                alt="username"
                height={15}
                width={15}
              />
            ) : (
              <Image
                src="/assets/icons/hide.png"
                alt="username"
                height={15}
                width={15}
              />
            )}
          </span>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-white text-black font-semibold text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? "Logging in..." : "LOGIN"}
      </button>
      <div className="text-center mt-4 text-white">
        <p>
          Don&apos;t have an account?{" "}
          <a href="/auth/signup" className="font-bold underline">
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
};

export default Login;
