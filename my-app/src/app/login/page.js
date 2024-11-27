"use client";

import Link from "next/link";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

import { useFormState } from "react-dom";

import { LoginAuth } from "@/app/api/actions/auth";

import "../globals.css";
import routes from "../constants/routes";
const baseUrl = "http://localhost:8080";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 relative overflow-hidden ">
      <AnimatedBackground />
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
        <div className="relative hidden h-full flex-col bg-muted  text-white dark:border-r lg:flex ">
          <div className="relative z-20 flex items-center text-lg font-medium ">
            <Link href="/" className="text-white absolute p-10">
              LOGO
            </Link>
          </div>
          <img
            src="/Login1.png?height=500&width=400"
            alt="Placeholder illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <form
          action={LoginAuth}
          method="POST"
          className="lg:p-8 relative z-10 pt-20 pr-10 pl-10 md:pr-0 md:pl-0"
        >
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back <User className="inline-block ml-1 h-6 w-6" />
              </h1>
              <p className="text-sm text-muted-foreground">
                Login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  placeholder="Enter your Username"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  type="password"
                  required
                />
              </div>

              <Button>Login</Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Review our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Haven't signed up yet?{" "}
              <Link
                href={routes.register}
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
