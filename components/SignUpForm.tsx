"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Check if form is empty
    if (Object.values(data).some((value) => value === "")) {
      toast.error("Please fill in all fields");
      return;
    }

    // Form value is valid
    try {
      // loading toast
      setLoading(true);
      const toastId = toast.loading("Loading...");

      // Send fetch request to server
      const res = await fetch("/api/signup", {
        body: formData,
        method: "POST",
      });
      const resJSON = await res.json();

      toast.dismiss(toastId);
      // Check response ok
      if (res.ok) {
        toast.success(resJSON.message);
        router.push("/signin");
      } else {
        setLoading(false);
        toast.error(resJSON.message);
      }
    } catch (err) {
      // Handle fetch error (connection issue)
      setLoading(false);
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
        Sign Up
      </h1>
      {/* Name */}
      <TextField name="name" type="text" placeholder="Name" />

      {/* Age */}
      <TextField name="age" type="number" placeholder="Age" />

      {/* Username */}
      <TextField name="username" type="text" placeholder="Username" />

      {/* Password */}
      <TextField name="password" type="password" placeholder="Password" />

      {/* Submit */}
      <Button
        disabled={loading}
        type="submit"
        color="red"
        paddingY="12px"
        fullWidth={true}
      >
        Submit
      </Button>

      {/* Sign In Options */}
      <p className="text-center text-base font-medium text-custom-white xl:text-lg">
        {`Already have an account? `}
        <Link
          href="/signin"
          className="font-inter font-bold text-custom-light-red hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
