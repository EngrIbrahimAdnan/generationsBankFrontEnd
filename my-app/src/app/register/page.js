"use client";

import Link from "next/link";
import { RocketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Image from "next/image";

import "../globals.css";
import routes from "../constants/routes";
import { registerAuth } from "../api/actions/auth";

export default function SignUpPage() {
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
          action={registerAuth}
          method="POST"
          className="lg:p-8 relative z-10 pt-20 pr-10 pl-10 md:pr-0 md:pl-0"
        >
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Let&apos;s Get Started{" "}
                <RocketIcon className="inline-block ml-1 h-6 w-6" />
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign up your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your Username"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your Email address"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Enter your Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Age</Label>
                <Input
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                  type="number"
                  min="0"
                  max="120" // Optional, set an upper limit for age
                  autoComplete="bday-year" // Optional, suggests a year of birth
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  type="text"
                  autoComplete="street-address" // Instructs the browser this is a street address
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  pattern="[0-9]{8}" // Optional, restricts to 10 digits
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">role</Label>
                <Input
                  id="role"
                  name="role"
                  placeholder="Enter your role"
                  type="name"
                  required
                />
              </div>
              <Button>Sign Up</Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              By continuing you agree to our{" "}
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
              Already have an account?{" "}
              <Link
                href={routes.login}
                className="underline underline-offset-4 hover:text-primary"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
