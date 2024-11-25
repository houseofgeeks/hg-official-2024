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
  const [loading, setLoading] = useState<boolean>(false);
  const setUser = useSetRecoilState<User>(userAtom);
  const router = useRouter();

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
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" description="Log in to your account">
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              aria-required="true"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={loading}
              aria-disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              aria-required="true"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={loading}
              aria-disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center mt-4">
            <Link
              href="/auth/signup"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </AuthLayout>
  );
};

export default Login;
