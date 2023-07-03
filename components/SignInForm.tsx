"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Check if form is empty
    if (Object.values(data).some((value) => value === "")) {
      toast.error("Please fill in all fields");
      return;
    }

    // Send fetch request to nextauth sign in end point
    try {
      const toastId = toast.loading("Loading...");
      const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });
      toast.dismiss(toastId);
      if (!res || res.error) {
        // If no response or response is error
        toast.error("Invalid username or password");
      } else {
        // If response success
        toast.success("Sign in successful");
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bottom-20 flex w-full max-w-xs flex-col gap-5 font-inter sm:bottom-0 lg:bottom-20 xl:gap-7"
    >
      {/* Title */}
      <h1 className="text-center text-3xl font-bold text-custom-light-red xl:text-4xl">
        Sign In
      </h1>
      {/* Username */}
      <TextField name="username" type="text" placeholder="Username" />

      {/* Password */}
      <TextField name="password" type="password" placeholder="Password" />

      {/* Submit */}
      <Button type="submit" color="red" paddingY="12px" fullWidth={true}>
        Submit
      </Button>

      {/* Sign Up Options */}
      <p className="text-center text-base font-medium text-custom-white xl:text-lg">
        {`Don't have an account yet? `}
        <Link
          href="/signup"
          className="font-inter font-bold text-custom-light-red hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
