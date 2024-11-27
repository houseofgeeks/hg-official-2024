"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/userAtom";
import axios from "@/api/axios";

const AuthPersistence = () => {
  const setUserState = useSetRecoilState(userAtom);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Call your backend endpoint to check role
        const response = await axios.get("/api/v1/role", {
          withCredentials: true, // Important for sending cookies
        });
        console.log(response);
        setUserState({
          id: response.data.id,
          isAuthenticated: true,
          role: response.data.role,
          username: response.data.username,
          name: response.data.name,
          assignedWings: response.data.assignedWings
        });
      } catch (error) {
        // If request fails, user is not authenticated
        setUserState({
          id: "",
          isAuthenticated: false,
          role: null,
          username: '',
          name: '',
          assignedWings: []
        });
      }
    };

    checkAuthStatus();
  }, [setUserState]);

  return null; // This component doesn't render anything
};

export default AuthPersistence;
