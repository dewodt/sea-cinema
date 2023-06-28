"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Link from "next/link";

const SignInForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <TextField type="text" placeholder="Username" />

      {/* Password */}
      <TextField type="password" placeholder="Password" />

      {/* Submit */}
      <Button type="submit" color="red" paddingY="12px" fullWidth={true}>
        Submit
      </Button>

      {/* Sign Up Options */}
      <p className="text-base font-medium text-custom-white xl:text-lg">
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
