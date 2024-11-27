"use server";

import routes from "@/app/constants/routes";
import { redirect } from "next/navigation";

import { LoginUserSchema, RegisterUserSchema } from "@/lib/definitions";
import { CloudCog } from "lucide-react";
import { setToken } from "@/lib/token";

// This is the server I am using, change it if you you are working on another server for backend
const baseUrl = "http://localhost:8080";

// Required header to fetch for Post and Get
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function LoginAuth(formData) {
  try {
    //fetch response from backend via api endpoint "/api/auth/login"
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // Extract error message from response if available
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed. Please try again.");
    }
    const { token } = await response.json();

    // set token
    await setToken(token);
  } catch (error) {
    // if login is wrong (wrong credientals or user doesnt exist)
    console.error("Login error:", error);

    // returns to same page if something is wrong
    return {
      message:
        error.message || "An unexpected error occurred. Please try again.",
    };
  }

  // routes to about page if login is successful for time being
  redirect(routes.about);
}

export async function registerAuth(formData) {
  // if password doesnt match confirm password
  if (password !== confirm_password) {
    console.log("password not confirmed");
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/api/auth/createUser`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username,
        email,
        password,
        age,
        address,
        phoneNumber,
        role,
      }),
    });

    if (!response.ok) {
      // Extract error message from response if available
      const errorData = await response.json();

      throw new Error(
        errorData.message || "registration failed. Please try again."
      );
    }
  } catch (error) {
    // if registeration fails return to form without routing
    console.error("registration error");
    return {
      message:
        error.message || "An unexpected error occurred. Please try again.",
    };
  }

  // if registeration is successful, routes to about page for time being
  redirect(routes.about);
}
