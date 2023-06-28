import type { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | SEA Cinema",
  description: "Sign Up Page SEA Cinema",
};

const SignUp = () => {
  return (
    <main className="flex flex-auto items-center justify-center bg-custom-soft-black px-5 py-10">
      <SignUpForm />
    </main>
  );
};

export default SignUp;
